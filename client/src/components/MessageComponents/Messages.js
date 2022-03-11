import React, { useState, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import Message from "./Message";
import TextareaAutosize from "react-textarea-autosize";
import { AiOutlineClose } from "react-icons/ai";
import { MessageContext } from "../../context/Messaging";
import { AuthContext } from "../../context/auth";

function Messages({ setMessagesActive, messageActive }) {
  const socket = useRef();
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { loggedInUser } = useContext(AuthContext);
  const scrollRef = useRef(null);

  const { messages, currentChat, newMessage, setMessages, setCurrentChat } =
    useContext(MessageContext);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      socket.current = io("/");
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.sender,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }
    return () => {
      setMounted(false);
      setArrivalMessage(null);
    };
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      socket.current.emit("addUser", localStorage.getItem("id"));
    }
    return () => setMounted(false);
  }, [loggedInUser, socket, mounted]);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      if (
        arrivalMessage &&
        currentChat?.members.some(
          (member) => member._id === arrivalMessage?.sender
        )
      ) {
        setMessages((prev) => [...prev, arrivalMessage]);
      }

      return () => setMounted(false);
    }
  }, [arrivalMessage, currentChat?.members, setMessages, mounted]);
  useEffect(() => {
    setMounted(true);
    if (mounted) {
      const friend = currentChat?.members.find(
        (m) => m._id !== loggedInUser.id
      );

      const getUser = async () => {
        if (!friend) {
          return;
        }
        try {
          const res = await axios.get(`/api/users/${friend?._id}`);
          setUser(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
    return () => {
      setMounted(false);
      setUser(null);
    };
  }, [currentChat?.members, loggedInUser, mounted]);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      scrollRef.current?.scrollIntoView();
    }
    return () => setMounted(false);
  }, [messages, mounted]);
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const onEnterPress = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      return handleSubmit();
    }
  };
  const handleSubmit = () => {
    if (input === "") {
      return;
    }
    newMessage(currentChat._id, loggedInUser.id, input);
    socket.current.emit("addUser", localStorage.getItem("id"));
    socket.current.emit("sendMessage", {
      sender: loggedInUser.id,
      receiverId: user._id,
      text: input,
    });
    setInput("");
  };
  return (
    <div
      className={
        !messageActive
          ? "hidden"
          : "fixed flex flex-col bottom-0 right-0 sm:bottom-0 sm:right-28 h-[28rem] w-72 bg-white rounded-md shadow-2xl"
      }
    >
      {user === null ? null : (
        <>
          <div className="flex justify-between items-center p-2 shadow relative">
            <div className="flex space-x-2">
              <img
                src={user.profilePic}
                className="h-8 w-8 rounded-full"
                alt="User"
              />
              <p className="font-semibold">
                {user.firstName + " " + user.lastName}
              </p>
            </div>
            <AiOutlineClose
              className="w-6 h-6  text-gray-400 cursor-pointer hover:bg-gray-200 mx-3 rounded-full"
              onClick={() => {
                setMessagesActive(false);
                setCurrentChat(null);
                setMessages([]);
              }}
            />
          </div>
          <div className="h-full overflow-y-auto">
            <div className="flex flex-col ">
              {messages.map((message, index) => {
                return (
                  <div ref={scrollRef} key={message._id ? message._id : index}>
                    <Message
                      user={user}
                      text={message.text}
                      ownMessage={
                        message.sender === loggedInUser.id ? true : false
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center w-full bg-white px-2 py-4 space-x-3">
            <TextareaAutosize
              className="bg-gray-200 opacity-80 rounded-2xl w-full p-2 text-sm placeholder-gray-500 text-black outline-none resize-none "
              placeholder="Aa"
              value={input}
              onChange={handleInput}
              onKeyDown={onEnterPress}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Messages;
