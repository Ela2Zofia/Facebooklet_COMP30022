import React from 'react'
import { useState, useEffect } from 'react'
import Contact from '../page-components/Contact'
import Topbar from '../page-components/Topbar'
import "../css/Contacts.css"

function Contacts() {
  // const HOST = "http://localhost:8000/contacts";
  const HOST = "http://localhost:5000/contacts"
  const [ contacts, setContacts ] = useState([])
  
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-type": "request"
    },
    // body: JSON.stringify({ title: 'React POST Request Example' })
  }

  async function fetchContacts(){
    const res = await fetch(HOST);
    const data = await res.json();
    // await console.log(data);
    return data;
  }


  

  useEffect(()=>{
    async function getContacts(){
      const serverData = await fetchContacts();
      setContacts(serverData);
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