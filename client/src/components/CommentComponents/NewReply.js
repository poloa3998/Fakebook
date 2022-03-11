import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { PostContext } from "../../context/posts";
import { AuthContext } from "../../context/auth";
function NewReply({ id, setReplies }) {
  const { createReply } = useContext(PostContext);
  const [input, setInput] = useState("");
  const { loggedInUser } = useContext(AuthContext);
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
    createReply(input, id, setReplies);
    setInput("");
  };
  return (
    <form className="bg-white px-6 rounded-b-xl " onSubmit={handleSubmit}>
      <div className="flex justify-center items-center space-x-2 py-2">
        <Link to={`/${loggedInUser.id}`}>
          <img
            src={loggedInUser.profilePic}
            className=" h-7 w-7 rounded-full"
            alt="User"
          />
        </Link>
        <TextareaAutosize
          className="bg-gray-200/80 opacity-80 rounded-2xl w-full p-2 text-sm placeholder-gray-500 text-black outline-none resize-none "
          placeholder="Write a reply..."
          value={input}
          onChange={handleInput}
          onKeyDown={onEnterPress}
        />
      </div>
      <p className="text-xs px-10 pb-2 text-black">Press Enter to reply.</p>
    </form>
  );
}

export default NewReply;
