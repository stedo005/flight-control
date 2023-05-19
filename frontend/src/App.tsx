import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      General output
      <Outlet/>
    </div>
  );
}

export default App;
