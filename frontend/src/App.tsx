import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate("./flightlist")
  }

  return (
    <div>
      <button onClick={() => navigate("./login")}>login</button>
      <button onClick={logout}>logout</button>
      <button onClick={() => navigate("./register")}>registrieren</button>
      <button onClick={() => navigate("./pilot")}>mein Hangar</button>
      <button onClick={() => navigate("./flightlist")}>Flugliste</button>
      <Outlet />
    </div>
  );
}

export default App;
