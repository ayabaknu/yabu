import React,{Fragment,useContext,useEffect} from 'react'
import ContactContext from './contactContext'
import ContactItem from './contactItem'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
const P =()=> (<p>loading...</p>)

const Contact = () => {
  const contactcontext=useContext(ContactContext)
  const{contacts,filtered,getContact,loading}= contactcontext
  
  useEffect(()=>{
    getContact();
    // eslint-disable-next-line
  },[])

  if(contacts !== null && contacts.length===0 && !loading){
    return <h5>please add contact</h5>
  }
  return (
    <div>
      <Fragment>
        {contacts !== null && !loading? (
          <TransitionGroup>
          {filtered !== null? filtered.map(contact=> (
            <CSSTransition key={contact._id} timeout={500} classNames='item' >
            <ContactItem  contacts={contact}/></CSSTransition>)): contacts.map(contact=> (
            <CSSTransition key={contact._id} timeout={500} classNames='item' >
            <ContactItem contacts={contact}/></CSSTransition>
            ))}
            </TransitionGroup>
        ) : <P/> }

      </Fragment>
    </div>         
  )
}

export default Contact
