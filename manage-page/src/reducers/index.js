import contactReducer from "./contactReducer";
import userReducer from "./userReducer";
import editReducer from "./editReducer";
import selectedReducer from "./selectedReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers(
  {
    contacts: contactReducer,
    isEdit: editReducer,
    seleted: selectedReducer
    // user: userReducer 
  }
)

export default allReducers;