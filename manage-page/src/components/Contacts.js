import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Contact from '../page-components/Contact'
import Topbar from '../page-components/Topbar'
import setContacts from '../actions/setContacts'
import "../css/Contacts.css"

function Contacts() {

  // const HOST = "http://localhost:8000/contacts";
  const HOST = "http://localhost:5000/contacts";
  const contacts = useSelector(state => state.contacts)
  const dispatch = useDispatch()
  
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-type": "request"
    },
    // body: "HELLO THIS IS POST REQUEST"
  }

  async function fetchContacts(){
    const res = await fetch(HOST);
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
  }, [])


  return (
    <div className="Container">
      <Topbar />

      {contacts.length === 0 ?
        <h3>No Contacts</h3>
        : contacts.map(
        (contact) =>{
          return(
          <Contact
            key = {contact.id}
            contact = {contact}  
          />)
        }
      )}
    </div>
  )
}

export default Contacts;