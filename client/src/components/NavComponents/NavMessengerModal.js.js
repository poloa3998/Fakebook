import React from "react";
import { HiSearch } from "react-icons/hi";
import { MessageContext } from "../../context/Messaging";
import { useContext } from "react";
import Conversation from "./Conversation";
function NavMessengerModal({ setMessengerModalActive, setMessagesActive }) {
  const { conversations } = useContext(MessageContext);

  return (
    <div className=" h-fit w-3/5 md:w-1/3 md:max-w-sm  fixed top-16 right-6 bottom-0 bg-white shadow-xl rounded-xl p-3 ">
      <p className="text-2xl font-semibold">Messenger</p>
      <div className="flex items-center rounded-full bg-gray-100 p-2 mt-2">
        <HiSearch className="h-6 w-6 text-gray-600" />
        <input
          type="text"
          className="hidden md:inline-flex flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-500"
          placeholder="Search Messenger"
        />
      </div>
      <div className="h-[32rem] overflow-y-scroll">
        {conversations.map((conversation) => {
          return (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              setMessengerModalActive={setMessengerModalActive}
              setMessagesActive={setMessagesActive}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NavMessengerModal;
