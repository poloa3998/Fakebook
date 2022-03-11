import React from "react";
import DeletePostModal from "./DeletePostModal";
import EditPost from "./EditPost";

function PostModal({
  id,
  setEditPostActive,
  editPostActive,
  setDeletePostActive,
  deletePostActive,
}) {
  return (
    <div className=" h-max w-1/4 p-2 absolute top-8 right-0 bottom-0 bg-white shadow-xl rounded-xl">
      <p
        className="mb-2 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer "
        onClick={() => setEditPostActive(true)}
      >
        Edit
      </p>
      <p
        className="px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer"
        onClick={() => setDeletePostActive(true)}
      >
        Delete
      </p>
      {deletePostActive ? (
        <DeletePostModal id={id} setDeletePostActive={setDeletePostActive} />
      ) : null}
      {editPostActive ? (
        <EditPost id={id} setEditPostActive={setEditPostActive} />
      ) : null}
    </div>
  );
}

export default PostModal;
