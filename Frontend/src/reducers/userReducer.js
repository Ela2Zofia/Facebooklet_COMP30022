function userReducer(state = "", action) {
  switch (action.type){
    case "LOG_IN":
      return action.payload
    case "SIGN_OUT":
      return ""
    default:
      return state
  }
}

export default userReducer
