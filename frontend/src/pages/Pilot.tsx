import React, { useState } from 'react';
import '../App.css';

function Pilot() {

  interface Pilot {
    id: string
    name: string
  }

  const [pilots, setPilots] = useState([] as Array<Pilot>)
  const [pilotName, setPilotName] = useState("")

  const fetchPilots = () => {
    fetch("http://localhost:8080/api/pilot/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => {
        return response.json()
      })
      .then((responseBody: Array<Pilot>) => setPilots(responseBody))
  }

  const createPilot = () => {
    fetch("http://localhost:8080/api/pilot/create", {
      method: "POST",
      body: JSON.stringify({
        "name": pilotName
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
  }

  return (
    <div>
      <p>Hallo</p>
      <div>
        <button onClick={createPilot}>Pilot anlegen</button>
        <input type={"text"} onChange={event => setPilotName(event.target.value)} />
      </div>
      <button onClick={fetchPilots}>alle Piloten</button>
      {
        pilots.map(pilot => <p>{pilot.name}</p>)
      }
    </div>
  );
}

export default Pilot;
