import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import { RcModel } from '../entities/interfaces';
import { checkLogin } from '../service/Service';

function UpdateRcModel() {

  const navigate = useNavigate()
  const params = useParams()

  const [rcModelOld, setRcModelOld] = useState({} as RcModel)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000);
    return () => clearTimeout(timeoutId);
  }, [errMsg]);

  const getModel = useCallback(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/model/${params.modelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then((response) => {
      checkLogin(response)
      return response.json()
    })
      .then((responseBody: RcModel) => {
        setRcModelOld(responseBody)
        setName(rcModelOld.name)
        setDescription(rcModelOld.description)
      })
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }, [params.modelId, rcModelOld.name, rcModelOld.description])

  const updateModel = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/model/update`, {
      method: "PUT",
      body: JSON.stringify({
        "name": name,
        "id": rcModelOld.id,
        "pilotId": rcModelOld.pilotId,
        "description": description,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then((response) => {
        checkLogin(response)
        navigate(`../pilot/${rcModelOld.pilotId}`)
      })
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }

  useEffect(() => { getModel() }, [getModel])

  return (
    <div>
      <p>{errMsg}</p>
      <p><input type={"text"} defaultValue={rcModelOld.name} onChange={event => setName(event.target.value)} placeholder={"Modellname"} /></p>
      <p><input type={"text"} defaultValue={rcModelOld.description} onChange={event => setDescription(event.target.value)} placeholder={"Beschreibung"} /></p>
      <button onClick={updateModel}>speichern</button>
      <button onClick={() => navigate(`../pilot/${rcModelOld.pilotId}`)}>abbrechen</button>
    </div>
  );
}

export default UpdateRcModel;