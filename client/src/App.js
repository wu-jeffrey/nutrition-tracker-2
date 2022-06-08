import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';
import { SpeechRecognitionContextProvider } from './foundation/SpeechRecognition';
import { BottomNavigationBar } from './foundation/navigation/BottomNavigationBar'

import { Diary } from './sections/Diary/Diary'
import { Kitchen } from './sections/Kitchen/Kitchen'
import { Progress } from './sections/Progress/Progress'
import { Settings } from './sections/Settings/Settings'

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: pink['A400'],
      },
    },
  });

  return (
    <SpeechRecognitionContextProvider>
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Diary />} />
              <Route path="/diary" element={<Diary />} />
              <Route path="/kitchen" element={<Kitchen />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <BottomNavigationBar />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </SpeechRecognitionContextProvider>
  );
}

export default App;
