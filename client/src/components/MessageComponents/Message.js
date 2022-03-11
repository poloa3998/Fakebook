import React from "react";

function Message({ user, text, ownMessage }) {
  return (
    <div className="flex flex-col">
      {user === null ? null : (
        <div
          className={
            ownMessage
              ? "flex justify-end px-3 py-2"
              : "flex space-x-2 px-1 py-2"
          }
        >
          {ownMessage ? null : (
            <img
              src={user.profilePic}
              className="h-10 w-10 rounded-full"
              alt="User"
            />
          )}

          <p
            className={
              ownMessage
                ? "bg-blue-500/80 text-white p-2 rounded-lg max-w-[13rem] break-words"
                : "bg-gray-200/90 p-2 rounded-lg max-w-[13rem] break-words"
            }
          >
            {text}
          </p>
        </div>
      )}
    </div>
  );
}

export default Message;
