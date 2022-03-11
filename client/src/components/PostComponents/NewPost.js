import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { PostContext } from "../../context/posts";
import { AiFillPicture, AiOutlineClose } from "react-icons/ai";
import { BsFillFileImageFill } from "react-icons/bs";
import TextareaAutosize from "react-textarea-autosize";

import axios from "axios";
function NewPost({ setNewPostActive }) {
  const { loggedInUser } = useContext(AuthContext);
  const { createPost } = useContext(PostContext);
  const [imageActive, setImageActive] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const filePickerRef = useRef(null);

  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const onEnterPress = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      return handleSubmit();
    }
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImagePreview(readerEvent.target.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableButton(true);
    if (!file) {
      createPost(input);
    } else {
      try {
        const fd = new FormData();
        fd.append("file", file, file.name);
        const res = await axios.post(`/api/images`, fd, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        createPost(input, res.data.files.filename);
      } catch (error) {
        console.log(error);
      }
    }
    setNewPostActive(false);
  };

  const displayPostButton = () => {
    if (!file && input === "") {
      return (
        <button
          disabled={true}
          className="text-black/20 bg-gray-200 rounded-md p-1 cursor-not-allowed"
        >
          Post
        </button>
      );
    } else if (file && input === "") {
      return (
        <button
          disabled={disableButton}
          type="submit"
          className="text-white bg-blue-500 rounded-md p-1 "
        >
          Post
        </button>
      );
    } else {
      return (
        <button
          disabled={disableButton}
          type="submit"
          className="text-white bg-blue-500 rounded-md p-1"
        >
          Post
        </button>
      );
    }
  };
  return (
    <div className="fixed flex flex-col justify-center items-center bg-gray-100/70 h-screen w-screen top-0 left-0 z-50">
      <form
        className="flex flex-col  w-fit bg-white p-4 rounded-md shadow-2xl relative"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center border-b p-2">
          <div className="flex flex-1 items-center justify-end">
            <p className="w-48 sm:w-[22rem] w text-center text-xl font-semibold text-black">
              Create Post
            </p>
            <AiOutlineClose
              className="w-8 h-8 p-1 text-gray-500 bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full"
              onClick={() => setNewPostActive(false)}
            />
          </div>
        </div>
        <div className="flex py-2 space-x-2">
          <img
            src={loggedInUser.profilePic}
            className="h-10 w-10 rounded-full"
            alt="User"
          />
          <p className="text-black">{loggedInUser.name}</p>
        </div>
        <TextareaAutosize
          className={
            imageActive
              ? "p-2 text-sm placeholder-gray-500 text-black outline-none resize-none overflow-y-auto "
              : "p-2 text-2xl placeholder-gray-500 text-black outline-none resize-none overflow-y-auto "
          }
          placeholder="What's on your mind?"
          minRows={imageActive ? "1" : "5"}
          maxRows="10"
          value={input}
          onChange={handleInput}
          onKeyDown={onEnterPress}
        />
        {!imageActive ? null : (
          <div className="text-black border p-2 my-3 rounded-md  overflow-y-scroll relative">
            {imagePreview === null ? (
              <div
                className="flex flex-col items-center justify-center bg-gray-100 h-48 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => filePickerRef.current.click()}
              >
                <BsFillFileImageFill className="w-5 h-5" />
                <p className="text-center"> Add Photos </p>
                <input
                  ref={filePickerRef}
                  onChange={handleFile}
                  type="file"
                  accept="image/jpg, image/png"
                  hidden
                />
              </div>
            ) : (
              <div className="max-h-[28rem] overflow-y-scroll">
                <img
                  src={imagePreview}
                  alt={file?.name}
                  className="w-full max-w-sm"
                />
              </div>
            )}
            <AiOutlineClose
              className="absolute top-3 right-3 w-8 h-8 p-1 text-gray-500 bg-white cursor-pointer hover:bg-gray-200 rounded-full border"
              onClick={() => {
                setImageActive(false);
                setImagePreview(null);
              }}
            />
          </div>
        )}
        <div
          className="flex items-center justify-center space-x-2 text-black border border-gray-300 p-2 rounded-md mb-4 cursor-pointer hover:bg-gray-100"
          onClick={() => setImageActive(true)}
        >
          <p>Add an image?</p>
          <AiFillPicture className="h-6 w-6 text-green-500 " />
        </div>
        {displayPostButton()}
      </form>
    </div>
  );
}

export default NewPost;
