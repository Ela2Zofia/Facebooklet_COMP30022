import {RiUserAddLine,RiSearchLine} from "react-icons/ri"
import ContactForm from "./ContactForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "../css/Topbar.css";
import toggleEdit from "../actions/toggleEdit"
import clearSelected from "../actions/clearSelected";
import deleteContact from "../actions/deleteContact";
import Network from "../util/Network";

function Topbar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isEdit = useSelector(state => state.isEdit);
  const selected = useSelector(state => state.selected);
  const user = useSelector(state => state.user);

  // const user = useSelector(state => state.user);
  

  // delete all selected contacts
  async function deleteSelected(){
    
    // delete selected contacts from both front and backend
    for (let i in selected){  
      await Network.delContactNet(user, selected[i]);
      dispatch(deleteContact(selected[i]));
    }

    dispatch(clearSelected());
  }


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
              <button id="Manage" onClick={
                  ()=>{
                    dispatch(toggleEdit()); 
                    dispatch(clearSelected());
                  }
                }>Manage</button>
              {
                isEdit
                ? 
                  <button id="Delete" onClick={()=>{deleteSelected()}}>Delete</button>
                : ""
              }
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
