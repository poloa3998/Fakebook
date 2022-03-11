import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { RiVideoAddFill } from "react-icons/ri";
import { MdOutlineEmojiEmotions, MdAddPhotoAlternate } from "react-icons/md";
import { AuthContext } from "../../context/auth";
import NewPost from "./NewPost";
function InputBox() {
  const { loggedInUser } = useContext(AuthContext);

  const [newPostActive, setNewPostActive] = useState(false);

  return (
    <div className="bg-white p-2 rounded-xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Link to={`/${loggedInUser.id}`}>
          <img
            className="rounded-full w-10 h-10"
            src={loggedInUser.profilePic}
            alt="user profile"
          />
        </Link>
        <div className="flex flex-1">
          <button
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 text-left text-gray-400 cursor-pointer hover:bg-gray-200 text-xs sm:text-base"
            onClick={() => setNewPostActive(true)}
          >
            What's on your mind {loggedInUser.name}?
          </button>
        </div>
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon w-fit sm:w-full">
          <RiVideoAddFill className="h-5 w-5 sm:h-7 sm:w-7 text-red-500" />
          <p className="hidden sm:block text-xs sm:text-sm xl:text-base">
            Live video
          </p>
        </div>
        <div
          onClick={() => setNewPostActive(true)}
          className="inputIcon w-fit sm:w-full"
        >
          <MdAddPhotoAlternate className="h-5 w-5 sm:h-7 sm:w-7  text-green-500" />
          <p className=" hidden sm:block text-xs sm:text-sm xl:text-base">
            Photo/video
          </p>
        </div>
        <div className="inputIcon w-fit sm:w-full">
          <MdOutlineEmojiEmotions className="h-5 w-5 sm:h-7 sm:w-7  text-yellow-300" />
          <p className="hidden sm:block text-xs sm:text-sm xl:text-base">
            Feeling/activity
          </p>
        </div>
      </div>
      {!newPostActive ? null : <NewPost setNewPostActive={setNewPostActive} />}
    </div>
  );
}

export default InputBox;
