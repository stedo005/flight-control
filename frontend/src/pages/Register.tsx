import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Register() {

  const [username, setUsername] = useState("")
  const [registerKey, setRegisterKey] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000);
    return () => clearTimeout(timeoutId);
  }, [errMsg]);

  const createPilot = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/pilot/create`, {
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "registerKey": registerKey,
        "firstname": firstname,
        "lastname": lastname,
        "password": password,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 409) {
          throw new Error("Der Username ist bereits vergeben!");
        }
        if (response.status === 406) {
          throw new Error("Der Code ist verkehrt!");
        }
        return response.json()
      })
      .then(() =>
        navigate("../login")
      )
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }

  return (
    <div>
      <p>{errMsg}</p>
      <p>Daten eingeben:</p>
      <div>
        <p><input type={"text"} onChange={event => setUsername(event.target.value)} placeholder={"Username"} /></p>
        <p><input type={"text"} onChange={event => setRegisterKey(event.target.value)} placeholder={"Code"} /></p>
        <p><input type={"text"} onChange={event => setFirstname(event.target.value)} placeholder={"Vorname"} /></p>
        <p><input type={"text"} onChange={event => setLastname(event.target.value)} placeholder={"Nachname"} /></p>
        <p><input type={"text"} onChange={event => setPassword(event.target.value)} placeholder={"Passwort"} /></p>
        <button onClick={createPilot}>Pilot registrieren</button>
      </div>
    </div>
  );
}

export default Register;

