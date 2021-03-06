import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './routing/protectedRoute.js';
import { AuthProvider } from './routing/authContext.js';
import Home from './components/home/home.js';
import MenuBar from './components/menuBar/menuBar.js';
import SignUp from './components/signUp/signUp.js';
import Login from './components/login/login.js';
import ProfileModal from './components/menuBar/profileModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <MenuBar openModal={() => { setIsModalOpen(true) }} />
          <ProfileModal open={isModalOpen} closeModal={() => { setIsModalOpen(false) }} />

          <Switch>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/login" component={Login}></Route>
            <ProtectedRoute path="/" component={Home}></ProtectedRoute>
            <Home />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
