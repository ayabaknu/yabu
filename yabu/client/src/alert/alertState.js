import React,{useReducer} from 'react'
import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import uuid from 'uuid'


import {
 SET_ALERT,
 REMOVE_ALERT
} from '../contact/types';key

function AlertState(props){
  const initialState=[]
    
  const [state,dispatch]=useReducer(alertReducer,initialState)
    
  // setAlert
    const setAlert=(message,type)=>{
      const id= uuid.v4()
       dispatch({
        type:SET_ALERT,
        Payload: { message, type, id}
      })
      setTimeout(()=> dispatch({type:REMOVE_ALERT,payload:id}),5000)

    }
  return(
    <AlertContext.Provider value={{
    alerts:state,
    setAlert
    }}>
      {props.children}
    </AlertContext.Provider>
  )
  }
export default AlertState;
