import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PostContext } from "../../context/posts";
function DeleteCommentModal({
  id,
  setDeleteCommentActive,
  setModalActive,
  setPostComments,
  setLatestPost,
}) {
  const { deleteComment } = useContext(PostContext);
  return (
    <div className="fixed flex flex-col justify-center items-center bg-gray-100/70 h-screen w-screen top-0 left-0 z-50">
      <div className="flex flex-col  w-fit bg-white p-4 rounded-md shadow-2xl space-y-5">
        <div className="flex items-center justify-end border-b pb-2 mb-2">
          <p className="w-48 sm:w-[22rem] text-xl font-semibold text-black">
            Delete Comment?
          </p>
          <AiOutlineClose
            className="w-8 h-8 p-1 text-gray-500 bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full"
            onClick={() => setDeleteCommentActive(false)}
          />
        </div>
        <p>Are you sure to want to delete this comment?</p>
        <div className="flex justify-end space-x-5">
          <button
            className="text-blue-500 font-semibold cursor-pointer"
            onClick={() => setDeleteCommentActive(false)}
          >
            No
          </button>
          <button
            className="bg-blue-500 text-white font-semibold p-2 rounded-lg cursor-pointer"
            onClick={() => {
              deleteComment(id, setPostComments, setLatestPost);
              setDeleteCommentActive(false);
              setModalActive(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
