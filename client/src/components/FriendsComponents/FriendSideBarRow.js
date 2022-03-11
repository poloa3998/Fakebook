import React from "react";

function FriendSideBarRow({ active, Icon, title, linkTo }) {
  return (
    <div
      className={
        !active
          ? "flex items-center space-x-2 p-2 hover:bg-gray-200/80 rounded-xl cursor-pointer"
          : "flex items-center space-x-2 p-2  bg-gray-200/80 rounded-xl cursor-pointer"
      }
    >
      {Icon && (
        <div
          className={
            !active
              ? "bg-gray-200 rounded-full p-2"
              : "bg-blue-500 rounded-full p-2"
          }
        >
          <Icon className={!active ? "h-6 w-6 " : "h-6 w-6 text-white"} />
        </div>
      )}

      <p className="hidden sm:inline-flex ">{title}</p>
    </div>
  );
}

export default FriendSideBarRow;
