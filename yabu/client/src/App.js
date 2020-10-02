import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Register from './components/auth/register';
import Login from './components/auth/login';
import AuthState from './components/auth/authState';
import PrivateRoute from './components/privateRoute';
import ContactState from './contact/contactState';
import setAuthToken from './utilities/setAuthToken';
import AlertState from './alert/alertState';
import Alert from './alert/alert';
import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  return ( 
  <AuthState>
  <ContactState>
  <AlertState>
  <BrowserRouter>
    <Navbar/>
    <Alert/>
    <Switch>
    <PrivateRoute exact path="/" component={Home}/>
    <Route path="/register" component={Register}/>
    <Route path="/login" component={Login}/>

    </Switch>
    </BrowserRouter>
    </AlertState>
    </ContactState>
    </AuthState>

  );
}

export default App;
