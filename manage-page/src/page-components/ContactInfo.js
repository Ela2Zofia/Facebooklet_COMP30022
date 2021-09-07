import reactDom from "react-dom"
import {TiDeleteOutline} from "react-icons/ti"
import {RiCloseLine} from "react-icons/ri"
import { useState } from "react";

function ContactInfo({open, contact, onClose}) {
  const [edit, setEdit] = useState(false);


  if (!open) return null;

  // create a protal that display a modal (pop-up window)
  return reactDom.createPortal(
    <div className="ContactInfoWrapper">

      <div className="ContactInfo">

        <div className="CloseButton">
          <RiCloseLine className="button" onClick={onClose} size={30}/>
        </div>

        <div className="ContactDetail">
          <div>
           <div className="name">{contact.firstName + " " + contact.lastName}</div>
          </div>
          <div>Occupation: {contact.occupation}</div>
          <div>E-mail: {contact.email}</div>
          <div>Phone Number: {contact.phone}</div>
          <div>Description: {contact.description}</div>

          <div className="Tags">
            {contact.tag.map((tag, key)=>{
              return(
                <div key={key} className="Tag">{tag} <TiDeleteOutline size={18}/></div>
              )
            })}
          </div>
          
        </div>

      </div>

    </div>
    , document.getElementById("portal")
  )
}

export default ContactInfo
