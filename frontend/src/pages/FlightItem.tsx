import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import { Pilot, RcModel } from '../entities/interfaces';
import { checkLogin } from '../service/CheckLogin';

interface FlightItemProps {
  rcModel: RcModel
}

function FlightItem(props: FlightItemProps) {

  const [pilot, setPilot] = useState({} as Pilot)

  const getPilot = useCallback(() => {
    fetch(`http://localhost:8080/api/pilot/by-id/${props.rcModel.pilotId}`, {
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
      .then((responseBody: Pilot) => {
        setPilot(responseBody)
      })
  }, [props.rcModel.pilotId])

  useEffect(() => {
    getPilot()
  }, [getPilot])

  return (
    <>
      {pilot.firstname} {pilot.lastname} mit {props.rcModel.name}
    </>
  );
}

export default FlightItem;

