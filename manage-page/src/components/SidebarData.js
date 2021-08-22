import {RiContactsBookLine} from "react-icons/ri";
import {RiVidiconLine} from "react-icons/ri"
import {RiUserLine} from "react-icons/ri"

export const SidebarData = [
  {
    title: "User",
    icon: <RiUserLine size={24}/>,
    link: "/home"
  },
  {
    title: "Contacts",
    icon: <RiContactsBookLine size={24}/>,
    link: "/contacts"
  },
  {
    title: "Meetings",
    icon: <RiVidiconLine size={24}/>,
    link: "/meetings"
  }
]