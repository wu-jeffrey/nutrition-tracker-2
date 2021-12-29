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

          <BottomNavigationBar />
        </ThemeProvider>
      </SpeechRecognitionContextProvider>
    </div>
  );
}

export default App;
