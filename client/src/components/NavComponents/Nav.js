import { Link } from "react-router-dom";

import { HiSearch, HiHome, HiUsers } from "react-icons/hi";
import {
  BsCollectionPlayFill,
  BsFillBellFill,
  BsFillChatDotsFill,
  BsFillCaretDownFill,
} from "react-icons/bs";
import { IoStorefrontSharp } from "react-icons/io5";

import logo from "../../assets/images/logo.svg";
import NavIcons from "./NavIcons";
import { AuthContext } from "../../context/auth";
import { useContext, useState } from "react";
import NavOptionsModal from "./NavOptionsModal";
import NavMessengerModal from "./NavMessengerModal.js.js";
const Nav = ({ setMessagesActive }) => {
  const { loggedInUser } = useContext(AuthContext);
  const [optionsModalActive, setOptionsModalActive] = useState(false);
  const [messengerModalActive, setMessengerModalActive] = useState(false);

  return (
    <>
      {loggedInUser === null ? null : (
        <nav className="sticky top-0 bg-white flex justify-between p-1 lg:px-5 shadow-md overflow-x-hidden z-50 ">
          {/* Left side */}
          <div className="flex items-center">
            <Link to="/" className="w-14 h-14">
              <img src={logo} className="w-14 h-14" alt="Fakebook logo" />
            </Link>
            <div className="flex items-center rounded-full bg-gray-100 p-2">
              <HiSearch className="h-6 w-6 text-gray-600" />
              <input
                type="text"
                className="hidden md:inline-flex flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-500"
                placeholder="Search Fakebook"
              />
            </div>
          </div>
          {/* Center */}

          <div className="flex items-center justify-evenly w-3/5 md:w-1/5 lg:w-2/5">
            <Link to="/">
              <NavIcons active Icon={HiHome} />
            </Link>
            <Link to="/friends">
              <NavIcons Icon={HiUsers} />
            </Link>
            <NavIcons
              Icon={BsCollectionPlayFill}
              className="hidden md:inline"
            />
            <NavIcons Icon={IoStorefrontSharp} />
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Profile Pic */}
            <Link to={`/${loggedInUser.id}`} className="hidden lg:inline px-1">
              <div className="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
                <img
                  src={loggedInUser.profilePic}
                  className="h-10 w-10 rounded-full"
                  alt="User"
                />
                <p className=" whitespace-nowrap font-semibold pr-3">
                  {loggedInUser.name}
                </p>
              </div>
            </Link>

            <BsFillChatDotsFill
              className="icon relative"
              onClick={() => setMessengerModalActive(!messengerModalActive)}
            />
            {!messengerModalActive ? null : (
              <NavMessengerModal
                setMessengerModalActive={setMessengerModalActive}
                setMessagesActive={setMessagesActive}
              />
            )}
            <BsFillBellFill className="icon" />
            <BsFillCaretDownFill
              className="icon relative"
              onClick={() => setOptionsModalActive(!optionsModalActive)}
            />
            {!optionsModalActive ? null : <NavOptionsModal />}
          </div>
        </nav>
      )}
    </>
  );
};

export default Nav;
