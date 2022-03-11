import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import DeleteCommentModal from "./DeleteCommentModal";

function CommentModal({
  commentAuthor,
  id,
  setEditCommentActive,
  setDeleteCommentActive,
  deleteCommentActive,
  setModalActive,
  setPostComments,
  setLatestPost,
}) {
  const { loggedInUser } = useContext(AuthContext);
  return (
    <div className="text-black h-max w-1/4 p-2 absolute  top-[4.5rem] left-10 bg-white shadow-xl rounded-xl z-10">
      {loggedInUser.id === commentAuthor ? (
        <p
          className="mb-2 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer "
          onClick={() => setEditCommentActive(true)}
        >
          Edit
        </p>
      ) : null}
      <p
        className="px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer"
        onClick={() => setDeleteCommentActive(true)}
      >
        Delete
      </p>
      {deleteCommentActive ? (
        <DeleteCommentModal
          id={id}
          setDeleteCommentActive={setDeleteCommentActive}
          setModalActive={setModalActive}
          setPostComments={setPostComments}
          setLatestPost={setLatestPost}
        />
      ) : null}
    </div>
  );
}

export default CommentModal;
