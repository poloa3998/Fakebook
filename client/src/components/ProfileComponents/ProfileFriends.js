import React from "react";
import { Link } from "react-router-dom";
import FriendCard from "../FriendsComponents/FriendCard";

function ProfileFriends({ id, friends }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {friends.length === 0 ? null : (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-semibold"> Friends </p>
              <p>
                {friends.length} {friends.length === 1 ? "Friend" : "Friends"}{" "}
              </p>
            </div>
            {friends.length > 9 ? (
              <Link to={`/${id}/friends`}>
                <p className="cursor-pointer text-blue-500 hover:bg-gray-100 p-2">
                  See all friends
                </p>
              </Link>
            ) : null}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {friends.length > 9
              ? friends.slice(0, 9).map((friend) => {
                  return (
                    <FriendCard
                      key={friend.user._id}
                      id={friend.user._id}
                      name={`${friend.user.firstName} ${friend.user.lastName}`}
                      profilePic={friend.user.profilePic}
                      cardType="Profile"
                    />
                  );
                })
              : friends.map((friend) => {
                  return (
                    <FriendCard
                      key={friend.user._id}
                      id={friend.user._id}
                      name={`${friend.user.firstName} ${friend.user.lastName}`}
                      profilePic={friend.user.profilePic}
                      cardType="Profile"
                    />
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileFriends;
