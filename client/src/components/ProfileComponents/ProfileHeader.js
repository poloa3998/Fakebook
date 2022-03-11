import React, { useState, useRef, useContext } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import { BsCameraFill, BsFillFileImageFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { MessageContext } from "../../context/Messaging";
function ProfileHeader({
  id,
  profilePic,
  name,
  friends,
  isFriend,
  isUser,
  setMessagesActive,
}) {
  const { updateProfilePic } = useContext(AuthContext);
  const { findOrCreateConversation } = useContext(MessageContext);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newProfileActive, setNewProfileActive] = useState(false);
  const filePickerRef = useRef(null);

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

    try {
      const fd = new FormData();
      fd.append("file", file, file.name);
      const res = await axios.post(`/api/images`, fd, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      updateProfilePic(res.data.files.filename);
    } catch (error) {
      console.log(error);
    }
    setFile(null);
    setImagePreview(null);

    setNewProfileActive(false);
  };
  const displayButtons = () => {
    if (isUser) {
      return (
        <>
          <div className="flex items-center bg-blue-500 rounded-md px-3 py-2 space-x-2 hover:bg-blue-600/90 cursor-pointer">
            <IoMdAddCircle className="text-white h-5 w-5 cursor-pointer" />
            <button className="text-white">Add to story</button>
          </div>
          <div className="flex items-center bg-gray-300/70 rounded-md px-3 py-2 space-x-2 hover:bg-gray-300/90 cursor-pointer">
            <GoPencil className="h-5 w-5 cursor-pointer" />
            <button>Edit profile</button>
          </div>
        </>
      );
    }
    if (isFriend) {
      return (
        <>
          <div className="flex items-center bg-gray-300/70 rounded-md px-3 py-2 space-x-2 hover:bg-gray-300/90 cursor-pointer">
            <IoMdAddCircle className=" h-5 w-5 cursor-pointer" />
            <button className="">Friends</button>
          </div>
          <div
            className="flex items-center bg-blue-500 rounded-md px-3 py-2 space-x-2 hover:bg-blue-600/90 cursor-pointer"
            onClick={() => {
              findOrCreateConversation(id);
              setMessagesActive(true);
            }}
          >
            <GoPencil className="text-white h-5 w-5 cursor-pointer" />
            <button className="text-white">Message</button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex items-center bg-blue-500 rounded-md px-3 py-2 space-x-2 hover:bg-blue-600/90 cursor-pointer">
            <IoMdAddCircle className="text-white h-5 w-5 cursor-pointer" />
            <button className="text-white">Add Friend</button>
          </div>
          <div
            className="flex items-center bg-gray-300/70 rounded-md px-3 py-2 space-x-2 hover:bg-gray-300/90 cursor-pointer"
            onClick={() => {
              findOrCreateConversation(id);
              setMessagesActive(true);
            }}
          >
            <GoPencil className="h-5 w-5 cursor-pointer" />
            <button>Message</button>
          </div>
        </>
      );
    }
  };
  return (
    <div className="relative bg-white shadow-md pb-4 ">
      <div className="flex justify-center bg-gradient-to-t from-white to-black rounded-md ">
        <img
          src="https://www.aphis.usda.gov/wcm/connect/63f1d01f-b52e-4545-ade1-8aaecb20b453/1/dogs-import-banner.png?MOD=AJPERES&CVID="
          className=" rounded-md  "
          alt="5 dogs staring at you "
        />
      </div>

      <div className="flex flex-col -mt-20 items-center lg:flex-row lg:justify-center lg:space-x-4 lg:-mt-10">
        <div
          className="flex items-center -space-x-10 cursor-pointer"
          onClick={() => (isUser ? setNewProfileActive(true) : null)}
        >
          <img
            src={profilePic}
            className="h-44 w-44 rounded-full border-4 border-gray-100 hover:brightness-90"
            alt="user"
          />

          {isUser ? (
            <>
              <BsCameraFill className="h-10 w-10 bg-gray-200 py-2 mt-28 rounded-full hover:bg-gray-300 z-10" />
              <input
                ref={filePickerRef}
                onChange={handleFile}
                type="file"
                accept="image/jpg, image/png"
                hidden
              />
            </>
          ) : null}
        </div>

        <div className="flex w-1/2 flex-col justify-center items-center lg:w-1/3 lg:items-start lg:mt-10">
          <p className="text-xl sm:text-4xl font-medium">{name}</p>
          <p className="text-gray-500 text-lg">
            {friends.length} {friends.length === 1 ? "Friend" : "Friends"}{" "}
          </p>
          <div className="flex -space-x-1 mb-3 lg:mb-0">
            {friends.length > 6
              ? friends.slice(0, 7).map((friend) => {
                  return (
                    <div key={friend.user._id}>
                      <img
                        src={friend.user.profilePic}
                        className="w-8 h-8 rounded-full"
                        alt="user"
                      />
                    </div>
                  );
                })
              : friends.map((friend) => {
                  return (
                    <div key={friend.user._id}>
                      <img
                        key={friend.user._id}
                        src={friend.user.profilePic}
                        className="w-8 h-8 rounded-full"
                        alt="users"
                      />
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="flex lg:mt-28 space-x-4 ">{displayButtons()}</div>
      </div>
      {!newProfileActive ? null : (
        <div className="fixed flex flex-col justify-center items-center bg-gray-100/70 h-screen w-screen top-0 left-0 z-50">
          <div className="flex flex-col space-y-4 w-72 sm:w-[30rem] bg-white p-4 rounded-md shadow-2xl relative">
            <div className="flex flex-1 items-center justify-end">
              <p className="text-sm w-[24rem] text-center sm:text-xl font-semibold text-black">
                Update Profile Picture
              </p>
              <AiOutlineClose
                className="w-8 h-8 p-1 text-gray-500 bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full"
                onClick={() => setNewProfileActive(false)}
              />
            </div>
            {imagePreview === null ? (
              <div
                className="flex flex-col items-center justify-center bg-gray-100 h-48 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => filePickerRef.current.click()}
              >
                <BsFillFileImageFill className="w-5 h-5" />
                <p className="text-center"> Add Photo </p>
                <input
                  ref={filePickerRef}
                  onChange={handleFile}
                  type="file"
                  accept="image/jpg, image/png"
                  hidden
                />
              </div>
            ) : (
              <>
                <div className="flex justify-center relative">
                  <img
                    src={imagePreview}
                    className="h-52 w-52 rounded-full"
                    alt={file?.name}
                  />
                  <AiOutlineClose
                    className="absolute top-3 right-3 w-8 h-8 p-1 text-gray-500 bg-white cursor-pointer hover:bg-gray-200 rounded-full border"
                    onClick={() => {
                      setImagePreview(null);
                    }}
                  />
                </div>
                <div className="flex justify-end space-x-3 p-4 border-t">
                  <button
                    className="text-blue-500 cursor-pointer "
                    onClick={() => {
                      setImagePreview(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-1/4 bg-blue-500 text-white rounded-md p-2 cursor-pointer"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
