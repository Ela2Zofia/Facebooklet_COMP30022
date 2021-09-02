import "../css/PhoneInput.css";
import { useState } from "react";
import reactDom from "react-dom";
import {RiCloseLine} from "react-icons/ri"
import PhoneInput from "react-phone-number-input";
import { useDispatch } from "react-redux";
import addContact from "../actions/addContact";


function ContactForm({open, onClose}) {
  
  // new data from the form
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [occup, setOccup] = useState("")
  const [email, setEmail] = useState("")
  const [pnumber, setPnumber] = useState(null)
  const [desc, setDesc] = useState("")

  const dispatch = useDispatch()
  

  // net code to post to server

  // const HOST = "http://localhost:8000/contacts";
  const HOST = "http://localhost:5000/contacts";

  // reset inputs
  function resetInput(){
    setFname("");
    setLname("");
    setOccup("");
    setEmail("");
    setPnumber(null);
    setDesc("");
  }

  // submit new contact to state and server
  function submitContact(){

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!fname) {
      alert("Please add a first name for your new contact");
    }
    else if (email && !re.test(String(email).toLocaleLowerCase())){
      alert("Email not valid, please retry");
    }
    else{

      // add new contact to backend and return the new contact 
      async function add() {
        const res = await fetch(HOST, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            firstName: fname,
            lastName: lname,
            occupation: occup,
            email: email,
            phone: pnumber,
            tag: [],
            description: desc
          })
        });
        
        if(!res.ok){
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json()
        return data;
      };

      // call the add function and add new data to state 
      async function getAdd(){
        const data = await add();
        dispatch(addContact(data));
      }

      getAdd();      

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
