import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import { checkLogin } from '../service/Service';

function AddRcModelAdmin() {

  const navigate = useNavigate()
  const params = useParams()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000);
    return () => clearTimeout(timeoutId);
  }, [errMsg]);

  const createModel = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/model/create`, {
      method: "POST",
      body: JSON.stringify({
        "name": name,
        "description": description,
        "pilotId": params.pilotId,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then((response) => {
        checkLogin(response)
        navigate(`/pilot/${params.pilotId}`)
      })
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }

  return (
    <div>
      <p>{errMsg}</p>
      <p><input type={"text"} onChange={event => setName(event.target.value)} placeholder={"Modellname"} /></p>
      <p><input type={"text"} onChange={event => setDescription(event.target.value)} placeholder={"Beschreibung"} /></p>
      <button onClick={createModel}>Modell anlegen</button>
    </div>
  );
}

export default AddRcModelAdmin;

