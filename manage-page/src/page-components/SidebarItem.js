function SidebarItem({val, onClick}) {

  return (
    <button className="SidebarItem" data-url={ val.link } id="" onClick={()=>{onClick(val.link)}}>
      <div className="SidebarIcon">{ val.icon }</div>
      <div className="SidebarTitle">{ val.title }</div>
    </button>
  )
}

export default SidebarItem
