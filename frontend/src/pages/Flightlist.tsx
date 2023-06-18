import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Flight } from '../entities/interfaces';
import { checkLogin } from '../service/CheckLogin';

function Flightlist() {

  const navigate = useNavigate()

  const [flightlist, setFlightlist] = useState([] as Array<Flight>)
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrMsg(''), 10000);
    return () => clearTimeout(timeoutId);
  }, [errMsg]);

  const getAllFlights = () => {
    fetch(`http://localhost:8080/api/flight`, {
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
      .then((responseBody: Array<Flight>) => {
        setFlightlist(responseBody)
      })
      .catch((e: Error) => {
        setErrMsg(e.message)
      })
  }

  useEffect(() => {
    getAllFlights()
  }, [])

  return (
    <div>
      <p>{errMsg}</p>
      {
        flightlist.length > 0
        ? flightlist.map((flight) => <p key={flight.rcModel.id}>{flight.rcModel.name}</p>)
        : "Noch will niemand fliegen ;)"
      }
    </div>
  );
}

export default Flightlist;

