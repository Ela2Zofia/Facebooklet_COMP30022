import contactReducer from "./contactReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers(
  {
    contacts: contactReducer,
    // user: userReducer 
  }
)

export default allReducers;