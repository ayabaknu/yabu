import React,{useState,useContext,useEffect} from 'react'
import AuthContext from './authContext'
import AlertContext from '../../alert/alertContext'
const Login = (props) => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)
  const {setAlert}=alertContext
  const {login,error,clearError,isAuthenticated}=authContext
  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/')  //  to home page
    }
   if(error==='invalid credentials'){
     setAlert(error,'danger')
     clearError()
   }
   // eslint-disable-next-line
 },[error,isAuthenticated,props.history])
  const [user,setUser]=useState({
    email:'',
    password:'',
    
  })
  const {email,password}= user;
  const change= e =>setUser({...user,[e.target.name]:e.target.value})
  const submit=e=>{
    e.preventDefault()
    if(email==='' || password===''){
       setAlert('please fill all fields','danger')
    }else{
      login({
        email,
        password
      })
    }
  }

  return (
    <div className='form-container'>
      <h1>Account <span className='text-primary'>login</span></h1>
      <form onSubmit={submit}>
        
        <div className='form-group'>
          <label htmlFor='email'>email</label>
          <input type='email' name='email' value={email} onChange={change}/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>password</label>
          <input type='password' name='password' value={password} onChange={change}/>
        </div>
        
        <input type='submit' value='login' className='btn btn-primary btn-block'/>
      </form>
    </div>
  )
}

export default Login;
