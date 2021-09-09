function editReducer(state = false, action) {
  switch (action.type){
    case "START_EDIT":
      return true;
    case "END_EDIT":
      return false;
    case "TOGGLE_EDIT":
      return !state
    default:
      return state
  }
}

export default editReducer
