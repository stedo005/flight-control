import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { checkLogin } from '../service/CheckLogin';

function AddRcModel() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000);
    return () => clearTimeout(timeoutId);
  }, [errMsg]);

  const createModel = () => {
    fetch(`http://localhost:8080/api/model/create`, {
      method: "POST",
      body: JSON.stringify({
        "name": name,
        "pilotId": localStorage.getItem("userId"),
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then((response) => {
        checkLogin(response)
        navigate("/pilot")
      })
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }

  return (
    <div>
      <p>{errMsg}</p>
      <p><input type={"text"} onChange={event => setName(event.target.value)} placeholder={"Modellname"} /></p>
      <button onClick={createModel}>Modell anlegen</button>
    </div>
  );
}

export default AddRcModel;

