import React, { useContext } from "react";
import { RiVideoAddFill } from "react-icons/ri";
import { HiSearch } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { AuthContext } from "../../context/auth";
import Contact from "./Contact";
function Widgets({ setMessagesActive }) {
  const { friends } = useContext(AuthContext);

  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <RiVideoAddFill className="h-6" />
          <HiSearch className="h-6" />
          <BsThreeDots className="h-6" />
        </div>
      </div>
      {friends.map((friend) => {
        return (
          <Contact
            key={friend.user?._id}
            userId={friend.user?._id}
            name={`${friend.user?.firstName} ${friend.user?.lastName}`}
            profilePic={friend.user?.profilePic}
            setMessagesActive={setMessagesActive}
          />
        );
      })}
    </div>
  );
}

export default Widgets;
