function Contact(props) {
  


  return (
    <div className="Contact">
      <div className="name">{props.firstName + " " + props.lastName}</div>
      <div>{props.occupation}</div>
      <div>{props.email}</div>
    </div>
  )
}

export default Contact
