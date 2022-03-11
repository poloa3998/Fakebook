import React from "react";
import { Link } from "react-router-dom";
import { BsFillMoonFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { AiOutlineRight } from "react-icons/ai";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";
function NavOptionsModal() {
  const { logout, loggedInUser } = useContext(AuthContext);
  return (
    <div className=" h-fit w-3/5  md:max-w-sm  fixed  top-16 right-6 bottom-0 bg-white shadow-xl rounded-xl p-3 ">
      <Link to={`/${loggedInUser.id}`}>
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer border-b">
          <img
            src={loggedInUser.profilePic}
            className="h-20 w-20 rounded-full"
            alt="User"
          />
          <div>
            <p className="text-lg font-semibold  ">{loggedInUser.name}</p>
            <p className="text-sm text-gray-500">See your profile</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center text-lg hover:bg-gray-100 cursor-pointer rounded-md p-2 my-2">
        <div className="flex space-x-2 items-center">
          <BsFillMoonFill className="h-10 w-10 bg-gray-200 p-2 rounded-full" />
          <p>Display</p>
        </div>
        <AiOutlineRight />
      </div>

      <div
        className="flex space-x-2 items-center text-lg hover:bg-gray-100 cursor-pointer rounded-md p-2"
        onClick={() => logout()}
      >
        <div>
          <IoLogOut className="h-10 w-10 bg-gray-200 p-2 rounded-full" />
        </div>
        <p>Log Out</p>
      </div>
    </div>
  );
}

export default NavOptionsModal;
