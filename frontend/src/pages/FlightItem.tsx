import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import { Pilot, RcModel } from '../entities/interfaces';
import { checkLogin } from '../service/CheckLogin';

interface FlightItemProps {
  rcModel: RcModel
  isNotActualFlight: boolean
  justOneFlight: boolean
  onItemChange: () => void
}

function FlightItem(props: FlightItemProps) {

  const [pilotRcModel, setPilotRcModel] = useState({} as Pilot)

  const getPilotRcModel = useCallback(() => {
    fetch(`http://localhost:8080/api/pilot/detail/${props.rcModel.pilotId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        checkLogin(response)
        return response.json()
      })
      .then((responseBody: Pilot) => {
        setPilotRcModel(responseBody)
      })
  }, [props.rcModel.pilotId])

  const deleteFromFlightList = (id: string) => {
    fetch(`http://localhost:8080/api/flight/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(
        props.onItemChange
      )
  }

  useEffect(() => {
    getPilotRcModel()
  }, [getPilotRcModel])

  function isNotSpeaker(bool: string | null): boolean {
    if (bool === null) {
      return true
    }
    if (bool === "true") {
      return true
    }
    if (bool === "false") {
      return false
    } else {
      return true
    }
  }

  return (
    <>
      <p>{pilotRcModel.firstname} {pilotRcModel.lastname} mit {props.rcModel.name}
        <button
          onClick={() => deleteFromFlightList(props.rcModel.id)}
          hidden={isNotSpeaker(localStorage.getItem("isNotSpeaker")) || props.isNotActualFlight}>Flug beendet</button>
      </p>
      <p hidden={props.isNotActualFlight}>Beschreibung: {props.rcModel.description}</p>
      <p hidden={props.isNotActualFlight || props.justOneFlight}>Nächster:</p>
    </>
  );
}

export default FlightItem;

