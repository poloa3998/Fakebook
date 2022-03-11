import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Link } from "react-router-dom";
import SidebarRow from "./SidebarRow";
import { FaUserFriends } from "react-icons/fa";

function Sidebar() {
  const { loggedInUser } = useContext(AuthContext);
  return (
    <div className="p-2 mt-5 max-w-xl xl:min-w-[300px]">
      <Link to={`/${loggedInUser.id}`}>
        <SidebarRow src={loggedInUser.profilePic} title={loggedInUser.name} />
      </Link>
      <Link to={`/${loggedInUser.id}/friends`}>
        <SidebarRow Icon={FaUserFriends} title="Friends" />
      </Link>
    </div>
  );
}

export default Sidebar;
