import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { getBooleanFromLocalStorage } from './service/Service';

function App() {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate("./")
  }

  return (
    <div>
      <button onClick={() => navigate("./admin")} hidden={getBooleanFromLocalStorage(localStorage.getItem("isNotAdmin"))}>ADMIN</button>
      <button onClick={() => navigate("./login")}>login</button>
      <button onClick={logout}>logout</button>
      <button onClick={() => navigate("./register")}>als Pilot anmelden</button>
      <button onClick={() => navigate(`./pilot/${localStorage.getItem("userId")}`)} hidden={getBooleanFromLocalStorage(localStorage.getItem("hideHangar"))}>mein Hangar</button>
      <button onClick={() => navigate("./")}>Flugliste</button>
      <Outlet />
    </div>
  );
}

export default App;
