import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Contact from '../page-components/Contact'
import Topbar from '../page-components/Topbar'
import setContacts from '../actions/setContacts'
import endEdit from "../actions/endEdit"
import clearSelected from "../actions/clearSelected"
import Network from '../util/Network'
import "../css/Contacts.css"

function Contacts() {

  const contacts = useSelector(state => state.contacts);
  const selected = useSelector(state => state.selected);
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  

  // net code to fetch contacts from the server
  
  useEffect(()=>{

    async function getContacts(){
      const serverData = await Network.fetchContactsNet(user);
      dispatch(setContacts(serverData))
    }
    getContacts();
    
    // reset states on page load
    //
    dispatch(endEdit());
    dispatch(clearSelected());
      // eslint-disable-next-line
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
              key = {contact._id}
              contact = {contact}
              isSelected = {selected.includes(contact._id)}
            />)
          }
        )}
      </div>
    </div>
  )
}

export default Contacts;