import React,{useContext,useRef,useEffect} from 'react';
import ContactContext from './contactContext'

  const ContactFilter = () => {
  const contactContext= useContext(ContactContext)
  const {filterContacts,clearFilter,filtered}=contactContext
  useEffect(()=>{
    if(filtered === null){
      text.current.value='';
    }
  })
  const text=useRef('')
  const change = e =>{
    if(text.current.value !== ''){
      filterContacts(e.target.value)
    }else{
      clearFilter();
    }
  }
  
  return (
    <form className="filter">
      <input ref={text} type="text" placeholder="filter" onChange={change}/>
    </form>
  )
}

export default ContactFilter
