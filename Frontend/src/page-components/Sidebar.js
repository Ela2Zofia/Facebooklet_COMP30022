import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SidebarItem from "./SidebarItem";

const Sidebar = ({onClick}) => {
  
  return (
    <div className="Sidebar">
      <ul className="SidebarList">

        { SidebarData.map( ( val, key ) => {
          return (
            <Link key={key} to={val.link} className="ReactLink">
              <SidebarItem val={val} onClick={onClick}/>
            </Link>

          );
        } ) }

      </ul>

    </div>
  )
}
export default Sidebar;
