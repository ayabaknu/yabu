import React,{useContext,useEffect} from 'react'
import Contact from '../contact/contact'
import ContactForm from './contactForm'
import ContactFilter from '../contact/contactFilter'
import AuthContext from './auth/authContext'
import '../App.css';

function Home(props) {
  const authContext= useContext(AuthContext)
  useEffect(()=>{
    if(!authContext.isAuthenticated){
      props.history.push('/login')  //  to login page
    }
    authContext.loadUser()
    // eslint-disable-next-line 
  },[])
  return (
    <div className="home-container">
      <div>
        <ContactForm/>
      </div>
      <div>
      <ContactFilter/>
      <Contact/>
      </div>
    </div>
  )
}

export default Home
