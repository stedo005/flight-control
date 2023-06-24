import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Pilot, RcModel } from '../entities/interfaces';
import { checkLogin } from '../service/Service';
import RcModelItem from './RcModelItem';

function PilotItem() {

  const navigate = useNavigate()

  const [rcModels, setRcModels] = useState([] as Array<RcModel>)
  const user = localStorage.getItem("user")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000)
    return () => clearTimeout(timeoutId);
  }, [errMsg])

  const fetchPilot = useCallback(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/pilot/${user}`, {
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
          rcModels.length > 0
            ?
            rcModels.map(model => <p key={model.id} ><RcModelItem rcModel={model} onItemChange={fetchPilot}/></p>)
            :
            "Du hast noch keine Modelle angelegt."
        }
      </div>
    </div>
  );
}

export default PilotItem;

