import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Register() {

  const [username, setUsername] = useState("")
  const [registerKey, setRegisterKey] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [club, setClub] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
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
        "club": club,
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

  const validateRegister = () => {
    if (username.length < 3) {
      setErrMsg("Der Username ist zu kurz!")
    } else if (firstname.length < 3) {
      setErrMsg("Der Vorname ist zu kurz!")
    } else if (lastname.length < 3) {
      setErrMsg("Der Nachname ist zu kurz!")
    } else if (club.length < 3) {
      setErrMsg("Der Verein ist zu kurz!")
    } else if (password.length < 3) {
      setErrMsg("Das Passwort ist zu kurz!")
    } else if (password !== passwordAgain) {
      setErrMsg("Die Passwörter stimmen nicht überein!")
    } else {
      createPilot()
    }
  }

  return (
    <div>
      <p>Bitte gib deine Daten ein:</p>
      <p>{errMsg}</p>
      <div>
        <p><input type={"text"} onChange={event => setUsername(event.target.value)} placeholder={"Username"} /></p>
        <p><input type={"text"} onChange={event => setRegisterKey(event.target.value)} placeholder={"Code"} /></p>
        <p><input type={"text"} onChange={event => setFirstname(event.target.value)} placeholder={"Vorname"} /></p>
        <p><input type={"text"} onChange={event => setLastname(event.target.value)} placeholder={"Nachname"} /></p>
        <p><input type={"text"} onChange={event => setClub(event.target.value)} placeholder={"Modellflugverein"} /></p>
        <p><input type={"text"} onChange={event => setPassword(event.target.value)} placeholder={"Passwort"} /></p>
        <p><input type={"text"} onChange={event => setPasswordAgain(event.target.value)} placeholder={"Passwort wiederholen"} /></p>
        <button onClick={createPilot}>Pilot registrieren</button>
        <button onClick={validateRegister}>validate</button>
      </div>
    </div>
  );
}

export default Register;

