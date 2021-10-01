import reactDom from "react-dom"
import { RiCloseLine } from "react-icons/ri"
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import editContact from "../actions/editContact";
import Network from "../util/Network";

function ContactInfo( { open, contact, onClose } ) {
  const [ edit, setEdit ] = useState( false );

  const [ fname, setFname ] = useState( contact.firstName );
  const [ lname, setLname ] = useState( contact.lastName );
  const [ occup, setOccup ] = useState( contact.occupation );
  const [ email, setEmail ] = useState( contact.email );
  const [ pnumber, setPnumber ] = useState( contact.phone );
  const [ desc, setDesc ] = useState( contact.description );
  const [ tag, setTag ] = useState( contact.tag );

  const dispatch = useDispatch();
  const user = useSelector( state => state.user );

  // set edit state back to false and close the pop-up
  function close() {
    setEdit( false );
    onClose();
  }

  // check for emtpty tag
  function checkTag(target){
    if(target.trim() === ""){
      setTag([])
      
    }else{
      setTag(target.split(","))
    }
  }

  // submit edited contact
  function submit() {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if ( !fname ) {
      alert( "Please add a first name for your new contact" );
    }
    else if ( email && !re.test( String( email ).toLocaleLowerCase() ) ) {
      alert( "Email not valid, please retry" );
    } else {

      async function edit() {
        await Network.editContactNet( user, {
          _id: contact._id,
          firstName: fname,
          lastName: lname,
          occupation: occup,
          email: email,
          phone: pnumber,
          tag: tag,
          description: desc
        } );
      }

      edit();
      
      dispatch( editContact(
        {
          _id: contact._id,
          firstName: fname,
          lastName: lname,
          occupation: occup,
          email: email,
          phone: pnumber,
          tag: tag,
          description: desc
        }
      ) );

      setEdit( false );
    }

  }
  // edit contact function
  // if in edit mode, return normal information
  // otherwise return form for editing
  function editMode() {

    if ( !edit ) {
      return (
        <div className="ContactInfoInnerWrap">
          <div className="ContactDetail">

            <div className="name">{ contact.firstName + " " + contact.lastName }</div>
            <div>Occupation: { contact.occupation }</div>
            <div>E-mail: { contact.email }</div>
            <div>Phone Number: { contact.phone }</div>
            <div>Description: { contact.description }</div>

            <div className="Tags">Tags: &nbsp;
              { contact.tag.map( ( tag, key ) => {
                return (  
                  <div key={ key } className="Tag">{ tag }</div>
                )
              } ) }
            </div>

          </div>

          <button onClick={ () => { setEdit( true ) } }>Edit</button>
        </div>
      )
    } else {
      return (
        <div className="ContactInfoInnerWrap">

          <div className="ContactEdit">

            <label>First Name</label>
            <input type="text" placeholder="First name **MANDATORY**" maxLength="30" value={ fname } onChange={
              ( e ) => setFname( e.target.value )
            } />

            <label>Last Name</label>
            <input type="text" placeholder="Last name" maxLength="30" value={ lname } onChange={
              ( e ) => setLname( e.target.value )
            } />

            <label>Occupation</label>
            <input type="text" placeholder="Occupation" maxLength="30" value={ occup } onChange={
              ( e ) => setOccup( e.target.value )
            } />

            <label>E-mail</label>
            <input type="email" placeholder="E-mail eg. xxx@xxx.com" maxLength="50" value={ email } onChange={
              ( e ) => setEmail( e.target.value )
            } />

            <label>Phone number</label>
            <PhoneInput
              placeholder="Phone number"
              value={ pnumber }
              onChange={ setPnumber }
            />


            <label>Description</label>
            <textarea type="text" placeholder="Description" maxLength="500" value={ desc } onChange={
              ( e ) => setDesc( e.target.value )
            } />

            <label>Tags</label>
            <input type="text" placeholder="Tags(comma seperated) eg. A,B,C" value={ tag.toString() } onChange={(e)=>{checkTag(e.target.value)}} />

            <button onClick={ submit }>Save</button>

          </div>
        </div>


      )
    }

  }



  if ( !open ) return null;

  // create a protal that display a modal (pop-up window)
  return reactDom.createPortal(
    <div className="ContactInfoBackground">

      <div className="ContactInfo">

        <div className="CloseButton">
          <RiCloseLine className="button" onClick={ close } size={ 30 } />
        </div>

        { editMode() }


      </div>

    </div>
    , document.getElementById( "portal" )
  )
}

export default ContactInfo
