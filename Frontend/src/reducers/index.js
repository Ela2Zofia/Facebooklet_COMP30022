import contactReducer from "./contactReducer";
import userReducer from "./userReducer";
import editReducer from "./editReducer";
import selectedReducer from "./selectedReducer";
import { combineReducers } from "redux";
import meetingReducer from "./meetingReducer";

const allReducers = combineReducers(
  {
    contacts: contactReducer,
    isEdit: editReducer,
    selected: selectedReducer,
    user: userReducer,
    meetings: meetingReducer,
  }
)

export default allReducers;