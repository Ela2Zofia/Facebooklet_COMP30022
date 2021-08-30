import reactDom from "react-dom"
import {TiDeleteOutline} from "react-icons/ti"
import {RiCloseLine} from "react-icons/ri"

function ContactInfo({open, contact, onClose}) {
  if (!open) return null;
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
