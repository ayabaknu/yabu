import React,{useReducer} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utilities/setAuthToken';

import {
 REGISTER_SUCCESS,
 REGISTER_FAIL,
 USER_LOADED,
 AUTH_FAIL,
 LOGIN_SUCCESS,
 LOGIN_FAIL,
 LOGOUT,
 CLEAR_ERRORS 
} from '../../contact/types';

function AuthState(props){
  const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null,
    error:null
  }
  const [state,dispatch]=useReducer(authReducer,initialState)

  // load user
  // load token into global header
    const loadUser= async ()=>{
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
     try{
      const res= await axios.get('/api/auth')
      dispatch({type:USER_LOADED,payload:res.data})
     } catch(err){
       dispatch({type:AUTH_FAIL})
     }
    }

  // register
   const register= async formData =>{
      const config ={
         headers:{
           'content-type':'application/json',
           }
      }
      try{
        const res= await axios.post('/api/users',formData,config)
        dispatch({
          type:REGISTER_SUCCESS,
          payload:res.data
        })
        loadUser();
      }catch(err){
        dispatch({
          type:REGISTER_FAIL,
          payload:err.response.data.message
        })
      }
   }
  // login
  const login= async formData =>{
     const config ={
        headers:{
          'Content-Type':'application/json',
          }
     }
     try{
       const res= await axios.post('/api/auth',formData,config)
       dispatch({
         type: LOGIN_SUCCESS,
         payload:res.data
       })
       loadUser();
     }catch(err){
       dispatch({
         type:LOGIN_FAIL,
         payload:err.response.data.message
       })
     }
  }

  // logout
     const logout=()=> {
        dispatch({type:LOGOUT})
     }
  // clearerror
  const clearError= ()=> dispatch({type:CLEAR_ERRORS})
  return(
    <AuthContext.Provider value={{
      token:state.token,
      isAuthenticated:state.isAuthenticated,
      loading:state.loading,
      user:state.user,
      error:state.error,
      register,
      clearError,
      loadUser,
      login,
      logout
    }}>
      {props.children}
    </AuthContext.Provider>
  )
  }

export default AuthState;