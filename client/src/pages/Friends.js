import React from "react";
import FriendsSideBar from "../components/FriendsComponents/FriendsSideBar";
import FriendRequestList from "../components/FriendsComponents/FriendRequestList";
import FriendSuggestions from "../components/FriendsComponents/FriendSuggestions";

function Friends() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <FriendsSideBar />
      <div className="flex-1 px-4 overflow-y-auto">
        <FriendRequestList />
        <FriendSuggestions />
      </div>
    </div>
  );
}

export default Friends;
