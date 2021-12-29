import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

import logo from './logo.svg';
import './App.css';
import { SpeechRecognitionContextProvider } from './foundation/SpeechRecognition';
import { BottomNavigationBar } from './foundation/navigation/BottomNavigationBar'

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
    <div className="App">
      <SpeechRecognitionContextProvider>
        <ThemeProvider theme={darkTheme}>
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
          <BottomNavigationBar />
        </ThemeProvider>
      </SpeechRecognitionContextProvider>
    </div>
  );
}

export default App;
