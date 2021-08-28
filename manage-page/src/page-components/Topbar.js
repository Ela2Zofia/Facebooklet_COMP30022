import {RiUserAddLine,RiSearchLine} from "react-icons/ri"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ContactForm from "./ContactForm";
import { useState } from "react";
import "../css/Topbar.css"

function Topbar() {
  
  const [isOpen, setIsOpen] = useState(false);

  
  return (
    <div className="Topbar">
      <p>5Silvers</p>

      <Router>
        <Switch>

          <Route path="/contacts">
          
            <div id="AddContact">
              <RiUserAddLine size={20} onClick={()=>setIsOpen(true)} />

              <ContactForm open={isOpen} onClose={()=>setIsOpen(false)}></ContactForm>

            </div>
          
            <div>
              <button id="Manage">Manage</button>
            </div>
            
          </Route>



        </Switch>
      </Router>
      <div id="SearchBar">
        <RiSearchLine />
        <input type="text" placeholder="Search..." />
      </div>
      
    </div>
  )
}

export default Topbar
