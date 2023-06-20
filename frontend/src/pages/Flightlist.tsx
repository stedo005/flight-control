import React, { useEffect, useState } from 'react';
import '../App.css';
import { Flight } from '../entities/interfaces';
import FlightItem from './FlightItem';

function Flightlist() {

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
      }
    })
      .then((response) => {
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

  const isNotActualFlight = (id: string): boolean => {
    return flightlist[0].rcModel.id !== id
  }

  return (
    <div>
      <p>{errMsg}</p>
      es fliegt gerade:
      {
        flightlist.length > 0
          ? flightlist.map((flight) => <FlightItem
            key={flight.rcModel.id}
            rcModel={flight.rcModel}
            isNotActualFlight={isNotActualFlight(flight.rcModel.id)}
            onItemChange={getAllFlights}
            justOneFlight={flightlist.length == 1} />)
          : " Noch will niemand fliegen ;)"
      }
    </div>
  );
}

export default Flightlist;

