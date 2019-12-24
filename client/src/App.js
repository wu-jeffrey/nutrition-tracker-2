import React from 'react';
import './App.css';
import Home from './components/home/home.js';
import MenuBar from './components/menuBar/menuBar.js';

function App() {
  return (
    <div className="app">
      <MenuBar></MenuBar>
      <Home></Home>
    </div>
  );
}

export default App;
