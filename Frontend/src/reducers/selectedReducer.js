function selectedReducer(state = [], action) {
  
  switch (action.type){
    case "ADD_SELECTED":
      return [...state, action.payload]
    case "REMOVE_SELECTED":
      return state.filter(item => item !== action.payload)
    case "CLEAR_SELECTED":
      return []
    default:
      return state
  }
}

export default selectedReducer
