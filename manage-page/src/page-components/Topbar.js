import {RiUserAddLine,RiSearchLine} from "react-icons/ri"
import ContactForm from "./ContactForm";
import { useState } from "react";
import "../css/Topbar.css"

function Topbar() {
  
  const [isOpen, setIsOpen] = useState(false);

  
  return (
    <div className="Topbar">
      <p>5Silvers</p>

      <div id="AddContact">
        <RiUserAddLine size={20} onClick={()=>setIsOpen(true)} />

        <ContactForm open={isOpen} onClose={()=>setIsOpen(false)}></ContactForm>

      </div>
    
      <div>
        <button id="Manage">Manage</button>
      </div>
            
      <div id="SearchBar">
        <RiSearchLine />
        <input type="text" placeholder="Search..." />
      </div>
      
    </div>
  )
}

export default Topbar
