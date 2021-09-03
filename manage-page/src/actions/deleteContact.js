function deleteContact(id) {
  return (
    {
      type: "DELETE_CONTACT",
      payload: id
    }
  )
}

export default deleteContact
