import {RiUserAddLine,RiSearchLine} from "react-icons/ri"
import ContactForm from "./ContactForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "../css/Topbar.css";
import toggleEdit from "../actions/toggleEdit"
import clearSelected from "../actions/clearSelected";
import deleteContact from "../actions/deleteContact";

function Topbar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isEdit = useSelector(state => state.isEdit);
  const selected = useSelector(state => state.selected);

  // const user = useSelector(state => state.user);
  

  // delete all selected contacts
  async function deleteSelected(){
    
    // net code to delete a contact
    async function del(id){
      const HOST = `http://localhost:5000/contacts/${id}`
      const res = await fetch(HOST, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          // TODO: user header
          // "User": user
        }
      });

      if(!res.ok){
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    };


    // delete selected contacts from both front and backend
    for (let i in selected){  
      await del(selected[i]);
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
          
            <button id="Manage" onClick={
                ()=>{
                  dispatch(toggleEdit()); 
                  dispatch(clearSelected());
                }
              }>Manage</button>
            {
              isEdit
              ? 
                <button onClick={()=>{deleteSelected()}}>Delete</button>
              : ""
            }
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
