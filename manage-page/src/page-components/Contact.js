import {RiMoreLine} from "react-icons/ri";
import { useState, useEffect } from "react";
import ContactInfo from "./ContactInfo";
import { useSelector, useDispatch } from "react-redux";
import addSelected from "../actions/addSelected";
import removeSelected from "../actions/removeSelected";

function Contact({id, contact, isSelected}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const isEdit = useSelector(state => state.isEdit);

  function changeSelected(){
    
    if (!isSelected){
      dispatch(addSelected(contact.id));
    }else{
      dispatch(removeSelected(contact.id));
    }
  }


  function checkEdit(){
    if (isEdit){
      return (
        <input 
              type="checkbox" 
              style={{transform: "scale(2.5)"}} 
              onChange={()=>{changeSelected()}} 
              checked={isSelected} />
      )
    }else{
      return (<RiMoreLine onClick={()=>setIsOpen(true)} size={30} className="more"/>)
    }
  }

  return (
    // <Link to={"/" + contact.firstName + "-" + contact.lastName}>
      <div className="Contact" >
        
        <div className="ContactHeader">
          <div className="name">{contact.firstName + " " + contact.lastName}</div>
          <div className="occupation">{contact.occupation}</div>
        </div>

        <div className="email">{contact.email}</div>

        { checkEdit()}
        <ContactInfo open={isOpen} contact={contact} onClose={()=>setIsOpen(false)}/>
      </div>
    
  )
}

export default Contact
