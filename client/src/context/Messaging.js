import React, { useState, useContext, useCallback } from "react";

import axios from "axios";

import { AuthContext } from "./auth";

export const MessageContext = React.createContext();

export const useMessaging = () => {
  return useContext(MessageContext);
};

export const MessageProvider = (props) => {
  const { loggedInUser } = useContext(AuthContext);
  const [messagesActive, setMessagesActive] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

  const getConversations = useCallback(async () => {
    if (!loggedInUser) {
      return;
    }
    try {
      const res = await axios.get(`/api/conversations/${loggedInUser.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setConversations(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [loggedInUser]);

  const findOrCreateConversation = async (userId) => {
    const conversation = {
      senderId: loggedInUser.id,
      receiverId: userId,
    };
    try {
      const res = await axios.post(`/api/conversations/`, conversation);

      setCurrentChat(res.data);
      getConversations();
      getMessages(res.data._id);
    } catch (error) {
      console.log(error);
    }
  };
  const getMessages = async (conversationId) => {
    try {
      const res = await axios.get(`/api/messages/${conversationId}`);

      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newMessage = async (conversationId, sender, text) => {
    const message = {
      conversationId,
      sender,
      text,
    };
    try {
      const res = await axios.post(`/api/messages`, message);

      setMessages([...messages, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    getConversations,
    findOrCreateConversation,
    getMessages,
    newMessage,
    conversations,
    messages,
    messagesActive,
    setMessages,
    setMessagesActive,
    setCurrentChat,
    currentChat,
  };
  return (
    <MessageContext.Provider value={value}>
      {props.children}
    </MessageContext.Provider>
  );
};
