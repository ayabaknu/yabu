import React,{useContext} from 'react'
import ContactContext from './contactContext'

const ContactItem = ({contacts}) => {
  const contactContext=useContext(ContactContext)
  const {deleteContact,setCurrent,clearCurrent} = contactContext
  const {_id,name,email,phone,type} = contacts
  
  const onDelete = ()=>{
   deleteContact(_id);
   clearCurrent();
  }
  return (
    <div className='mb-2 bg-light'>
      <div className="d-flex justify-content-between flex-wrap">
        <h3 className='text-primary'> {name}{''} </h3>
        <h3><span className={'badge ' + (type==='professional'? 'badge-success': 'badge-primary')}>{type.charAt(0).toUpperCase() + type.slice(1)}</span></h3>
      </div>
      <ul className="contact-ul">
        {email && <i className='mb-2 fas fa-envelope-open'> {email}</i>}  
        {phone && <i className='fas fa-phone'> {phone}</i>}

      </ul>
      <div>
          <button className='btn btn-dark btn-sm' onClick={()=> setCurrent(contacts)}>edit</button>
          <button className='btn btn-danger btn-sm' onClick={onDelete}>delete</button>
      </div>

    </div>
  )
}

export default ContactItem
