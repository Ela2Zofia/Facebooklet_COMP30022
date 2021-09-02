import {RiUserAddLine,RiSearchLine} from "react-icons/ri"
import ContactForm from "./ContactForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toggleEdit from "../actions/toggleEdit"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "../css/Topbar.css"
import clearSeleted from "../actions/clearSeleted";

function Topbar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  
  return (
    <div className="Topbar">
      <p>5Silvers</p>

      <Router>

        <div id="AddContact">
          <RiUserAddLine size={20} onClick={()=>setIsOpen(true)} />

          <ContactForm open={isOpen} onClose={()=>setIsOpen(false)}></ContactForm>

        </div>
      
        <div>
          <button id="Manage" onClick={()=>{dispatch(toggleEdit()); dispatch(clearSeleted())}}>Manage</button>
        </div>


      </Router>
      
            
      <div id="SearchBar">
        <RiSearchLine />
        <input type="text" placeholder="Search..." />
      </div>
      
    </div>
  )
}

export default Topbar
