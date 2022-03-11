import React from "react";

function CommentModal() {
  return (
    <div className="text-black h-max w-1/4 p-2 absolute  top-[4.5rem] left-10 bg-white shadow-xl rounded-xl z-10">
      <p className="mb-2 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer ">
        Edit
      </p>
      <p className="px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
        Delete
      </p>
    </div>
  );
}

export default CommentModal;
