import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import { Pilot, RcModel } from '../entities/interfaces';
import { checkLogin } from '../service/Service';
import RcModelItem from './RcModelItem';

function PilotItemAdmin() {

  const navigate = useNavigate()
  const params = useParams()

  const [pilot, setPilot] = useState({} as Pilot)
  const [rcModels, setRcModels] = useState([] as Array<RcModel>)
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000)
    return () => clearTimeout(timeoutId);
  }, [errMsg])

  const fetchPilot = useCallback(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/pilot/by-id/${params.pilotId}`, {
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
        setPilot(responseBody)
        setRcModels(responseBody.rcModels)
      })
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  },[params.pilotId])

  useEffect(() => {
    fetchPilot()
  }, [fetchPilot])

  return (
    <div>
      <p>{errMsg}</p>
      <p>Willkommen {pilot.firstname} {pilot.lastname}</p>
      <button onClick={() => navigate(`/update-pilot/${pilot.id}`)}>Pilot bearbeiten</button>
      <button onClick={() => navigate(`/add-rc-model-admin/${pilot.id}`)}>neues Modell anlegen</button>
      <div>
        {
          rcModels.length > 0
            ?
            rcModels.map(model => <p key={model.id} ><RcModelItem rcModel={model} onItemChange={fetchPilot} /></p>)
            :
            "Du hast noch keine Modelle angelegt."
        }
      </div>
    </div>
  );
}

export default PilotItemAdmin;

