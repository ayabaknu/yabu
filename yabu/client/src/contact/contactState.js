import React,{useReducer} from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
ADD_CONTACT,
GET_CONTACT,
DELETE_CONTACT,
UPDATE_CONTACT,
FILTER_CONTACTS,
CLEAR_CONTACT,
CLEAR_FILTER,
SET_CURRENT,
CLEAR_CURRENT,
CONTACT_ERROR
} from './types';

function ContactState(props){
  const initialState={
    contacts:null,
    current:null,
    filtered:null,
    error:null
  }
  const [state,dispatch]=useReducer(contactReducer,initialState)

  //  add contact
  const addContact = async contact=>{
    const config={
      'Content-Type':'application/json'
    }
    try{
      const res= await axios.post('/api/contacts',contact,config)
      dispatch({type:ADD_CONTACT,payload:res.data})

    }catch(err){
      dispatch({type:CONTACT_ERROR,payload:err.response.message})
    }
  }

// get contact

 const getContact= async()=>{
  try{
        const res= await axios.get('/api/contacts')
        dispatch({
          type:GET_CONTACT,
          payload:res.data
        })
  }catch(err){
      dispatch({
        type:CONTACT_ERROR,
        payload:err.response.message
      })
  }
}
     
     
  // update contact
     const updateContact= async contact=>{
      const config={
        'Content-Type':'application/json'
      }
      try{
        const res= await axios.put(`/api/contacts/${contact._id}`,contact,config)

      dispatch({type:UPDATE_CONTACT,payload:res.data})
         
      }catch(err){
        dispatch({type:CONTACT_ERROR,payload:err.response.message})
      }
    }

  //  delete contact
  const deleteContact= async id =>{
    try{
      await axios.delete(`/api/contacts/${id}`)
      dispatch({
        type:DELETE_CONTACT,
        payload:id
      })
 }catch(err){
     dispatch({
       type:CONTACT_ERROR,
       payload:err.response.message
     })
 }
}

  // setCurrent
  const setCurrent = contacts =>{
    dispatch({type:SET_CURRENT,payload:contacts})
  }
  // clearcurrent
  const clearCurrent = ()=>{
    dispatch({type:CLEAR_CURRENT})
  }

  // filter contacts
    const filterContacts = text =>{
    dispatch({type:FILTER_CONTACTS,payload:text})}

    // clear filter
    const clearFilter = ()=>{
      dispatch({type:CLEAR_FILTER})}

    // clearContact
      const clearContact =()=>{
        dispatch({type:CLEAR_CONTACT})
      }


  return(
    <ContactContext.Provider value={{contacts:state.contacts,current:state.current,
    addContact,deleteContact,setCurrent,clearCurrent,updateContact,filtered:state.filtered,
    filterContacts,clearFilter,error:state.error,getContact,clearContact}}>
      {props.children}
    </ContactContext.Provider>
  )
  }

export default ContactState;