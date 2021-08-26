import {RiUserAddLine,RiSearchLine} from "react-icons/ri"

function Topbar() {
  return (
    <div className="Topbar">
      <p>5Silvers</p>

      <div id="AddContact">
        <RiUserAddLine size={20}/>
      </div>


      <div id="SearchBar">
        <RiSearchLine />
        <input type="text" placeholder="Search..." />
      </div>
      
    </div>
  )
}

export default Topbar
