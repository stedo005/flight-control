import './App.css';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

function App() {

  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate("./login")}>login</button>
      <button onClick={() => navigate("./register")}>registrieren</button>
      <button onClick={() => navigate("./pilot")}>mein Bereich</button>
      <Outlet />
    </div>
  );
}

export default App;
