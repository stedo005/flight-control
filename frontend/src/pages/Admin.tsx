import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Pilot } from '../entities/interfaces';

function Admin() {

  const navigate = useNavigate()
  const [pilots, setPilots] = useState([] as Array<Pilot>)

  const fetchPilots = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/pilot/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(response => {
        return response.json()
      })
      .then((responseBody: Array<Pilot>) => setPilots(responseBody))
  }

  useEffect(() => {
    fetchPilots()
  },[])

  return (
    <div>
      {
        pilots.map(pilot => <p key={pilot.id}>{pilot.firstname} {pilot.lastname}<button onClick={() => navigate(`../pilot-admin/${pilot.id}`)}>zum Pilot</button></p>)
      }
    </div>
  );
}

export default Admin;
