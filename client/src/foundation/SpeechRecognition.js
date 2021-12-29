import { useContext, createContext, useState, useCallback, useRef } from "react";

const SpeechRecognitionContext = createContext({
  listening: false,
  startListening: () => { },
  stopListening: () => { },
})

export function SpeechRecognitionContextProvider({ children }) {
  const [listening, setListening] = useState(false)
  const recognition = useRef(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your Browser does not support speech recognition');
    } else {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.onstart = function () { console.log('Speech Recognition Started') }
      recognition.onresult = function (event) { console.log(event.results) }
      recognition.onerror = function (error) { console.log(error) }
      recognition.onend = function () { console.log('Speech Recognition Ended') }
      recognition.lang = 'en-CA';
      return recognition;
    }
  }).current;

  const startListening = useCallback(() => {
    setListening(true);
    recognition.start();
  }, [recognition]);

  const stopListening = useCallback(() => {
    setListening(false);
    recognition.stop();
  }, [recognition]);

  return (
    <SpeechRecognitionContext.Provider value={{ listening, startListening, stopListening }}>
      {children}
    </SpeechRecognitionContext.Provider >
  )
}

export function useSpeechRecognition() {
  return useContext(SpeechRecognitionContext);
}
