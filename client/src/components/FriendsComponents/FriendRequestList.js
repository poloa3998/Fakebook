import React, { useContext } from "react";
import FriendCard from "./FriendCard";
import { AuthContext } from "../../context/auth";
function FriendRequestList() {
  const { friendRequests } = useContext(AuthContext);

  return (
    <>
      {friendRequests.length === 0 ? null : (
        <div className="flex-1 p-6 border-b border-gray-300">
          <p className="text-xl font-semibold">Friend Requests</p>

          <div className="grid grid-cols-auto-fit grid-rows-auto-fit gap-5 ">
            {friendRequests.map((request) => {
              return (
                <FriendCard
                  key={request.user._id}
                  id={request.user._id}
                  name={`${request.user.firstName} ${request.user.lastName}`}
                  profilePic={request.user.profilePic}
                  cardType="Request"
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default FriendRequestList;
