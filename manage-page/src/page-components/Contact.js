import { Link } from "react-router-dom"

function Contact({id, contact}) {
  


  return (
    // <Link to={"/" + contact.firstName + "-" + contact.lastName}>
    <div className="Contact">
      
        <div className="ContactHeader">
          <div className="name">{contact.firstName + " " + contact.lastName}</div>
          <div className="occupation">{contact.occupation}</div>
        </div>

        <div className="email">{contact.email}</div>
      
    </div>
  )
}

export default Contact
