import { useState } from "react";
import reactDom from "react-dom";
import {RiCloseLine} from "react-icons/ri"
import PhoneInput from "react-phone-number-input";
import "../css/PhoneInput.css";

function ContactForm({open, onClose}) {
  
  
  const [newContact, setNewContact] = useState({})

  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [occup, setOccup] = useState("")
  const [email, setEmail] = useState("")
  const [pnumber, setPnumber] = useState(null)
  const [desc, setDesc] = useState("")
  
  
  function resetInput(){
    setNewContact({})
    setFname("");
    setLname("");
    setOccup("");
    setEmail("");
    setPnumber(null);
    setDesc("");
  }

  function submitContact(){

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!fname) {
      alert("Please add a first name for your new contact");
    }
    else if (!re.test(String(email).toLocaleLowerCase())){
      alert("Email not valid, please retry");
    }
    else{
      const id = Math.floor(Math.random() * 10000) + 1
      setNewContact({
        id: id,
        firstName: fname,
        lastName: lname,
        occupation: occup,
        email: email,
        phone: pnumber,
        tag: [],
        description: desc
      })

      resetInput();
    }


  }
  
  
  if (!open) return null;
  return reactDom.createPortal(
    <div className="ContactFormWrapper">
      <div className="ContactForm">
        <div className="TopbarCloseButton">
          <RiCloseLine className="button" onClick={()=>{
            onClose();
            resetInput();
          }} size={30}/>
        </div>
        
          <label>First Name</label>
          <input type="text" placeholder="First name **MANDATORY**" maxLength="30" value={fname} onChange={
            (e) => setFname(e.target.value)
          } />

          <label>Last Name</label>
          <input type="text" placeholder="Last name" maxLength="30" value={lname} onChange={
            (e) => setLname(e.target.value)
          }/>

          <label>Occupation</label>
          <input type="text" placeholder="Occupation" maxLength="30" value={occup} onChange={
            (e) => setOccup(e.target.value)
          }/>

          <label>E-mail</label>
          <input type="email" placeholder="E-mail eg. xxx@xxx.com" maxLength="50" value={email} onChange={
            (e) => setEmail(e.target.value)
          } />

          <label>Phone number</label>
          <PhoneInput 
            placeholder="Phone number"
            value={pnumber}
            onChange={setPnumber}
          />
          {/* <input type="tel" placeholder="Phone number" maxLength="20" value={pnumber} onChange={
            (e) => setPnumber(e.target.value)
          } /> */}

          <label>Description</label>
          <textarea type="text" placeholder="Description" maxLength="500" value={desc} onChange={
            (e) => setDesc(e.target.value)
          }/>
          
        <button onClick={()=>{
          submitContact();
        }}>Add</button>
        


      </div>
    </div>
    , document.getElementById("portal")
  )
}

export default ContactForm;
