import React,{useState,useContext,useEffect}from 'react'
import ContactContext from '../contact/contactContext'
import '../App.css';


const ContactForm = () => {
  const contactContext= useContext(ContactContext);
  const { current,clearCurrent,addContact,updateContact}= contactContext


  useEffect(()=>{
    if(current !== null){
      setContact(current)
    }else(
      setContact({
        name:'',
        email:'',
        phone:'',
        type:'personal'
      })
    )
  },[contactContext,current])

  const [contact,setContact]=useState({
    name:'',
    email:'',
    phone:'',
    type:'personal'
})

const {name,email,phone,type}= contact;

const change = e => {
  setContact({...contact,[e.target.name]:e.target.value})}

const onSubmit = e =>{
    e.preventDefault();
    if(current=== null){
      addContact(contact);
    }else{
      updateContact(contact);
    }

    clearAll()
  }
  const clearAll = ()=>{
    clearCurrent();
  }


  return (
    <form className="form-group" onSubmit={onSubmit}>
      <h2 className='text-primary'>{current? 'edit contact': 'Add contact'}</h2>
      <input type='text' placeholder='name' name='name' value={name} onChange={change}/>
      <input type='email' placeholder='email' name='email' value={email} onChange={change}/>
      <input type='text' placeholder='phone' name='phone' value={phone} onChange={change}/>
      <h4>contact Type</h4>
      <input 
      type='radio' 
      name='type'
      value='personal' 
       checked={type==='personal'} 
       onChange={change}/>personal{''}
      <input 
      type='radio' 
      name='type' value='professional' checked={type==='professional'} onChange={change}/>professional
      <div>
        <input 
        type='submit' 
        value = {current? 'update contact': 'add contact'}
        className='btn btn-primary btn-block'/>
        </div>
        {current && (
          <div>
          <button className='btn btn-light btn-block' onClick={clearAll} >clear</button>
         </div>
          )}
    </form>
  )
}

export default ContactForm
