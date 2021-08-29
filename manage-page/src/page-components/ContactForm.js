import reactDom from "react-dom";

function ContactForm({open, onClose}) {
  if (!open) return null;
  return reactDom.createPortal(
    <div className="ContactFormWrapper">
      <div className="ContactForm">
        <div className="TopbarCloseButton">
          <button onClick={onClose}>X</button>
        </div>
      </div>
    </div>
    , document.getElementById("portal")
  )
}

export default ContactForm;
