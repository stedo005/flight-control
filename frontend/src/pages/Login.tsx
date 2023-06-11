import React, { useEffect, useState } from 'react';
import '../App.css';

function Login() {

  interface AuthData {
    token: string
    username: string
  }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000);
    return () => clearTimeout(timeoutId);
  }, [errMsg]);

  const login = () => {
    fetch(`http://localhost:8080/api/auth`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Username oder Passwort falsch!")
        }
        return response.json()
      })
      .then((body: AuthData) => {
        localStorage.setItem("token", body.token)
        localStorage.setItem("user", body.username)
      })
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }

  return (
    <div>
      <p>{errMsg}</p>
      <div>
        <button onClick={login}>login</button>
        <input type={"text"} onChange={event => setUsername(event.target.value)} placeholder={"Name"} />
        <input type={"text"} onChange={event => setPassword(event.target.value)} placeholder={"Passwort"} />
      </div>
    </div>
  );
}

export default Login;
