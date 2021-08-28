import reactDom from "react-dom";

function ContactForm({open, onClose}) {
  if (!open) return null;
  return reactDom.createPortal(
    <div className="ContactForm">
      <div id="CloseButton">
        <button onClick={onClose}>X</button>
      </div>
    </div>
    , document.getElementById("portal")
  )
}

export default ContactForm;
