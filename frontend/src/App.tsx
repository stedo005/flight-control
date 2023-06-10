import React from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => navigate("./login")}>login</button>
      <button onClick={() => navigate("./register")}>registrieren</button>
      <button onClick={() => navigate("./pilot")}>pilot</button>
      <Outlet />
    </div>
  );
}

export default App;
