import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  GET_CONTACT,
  CLEAR_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
  CONTACT_ERROR
  } from './types';

  export default (state,action)=>{
    switch(action.type){
      case ADD_CONTACT:
        return {
          ...state,
          contacts:[...state.contacts,action.payload],
          loading:false
        };
        case DELETE_CONTACT:
          return {
            ...state,
            contacts:state.contacts.filter(contact=> contact._id !== action.payload),loading:false
          };
        case GET_CONTACT:
          return {
            ...state,contacts:action.payload,loading:false
          };
        case CLEAR_CONTACT:
          return{
            ...state,
            contacts:null,
            filtered:null,
            current:null,
            error:null
          }
        case  SET_CURRENT:
          return {
            ...state,
            current:action.payload
          };
        case CLEAR_CURRENT:
         return {
           ...state,
           current:null

         };
         case UPDATE_CONTACT:
           return {
             ...state,
             contacts:state.contacts.map(contact=>
             contact._id === action.payload._id ? action.payload : contact
             ),loading:false
           };
           case FILTER_CONTACTS:
             return {
               ...state,
               filtered: state.contacts.filter(contact=>{
               const regExp= new RegExp(`${action.payload}`,'gi')
               return contact.name.match(regExp) || contact.email.match(regExp)
               })
             };
             case CLEAR_FILTER:
             return {
               ...state,
               filtered:null
                  };
             case CONTACT_ERROR:
               return{
                 ...state,error:action.payload
               }
           default :
            return state;
    }
  }