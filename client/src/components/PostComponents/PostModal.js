import React from "react";

function PostModal() {
  return (
    <div className=" h-max w-1/4 p-2 absolute top-8 right-0 bottom-0 bg-white shadow-xl rounded-xl">
      <p className="mb-2 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer ">
        Edit
      </p>
      <p className="px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
        Delete
      </p>
    </div>
  );
}

export default PostModal;
