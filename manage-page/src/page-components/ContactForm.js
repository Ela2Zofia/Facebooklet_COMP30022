import "../css/PhoneInput.css";
import { useState } from "react";
import reactDom from "react-dom";
import {RiCloseLine} from "react-icons/ri"
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import addContact from "../actions/addContact";
import Network from "../util/Network";


function ContactForm({open, onClose}) {
  
  // new data from the form
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [occup, setOccup] = useState("");
  const [email, setEmail] = useState("");
  const [pnumber, setPnumber] = useState(null);
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState([]);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  // reset inputs
  function resetInput(){
    setFname("");
    setLname("");
    setOccup("");
    setEmail("");
    setPnumber(null);
    setDesc("");
    setTag([]);
  }

  // check for emtpty tag
  function checkTag(target){
    if(target.trim() === ""){
      setTag([])
      
    }else{
      setTag(target.split(","))
    }
  }

  // net code to post to server
  // submit new contact to state and server
  function submitContact(){

    // eslint-disable-next-line
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!fname) {
      alert("Please add a first name for your new contact");
    }
    else if (email && !re.test(String(email).toLocaleLowerCase())){
      alert("Email not valid, please retry");
    }
    else{
      // call the add function and add new data to state 
      async function add(){
        const data = await Network.addContactNet(user,{
          firstName: fname,
          lastName: lname,
          occupation: occup,
          email: email,
          phone: pnumber,
          tag: tag,
          description: desc
        });
        dispatch(addContact(data));
      }

      add();      

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

        <label>Description</label>
        <textarea type="text" placeholder="Description" maxLength="500" value={desc} onChange={
          (e) => setDesc(e.target.value)
        }/>

        <label>Tags</label>
        <input type="text" placeholder="Tags(comma seperated) eg. A,B,C" value={tag} onChange={(e) => checkTag(e.target.value) } />
          
        <button onClick={()=>{
          submitContact();
        }}>Add</button>
        


      </div>
    </div>
    , document.getElementById("portal")
  )
}

export default ContactForm;
