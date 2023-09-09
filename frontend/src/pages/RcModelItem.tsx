import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { RcModel } from '../entities/interfaces';
import { checkLogin } from '../service/Service';

interface RcModelItemProps {
  rcModel: RcModel
  onItemChange: () => void
}

interface IsOnFlightlist {
  isOnFlightlist: boolean
}

function RcModelItem(props: RcModelItemProps) {

  const [isOnFlightlist, setIsOnFlightlist] = useState(true)
  const [isPilotOnFlightlist, setIsPilotOnFlightlist] = useState(true)

  const navigate = useNavigate()

  const addFlight = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/flight/add/${props.rcModel.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then((response) => {
        checkLogin(response)
        return response.json()
      })
      .then(() => {
        navigate("../")
        checkFlightList()
        props.onItemChange()
      })
  }

  const deleteModel = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/model/delete/${props.rcModel.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(props.onItemChange)
  }

  const checkFlightList = useCallback(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/flight/is-model-on-flightlist/${props.rcModel.id}`, {
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
      .then((responseBody: IsOnFlightlist) => {
        setIsOnFlightlist(responseBody.isOnFlightlist)
      })
  }, [props.rcModel.id])

  const checkIsPilotOnFlightList = useCallback(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/flight/is-pilot-on-flightlist/${props.rcModel.pilotId}`, {
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
      .then((responseBody: boolean) => {
        setIsPilotOnFlightlist(responseBody)
      })
  }, [props.rcModel.pilotId])

  useEffect(() => {
    checkFlightList()
    checkIsPilotOnFlightList()
  }, [checkFlightList, checkIsPilotOnFlightList])

  return (
    <>
      {props.rcModel.name}
      <button onClick={() => navigate(`../update-rc-model/${props.rcModel.id}`)} >Modell bearbeiten</button>
      <button onClick={deleteModel} hidden={isOnFlightlist}>Modell löschen</button>
      <button onClick={addFlight} hidden={isPilotOnFlightlist}>Fliegen!</button>
    </>
  );
}

export default RcModelItem;

