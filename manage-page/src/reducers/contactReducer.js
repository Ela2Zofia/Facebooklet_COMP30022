function contactReducer(state = [], action) {

  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload]
    case "DELETE_CONTACT":
      return state.filter(contact => contact.id !== action.payload)
    case "SET_CONTACTS":
      return action.payload
    default:
      return state
  }
}

export default contactReducer
