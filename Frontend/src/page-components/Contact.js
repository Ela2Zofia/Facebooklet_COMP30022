import { RiMoreLine } from "react-icons/ri";
import { useState } from "react";
import ContactInfo from "./ContactInfo";
import { useSelector, useDispatch } from "react-redux";
import addSelected from "../actions/addSelected";
import removeSelected from "../actions/removeSelected";

function Contact( { contact, isSelected } ) {
  const [ isOpen, setIsOpen ] = useState( false );
  const dispatch = useDispatch();

  const isEdit = useSelector( state => state.isEdit );


  function changeSelected(){
    
    if (!isSelected){
      dispatch(addSelected(contact._id));
    }else{
      dispatch(removeSelected(contact._id));
    }
  }


  // check if page is in edit mode, if yes, display a tickbox
  function checkEdit() {
    if ( isEdit ) {
      return (
        <input
          type="checkbox"
          style={ { transform: "scale(2.5)" } }
          onChange={ () => { changeSelected() } }
          checked={ isSelected } />
      )
    } else {
      return ( <RiMoreLine onClick={ () => setIsOpen( true ) } size={ 30 } className="more" /> )
    }
  }

  return (
    // <Link to={"/" + contact.firstName + "-" + contact.lastName}>
    <div className="Contact" >

      <div className="ContactHeader">
        <div className="name">{ contact.firstName + " " + contact.lastName }</div>
        <div className="occupation">{ contact.occupation }</div>
        <div className="Tags">
          { contact.tag.map( ( tag, key ) => {
            if (key > 2){
              return ""
            }
            return (
              <div key={ key } className="Tag">{ tag }</div>
            )
          } ) }
        </div>
      </div>

      <div className="email">{ contact.email }</div>



      { checkEdit() }
      <ContactInfo open={ isOpen } contact={ contact } onClose={ () => setIsOpen( false ) } />
    </div>

  )
}

export default Contact
