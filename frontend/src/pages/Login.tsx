import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Pilot } from '../entities/interfaces';
import { checkLogin } from '../service/CheckLogin';

function Login() {

  interface AuthData {
    token: string
    username: string
    userId: string
  }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()

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
        navigate("../flightlist")
        localStorage.setItem("token", body.token)
        localStorage.setItem("user", body.username)
        localStorage.setItem("userId", body.userId)
        getPilot(body.userId)
      })
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }

  const getPilot = (userId: string) => {
    fetch(`http://localhost:8080/api/pilot/by-id/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then((response) => {
        checkLogin(response)
        return response.json()
      })
      .then((responseBody: Pilot) => {
        isNotAdmin(responseBody.roles)
        isNotSpeaker(responseBody.roles)
      })
  }

  const isNotSpeaker = (roles: string[]) => {
    const role = roles.find(r => r === "SPEAKER")
    if (role === undefined) {
      localStorage.setItem("isNotSpeaker", "true")
    } else {
      localStorage.setItem("isNotSpeaker", "false")
    }
  }

  const isNotAdmin = (roles: string[]) => {
    const role = roles.find(r => r === "ADMIN")
    if (role === undefined) {
      localStorage.setItem("isNotAdmin", "true")
    } else {
      localStorage.setItem("isNotAdmin", "false")
    }
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
  )
}

export default Login;
