import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import { Pilot } from '../entities/interfaces';

function UpdatePilot() {

  const [oldPilot, setOldPilot] = useState({} as Pilot)
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [errMsg, setErrMsg] = useState("")

  const navigate = useNavigate()
  const param = useParams()

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000);
    return () => clearTimeout(timeoutId);
  }, [errMsg]);

  const getOldPilot = useCallback(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/pilot/by-id/${param.pilotId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
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
      .then((responseBody: Pilot) => {
        setOldPilot(responseBody)
        setFirstname(responseBody.firstname)
        setLastname(responseBody.lastname)
      })
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }, [param.pilotId])

  useEffect(() => {
    getOldPilot()
  }, [getOldPilot])

  const updatePilot = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/pilot/update`, {
      method: "PUT",
      body: JSON.stringify({
        "id": oldPilot.id,
        "firstname": firstname,
        "lastname": lastname,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
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
        navigate(`../pilot/${param.pilotId}`)
      )
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }

  return (
    <div>
      <p>{errMsg}</p>
      <div>
        <p><input type={"text"} defaultValue={oldPilot.firstname} onChange={event => setFirstname(event.target.value)} placeholder={"Vorname"} /></p>
        <p><input type={"text"} defaultValue={oldPilot.lastname} onChange={event => setLastname(event.target.value)} placeholder={"Nachname"} /></p>
        <button onClick={updatePilot}>speichern</button>
        <button onClick={() => navigate(`../pilot/${param.pilotId}`)}>abbrechen</button>
      </div>
    </div>
  );
}

export default UpdatePilot;

