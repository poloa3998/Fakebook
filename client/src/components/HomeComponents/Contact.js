import React, { useContext } from "react";
import { MessageContext } from "../../context/Messaging";
function Contact({ userId, name, profilePic, setMessagesActive }) {
  const { findOrCreateConversation } = useContext(MessageContext);

  return (
    <div
      className="flex items-center space-x-3 mb-2 hover:bg-gray-200 cursor-pointer p-2 rounded-xl"
      onClick={() => {
        findOrCreateConversation(userId);
        setMessagesActive(true);
      }}
    >
      <img className="rounded-full w-10 h-10" src={profilePic} alt="User" />
      <p>{name}</p>
    </div>
  );
}

export default Contact;
