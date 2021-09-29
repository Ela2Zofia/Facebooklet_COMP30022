function meetingReducer(state = [], action) {
    switch (action.type) {
        case "ADD_MEETING":
            return [...state, action.payload]
        case "DELETE_MEETING":
            return state.filter(meeting => meeting.id !== action.payload)
        case "SET_MEETING":
            return action.payload
        case "EDIT_MEETING":
            let state_copy = state;

            for(let i in state_copy){
                if (state_copy[i]._id === action.payload._id){
                    state_copy[i] = JSON.parse(JSON.stringify(action.payload));
                }
            }
            return state_copy
        default:
            return state
    }
}

export default meetingReducer
