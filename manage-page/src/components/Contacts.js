import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Contact from '../page-components/Contact'
import Topbar from '../page-components/Topbar'
import setContacts from '../actions/setContacts'
import endEdit from "../actions/endEdit"
import clearSelected from "../actions/clearSelected"
import "../css/Contacts.css"

function Contacts() {

  // express address
  // const HOST = "http://localhost:8000/contacts";

  // json-server address
  const HOST = "http://localhost:5000/contacts";
  const contacts = useSelector(state => state.contacts);
  const selected = useSelector(state => state.selected);
  const dispatch = useDispatch();
  // const user = useSelector(state => state.user);
  

  // net code to fetch contacts from the server
  //
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-type": "application/json",

      // TODO: user header
      // "User": user
    }
  }
  async function fetchContacts(){
    const res = await fetch(HOST, requestOptions);

    if(!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    // console.log(data);
    return data;
  }
  
  useEffect(()=>{

    async function getContacts(){
      const serverData = await fetchContacts();
      dispatch(setContacts(serverData))
    }
    getContacts();
    
    // reset states on page load
    //
    dispatch(endEdit());
    dispatch(clearSelected());
  }, [])


  



  return (
    <div className="Container">
      <Topbar />

      <div className="InnerContainer">
        {contacts.length === 0 ?
          <h3>No Contacts</h3>
          : contacts.map(
          (contact) =>{
            return(
            <Contact
              key = {contact.id}
              contact = {contact}
              isSelected = {selected.includes(contact.id)}
            />)
          }
        )}
      </div>
    </div>
  )
}

export default Contacts;