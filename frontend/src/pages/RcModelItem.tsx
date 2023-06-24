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

  const [isOnFlightlist, setIsOnFlightlist] = useState(Boolean)

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
        navigate("../flightlist")
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
  }, [props.rcModel?.id])

  useEffect(() => {
    checkFlightList()
  }, [checkFlightList])

  return (
    <>
      {props.rcModel.name}
      {
        isOnFlightlist
          ? <><button >Modell bearbeiten</button></>
          : <><button onClick={addFlight}>Fliegen!</button><button onClick={deleteModel}>Modell löschen</button></>
      }
    </>
  );
}

export default RcModelItem;

