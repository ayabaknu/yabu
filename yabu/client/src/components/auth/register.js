import React,{useState,useContext,useEffect} from 'react'
import AlertContext from '../../alert/alertContext'
import AuthContext from './authContext'


const Register = (props) => {
const alertContext = useContext(AlertContext)
const authContext = useContext(AuthContext)

const {setAlert}=alertContext
const {register,error,clearError,isAuthenticated}=authContext
useEffect(()=>{
   if(isAuthenticated){
     props.history.push('/')  //  to home page
   }
  if(error==='user already existed'){
    setAlert(error,'danger')
    clearError()
  }
  // eslint-disable-next-line
},[error,isAuthenticated,props.history])

  const [user,setUser]=useState({
    name:'',
    email:'',
    password:'',
    password2:''
    
  })
  const {name,email,password,password2}= user;
  const change= e =>setUser({...user,[e.target.name]:e.target.value})

  const submit = e =>{
    e.preventDefault()
    if(name ==='' || email ==='' || password===''){
      
      setAlert('please enter allfields','danger')
    }else if(password !== password2){
        setAlert('password do not match','danger')
      } else{
        register({
          name,
          email,
          password
        })
    // console.log('registered')
      
    }
  }

  return (
    <div className='form-container'>
      <h1>Account <span className='text-primary'>register</span></h1>
      <form onSubmit={submit}>
        <div className='form-group'>
          <label htmlFor='name'>name</label>
          <input type='text' name='name' value={name} onChange={change} required/>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>email</label>
          <input type='email' name='email' value={email} onChange={change} required/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>password</label>
          <input type='password' name='password' value={password} onChange={change} minLength="6" required/>
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>confirm password</label>
          <input type='password' name='password2' value={password2} onChange={change} required/>
        </div>
        <input type='submit' value='register' className='btn btn-primary btn-block'/>
      </form>
    </div>
  )
}

export default Register
