import React, { useContext } from "react";
import FriendCard from "./FriendCard";
import { AuthContext } from "../../context/auth";
function FriendSuggestions() {
  const { peopleMayKnow } = useContext(AuthContext);

  return (
    <div className="flex-1 p-6">
      <p className="text-xl font-semibold">People You May Know</p>
      <div className="grid grid-cols-auto-fit grid-rows-auto-fit gap-5 ">
        {peopleMayKnow.map((user) => {
          return (
            <FriendCard
              key={user._id + "x"}
              id={user._id}
              name={`${user.firstName} ${user.lastName}`}
              profilePic={user.profilePic}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FriendSuggestions;
