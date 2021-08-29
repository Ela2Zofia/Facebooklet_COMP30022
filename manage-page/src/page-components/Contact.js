import {RiMoreLine} from "react-icons/ri";
import { useState } from "react";
import ContactInfo from "./ContactInfo";

function Contact({id, contact}) {
  const [isOpen, setIsOpen] = useState(false);



  return (
    // <Link to={"/" + contact.firstName + "-" + contact.lastName}>
      <div className="Contact" >
        
        <div className="ContactHeader">
          <div className="name">{contact.firstName + " " + contact.lastName}</div>
          <div className="occupation">{contact.occupation}</div>
        </div>

        <div className="email">{contact.email}</div>
        <RiMoreLine onClick={()=>setIsOpen(true)} size={30} className="more"/>

        <ContactInfo open={isOpen} contact={contact} onClose={()=>setIsOpen(false)}/>
      </div>
    
  )
}

export default Contact
