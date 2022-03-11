import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
function FriendCard({ id, name, profilePic, cardType }) {
  const { sendFriendRequest, addFriendRequest, deleteFriendRequest } =
    useContext(AuthContext);
  const [acceptedRequest, setAcceptedRequest] = useState(false);
  const [deleteRequest, setDeletedRequest] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestCancelled, setRequestCancelled] = useState(false);

  const displayButtons = () => {
    if (cardType === "Request") {
      if (acceptedRequest) {
        return (
          <button className="bg-gray-300 font-medium p-2 rounded-lg hover:cursor-not-allowed opacity-40 ">
            Request Accepted
          </button>
        );
      }
      if (deleteRequest) {
        return (
          <button className="bg-gray-300 font-medium p-2 rounded-lg hover:cursor-not-allowed opacity-40 ">
            Request Deleted
          </button>
        );
      }

      return (
        <>
          <button
            className="bg-blue-500 font-medium text-white p-2 rounded-lg cursor-pointer hover:bg-blue-600/90 "
            onClick={() => {
              setAcceptedRequest(true);
              addFriendRequest(id);
            }}
          >
            Confirm
          </button>
          <button
            className="bg-gray-200/80 font-medium  p-2 rounded-lg cursor-pointer hover:bg-gray-300/80"
            onClick={() => {
              setDeletedRequest(true);
              deleteFriendRequest(id);
            }}
          >
            Delete
          </button>
        </>
      );
    } else if (cardType === "Profile") {
      return null;
    } else {
      if (requestSent) {
        return (
          <>
            <p className="text-gray-500 ">Request sent</p>
            <button
              className="bg-gray-200/80 font-medium p-2 rounded-lg cursor-pointer hover:bg-gray-300/80"
              onClick={() => {
                setRequestCancelled(true);
                setRequestSent(false);
                deleteFriendRequest(id);
              }}
            >
              Remove
            </button>
          </>
        );
      } else {
        return (
          <>
            {!requestCancelled ? null : (
              <p className="text-gray-500">Request Canceled</p>
            )}
            <button
              className=" bg-blue-100/80 text-blue-500 font-medium p-2 rounded-lg cursor-pointer hover:bg-blue-200/60"
              onClick={() => {
                setRequestSent(true);
                sendFriendRequest(id);
              }}
            >
              Add Friend
            </button>
            <button className="bg-gray-200/80 font-medium p-2 rounded-lg cursor-pointer hover:bg-gray-300/80">
              Remove
            </button>
          </>
        );
      }
    }
  };
  return (
    <div className="mt-2 shadow-md max-w-sm  bg-white">
      <Link to={`/${id}`}>
        {cardType === "Profile" ? (
          <img
            src={profilePic}
            className=" h-32 w-32 rounded-t-lg cursor-pointer"
            alt="User"
          />
        ) : (
          <img
            src={profilePic}
            className=" rounded-t-lg cursor-pointer"
            alt="User"
          />
        )}
      </Link>
      <div className="py-2 px-3">
        <p className="font-semibold  ">{name}</p>
        <div className="flex flex-col space-y-2">{displayButtons()}</div>
      </div>
    </div>
  );
}

export default FriendCard;
