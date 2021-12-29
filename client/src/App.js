import logo from './logo.svg';
import './App.css';
import { SpeechRecognitionContextProvider } from './foundation/SpeechRecognition';

function App() {
  return (
    <div className="App">
      <SpeechRecognitionContextProvider>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </SpeechRecognitionContextProvider>
    </div>
  );
}

export default App;
