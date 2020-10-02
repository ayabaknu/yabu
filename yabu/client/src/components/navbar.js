import React,{Fragment,useContext} from 'react';
import AuthContext from './auth/authContext';
import ContactContext from '../contact/contactContext';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import '../App.css';


function Navbar({title,icon}) {
  const authContext=useContext(AuthContext)
  const contactContext=useContext(ContactContext)
  const {clearContact} = contactContext
  const {isAuthenticated,logout,user}=authContext;
  const onLogout=()=>{
    logout();
    clearContact();
    window.location.reload()
  }
  const authLink=(
    <Fragment>
      <li>hello {user && user.name}</li>
      <li> 
        <a href="#!" onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i><span className='hide-sm text-white' >logout</span>
        </a>
      </li>
    </Fragment>
  )
  const guestLink=(
    <Fragment>
      <li><Link to='/register' className='text-white'>register</Link></li>
      <li><Link to='/login' className='text-white'>login</Link></li>
    </Fragment>
  )
  return (
    <div className='navbar bg-primary'>
      <h1><i className={icon}/> {title}</h1>
      <ul className="nav-ul">
      {isAuthenticated ? authLink: guestLink}
      </ul>
    </div>
  )
}
Navbar.propTypes={
  title:PropTypes.string.isRequired,
  icon:PropTypes.string
}
Navbar.defaultProps={
  title:'merng',
  icon:'fas fa-id-card-alt'
}


export default Navbar
