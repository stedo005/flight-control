import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { checkLogin } from '../service/CheckLogin';

function Pilot() {

  interface Pilot {
    rcModels: Array<RcModel>
  }

  interface RcModel {
    id: string
    name: string
  }

  const navigate = useNavigate()

  const [rcModels, setRcModels] = useState([] as Array<RcModel>)
  const user = localStorage.getItem("user")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000)
    return () => clearTimeout(timeoutId);
  }, [errMsg])

  const fetchPilot = useCallback(() => {
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
      .then((responseBody: Pilot) => {
        setRcModels(responseBody.rcModels)
      })
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }, [user])

  useEffect(() => {
    fetchPilot()
  }, [fetchPilot])

  return (
    <div>
      <p>{errMsg}</p>
      <p>Willkommen {user}</p>
      <button onClick={() => navigate("/add-rc-model")}>Modell anlegen</button>
      <div>
        {
          rcModels
            .map(model => <p key={model.id}><button onClick={() => navigate(`/rc-model/${model.id}`)}>{model.name}</button></p>)
        }
      </div>
    </div>
  );
}

export default Pilot;

