function editContact(contact) {
  return (
    {
      type: "EDIT_CONTACT",
      payload: contact
    }
  )
}

export default editContact
