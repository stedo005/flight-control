import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import { checkLogin } from '../service/CheckLogin';

function RcModel() {

  interface RcModel {
    id: string
    name: string
  }

  const navigate = useNavigate()
  const param = useParams()

  const [rcModel, setRcModel] = useState({} as RcModel)
  const user = localStorage.getItem("user")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000);
    return () => clearTimeout(timeoutId);
  }, [errMsg]);

  const fetchModel = useCallback(() => {
    fetch(`http://localhost:8080/api/model/${param.modelId}`, {
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
      .then((responseBody: RcModel) => {
        setRcModel(responseBody)
      })
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }, [param.modelId])

  useEffect(() => {
    fetchModel()
  }, [fetchModel])

  return (
    <div>
      <p>{errMsg}</p>
      <p>Willkommen {user}</p>
      <button onClick={() => navigate("/add-rc-model")}>Modell anlegen</button>
      <div>
        {rcModel.name}
        <button>test</button>
      </div>
    </div>
  );
}

export default RcModel;

