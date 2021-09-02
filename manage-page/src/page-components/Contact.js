import {RiMoreLine} from "react-icons/ri";
import { useState } from "react";
import ContactInfo from "./ContactInfo";
import { useSelector, useDispatch } from "react-redux";

function Contact({id, contact}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const isEdit = useSelector(state => state.isEdit)


  return (
    // <Link to={"/" + contact.firstName + "-" + contact.lastName}>
      <div className="Contact" >
        
        <div className="ContactHeader">
          <div className="name">{contact.firstName + " " + contact.lastName}</div>
          <div className="occupation">{contact.occupation}</div>
        </div>

        <div className="email">{contact.email}</div>
        {
          isEdit 
          ? <input type="checkbox" style={{transform: "scale(2.5)"}}/> 
          : <RiMoreLine onClick={()=>setIsOpen(true)} size={30} className="more"/>
        }
        <ContactInfo open={isOpen} contact={contact} onClose={()=>setIsOpen(false)}/>
      </div>
    
  )
}

export default Contact
