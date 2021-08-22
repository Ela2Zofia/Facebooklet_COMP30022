import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { SidebarData } from "./SidebarData";

const Sidebar = ({onClick}) => {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">

        { SidebarData.map( ( val, key ) => {
          return (
            <Link key={key} to={val.link} className="ReactLink">
              <button className="SidebarItem" id={val.title==="User" ? "active" : ""} data-url={val.link} onClick={()=>{onClick(val.link)}}>
                <div className="SidebarIcon">{ val.icon }</div>
                <div className="SidebarTitle">{ val.title }</div>
              </button>
            </Link>

          );
        } ) }

      </ul>

    </div>
  )
}
export default Sidebar;
