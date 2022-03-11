import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MessageContext } from "../../context/Messaging";
import { AuthContext } from "../../context/auth";
function Conversation({
  conversation,
  setMessengerModalActive,
  setMessagesActive,
}) {
  const [user, setUser] = useState(null);
  const { loggedInUser } = useContext(AuthContext);
  const { getMessages, setCurrentChat } = useContext(MessageContext);
  const setChat = () => {
    setCurrentChat(conversation);
  };

  useEffect(() => {
    const friend = conversation.members.find((m) => m._id !== loggedInUser.id);
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/${friend._id}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [loggedInUser.id, conversation.members, setCurrentChat]);
  return (
    <>
      {user === null ? null : (
        <div
          className="flex space-x-2 items-center mt-3 hover:bg-gray-100 p-2 cursor-pointer rounded-md"
          onClick={() => {
            getMessages(conversation._id);
            setMessagesActive(true);
            setChat();
            setMessengerModalActive(false);
          }}
        >
          <img
            src={user.profilePic}
            className="h-14 w-14 rounded-full"
            alt="User"
          />
          <p>{user.firstName + " " + user.lastName}</p>
        </div>
      )}
    </>
  );
}

export default Conversation;
