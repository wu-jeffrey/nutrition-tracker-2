import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import './App.css';
import { ProtectedComponent } from './foundation/auth/ProtectedComponent';
import { SpeechRecognitionContextProvider } from './foundation/SpeechRecognition';
import { AuthProvider } from './foundation/auth/authContext';
import { BottomNavigationBar } from './foundation/navigation/BottomNavigationBar';

// import SignUp from './sections/Auth/SignUp'
import { Login } from './sections/Auth/Login'
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

  function BottomNavLayout() {
    return (
      <>
        <Outlet />
        <BottomNavigationBar />
      </>
    )
  }

  return (
    <AuthProvider>
      <SpeechRecognitionContextProvider>
        <ThemeProvider theme={darkTheme}>
          <div className="App">
            <BrowserRouter>
              <Routes>
                {/* <Route path="/signup" component={<SignUp />}></Route> */}
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<BottomNavLayout />}>
                  <Route index element={<ProtectedComponent component={<Diary />} />} />
                  <Route path="/diary" element={<ProtectedComponent component={<Diary />} />} />
                  <Route path="/kitchen" element={<ProtectedComponent component={<Kitchen />} />} />
                  <Route path="/progress" element={<ProtectedComponent component={<Progress />} />} />
                  <Route path="/settings" element={<ProtectedComponent component={<Settings />} />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </SpeechRecognitionContextProvider>
    </AuthProvider>
  );
}

export default App;
