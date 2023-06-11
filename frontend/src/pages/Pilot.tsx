import React, { useEffect, useState } from 'react';
import '../App.css';
import { checkLogin } from '../service/CheckLogin';

function Pilot() {

  interface Pilot {
    id: string
    username: string
    surname: string
    lastname: string
  }

  const [pilots, setPilots] = useState([] as Array<Pilot>)
  const [pilot, setPilot] = useState({} as Pilot)
  const user = localStorage.getItem("user")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000);
    return () => clearTimeout(timeoutId);
  }, [errMsg]);

  const fetchPilot = () => {
    fetch(`http://localhost:8080/api/pilot/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(response => {
        checkLogin(response);
        return response.json()
      })
      .then((responseBody: Pilot) => setPilot(responseBody))
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }

  return (
    <div>
      <p>{errMsg}</p>
      <p>Willkommen {user}</p>
      <button onClick={fetchPilot}>Modelle</button>
    </div>
  );
}

export default Pilot;

