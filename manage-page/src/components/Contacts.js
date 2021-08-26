import React from 'react'
import { useState, useEffect } from 'react'
import Contact from '../page-components/Contact'
import Topbar from '../page-components/Topbar'

function Contacts() {

  const [ contacts, setContacts] = useState([])
  
  async function fetchContacts(){
    const res = await fetch("http://localhost:5000/contacts");
    const data = await res.json();
    // console.log(data);
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
        (contact, key) =>{
          return(
          <Contact
            key = {key}
            firstName = {contact.firstName}
            lastName = {contact.lastName}
            occupation = {contact.occupation}
            email = {contact.email}  
          />)
        }
      )}
    </div>
  )
}

export default Contacts;