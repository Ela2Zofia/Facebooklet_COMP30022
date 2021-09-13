function contactReducer(state = [], action) {

  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload]
    case "DELETE_CONTACT":
      return state.filter(contact => contact._id !== action.payload)
    case "SET_CONTACTS":
      return action.payload
    case "EDIT_CONTACT":
      var state_copy = state;

      for(let i in state_copy){
        if (state_copy[i]._id === action.payload._id){
          state_copy[i].firstName = action.payload.firstName;
          state_copy[i].lastName = action.payload.lastName;
          state_copy[i].occupation = action.payload.occupation;
          state_copy[i].email = action.payload.email;
          state_copy[i].phone = action.payload.phone;
          state_copy[i].tag = action.payload.tag;
          state_copy[i].description = action.payload.description;
        }
      }
      return state_copy
    default:
      return state
  }
}

export default contactReducer
