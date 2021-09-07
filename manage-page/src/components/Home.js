import {RiUserLine} from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router";
import signOut from "../actions/signOut";

function Home() {

  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);

  // remove user record from redux and localStorage
  function removeUser(){
    localStorage.removeItem("user");
    dispatch(signOut());
  }

  return (
    <div className="Container">
      <div className="User">
        <div id = "Avatar">
          <RiUserLine size={80}/>
        </div>
      </div>

      <button onClick={removeUser}>Sign Out</button>
      {
        user
        ? ""
        : <Redirect to="/" />
      }
    </div>
  )
}

export default Home
