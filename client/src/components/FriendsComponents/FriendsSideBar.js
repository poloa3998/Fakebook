import React from "react";
import { BsGearFill } from "react-icons/bs";
import { FaUserFriends, FaUserPlus, FaUser } from "react-icons/fa";
import { RiUserSharedFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import FriendSideBarRow from "./FriendSideBarRow";
function FriendsSideBar() {
  return (
    <section className="flex-1 p-2 mt-1 h-screen max-w-[22rem] xl:min-w-[300px] bg-white shadow-md">
      <div className="flex justify-between items-center py-1 px-2">
        <h1 className="text-2xl font-semibold"> Friends </h1>
        <BsGearFill className="w-10 h-10 bg-gray-200 p-2 rounded-full hover:bg-gray-300 cursor-pointer" />
      </div>
      <div className="text-lg space-y-2">
        <FriendSideBarRow active Icon={FaUserFriends} title="Home" />
        <FriendSideBarRow Icon={RiUserSharedFill} title="Friend Requests" />
        <FriendSideBarRow Icon={FaUserPlus} title="Suggestions" />
        <Link to={`/${localStorage.getItem("id")}/friends`}>
          <FriendSideBarRow Icon={FaUser} title="All Friends" />
        </Link>
      </div>
    </section>
  );
}
export default FriendsSideBar;
