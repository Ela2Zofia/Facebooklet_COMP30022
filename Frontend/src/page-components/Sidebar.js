import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SidebarItem from "./SidebarItem";
import {RiLogoutBoxLine} from "react-icons/ri";
import { useDispatch } from "react-redux";
import signOut from "../actions/signOut";

const Sidebar = ( { onClick } ) => {

  const dispatch = useDispatch();
  // remove user record from redux and localStorage
  function removeUser() {
    localStorage.removeItem( "user" );
    dispatch( signOut() );
  }

  return (
    <div className="Sidebar">
      <ul className="SidebarList">

        { SidebarData.map( ( val, key ) => {
          return (
            <Link key={ key } to={ val.link } className="ReactLink">
              <SidebarItem val={ val } onClick={ onClick } />
            </Link>

          );
        } ) }
        <button className="SidebarItem" onClick={ removeUser }>
          <div className="SidebarIcon"> <RiLogoutBoxLine size={24}/> </div>
          <div className="SidebarTitle">Sign Out</div>
        </button>
      </ul>

    </div>
  )
}
export default Sidebar;
