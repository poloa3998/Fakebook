import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { PostContext } from "../../context/posts";
import { AuthContext } from "../../context/auth";
function EditComment({
  id,
  setEditCommentActive,
  setModalActive,
  setPostComments,
  setLatestPost,
}) {
  const { editComment, comment, getComment, setComment } =
    useContext(PostContext);
  const { loggedInUser } = useContext(AuthContext);

  console.log(comment);
  const handleInput = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };
  const onEnterPress = (e) => {
    if (e.key === "Escape") {
      setEditCommentActive(false);
      setModalActive(false);
    }
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      return handleSubmit();
    }
  };
  const handleSubmit = () => {
    editComment(comment?._id, comment?.content, setPostComments, setLatestPost);
    setEditCommentActive(false);
    setModalActive(false);
  };
  useEffect(() => {
    getComment(id);
    return () => {
      setComment("");
    };
  }, [getComment, id, setComment]);

  return (
    <form className="bg-white px-2  rounded-b-xl" onSubmit={handleSubmit}>
      <div className="flex justify-center items-center space-x-2 py-2">
        <Link to={`/${loggedInUser.id}`}>
          <img
            src={loggedInUser.profilePic}
            className=" h-8 w-8 rounded-full"
            alt="User"
          />
        </Link>
        <TextareaAutosize
          className="bg-gray-200/80 opacity-80 rounded-2xl w-full p-2 text-sm placeholder-gray-500 text-black outline-none resize-none "
          placeholder="Write a comment..."
          value={comment?.content}
          name="content"
          onChange={handleInput}
          onKeyDown={onEnterPress}
        />
      </div>
      <p className="text-xs px-10 pb-2 text-black">Press Esc to cancel</p>
    </form>
  );
}

export default EditComment;
