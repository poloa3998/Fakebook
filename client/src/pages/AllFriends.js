import React, { useContext, useEffect } from "react";

import { useParams } from "react-router";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";

function AllFriends() {
  const { userId } = useParams();
  const { currentUser, getUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    getUser(userId);
    return () => {
      setCurrentUser(null);
    };
  }, [userId, getUser, setCurrentUser]);
  return (
    <div className="h-screen w-screen bg-gray-100 p-5">
      <p className="text-2xl font-semibold mb-4"> Friends </p>

      <div className="flex flex-col space-y-5">
        {currentUser?.friends.map((friend) => {
          return (
            <Link to={`/${friend.user._id}`} key={friend.user._id}>
              <div className="bg-white p-5 rounded-md shadow-md flex items-center space-x-2 cursor-pointer">
                <img
                  src={friend.user.profilePic}
                  className="h-20 w-20 rounded-full"
                  alt="user"
                />
                <p className="text-lg font-semibold">
                  {friend.user.firstName}
                  {""} {friend.user.lastName}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default AllFriends;
