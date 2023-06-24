import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { getBooleanFromLocalStorage } from './service/Service';

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
      <button onClick={() => navigate("./pilot")} hidden={getBooleanFromLocalStorage(localStorage.getItem("hideHangar"))}>mein Hangar</button>
      <button onClick={() => navigate("./flightlist")}>Flugliste</button>
      <Outlet />
    </div>
  );
}

export default App;
