import React, { useEffect, useState } from 'react';
import '../App.css';
import { checkLogin } from '../service/CheckLogin';

function Pilot() {

  interface Pilot {
    username: string
    surname: string
    lastname: string
    password: string
  }

  const [pilots, setPilots] = useState([] as Array<Pilot>)
  const [pilotName, setPilotName] = useState("")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000);
    return () => clearTimeout(timeoutId);
  }, [errMsg]);

  const fetchPilots = () => {
    fetch("http://localhost:8080/api/pilot/all", {
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
      .then((responseBody: Array<Pilot>) => setPilots(responseBody))
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }

  return (
    <div>
      <p>{errMsg}</p>
      <button onClick={fetchPilots}>alle Piloten</button>
      {
        pilots.map(pilot => <p>{pilot.username}</p>)
      }
    </div>
  );
}

export default Pilot;

