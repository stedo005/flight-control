import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import { RcModel } from '../entities/interfaces';
import { checkLogin } from '../service/CheckLogin';

interface RcModelItemProps {
  rcModel: RcModel
  onItemChange: () => void
}

interface IsOnFlightlist {
  isOnFlightlist: boolean
}

function RcModelItem(props: RcModelItemProps) {

  const [isOnFlightlist, setIsOnFlightlist] = useState(Boolean)

  const addFlight = () => {
    fetch(`http://localhost:8080/api/flight/add/${props.rcModel?.id}`, {
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
        checkFlightList()
        props.onItemChange()
      })
  }

  const checkFlightList = useCallback(() => {
    fetch(`http://localhost:8080/api/flight/is-model-on-flightlist/${props.rcModel?.id}`, {
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
  }, [props.rcModel?.id])

  useEffect(() => {
    checkFlightList()
  }, [checkFlightList])

  return (
    <>
      {props.rcModel?.name}
      {
        isOnFlightlist
          ? ""
          : <button onClick={addFlight}>Fliegen!</button>
      }
    </>
  );
}

export default RcModelItem;

