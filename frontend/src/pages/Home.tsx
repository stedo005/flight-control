import React, { useState } from 'react';
import '../App.css';

function Home() {

  interface Pilot {
    id: string
    name: string
  }

  const [pilots, setPilots] = useState([] as Array<Pilot>)

  const fetchPilots = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/pilot/all`, {
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
    fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/create-pilot`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
  }

  return (
    <div>
      <p>Hallo</p>
      <button onClick={createPilot}>neuer Pilot</button>
      <button onClick={fetchPilots}>alle Piloten</button>
      {
        pilots.map(pilot => <p>{pilot.name}</p>)
      }
    </div>
  );
}

export default Home;
