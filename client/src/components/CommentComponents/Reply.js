import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { FaThumbsUp } from "react-icons/fa";
import { PostContext } from "../../context/posts";
function Reply({
  replyId,
  userId,
  profilePic,
  firstName,
  lastName,
  content,
  likes,
  replyActive,
  setReplyActive,
}) {
  const { likeComment } = useContext(PostContext);
  const [replyLiked, setReplyLiked] = useState(false);
  const [replyLikes, setReplyLikes] = useState(0);

  useEffect(() => {
    setReplyLikes(likes.length);
    if (likes?.includes(localStorage.getItem("id"))) {
      setReplyLiked(true);
    }
  }, [likes]);
  const handleReplyLike = () => {
    if (replyLiked) {
      setReplyLikes(replyLikes === 0 ? replyLikes : replyLikes - 1);
    } else {
      setReplyLikes(replyLikes + 1);
    }
  };
  return (
    <section className="bg-white  text-gray-500 py-1 px-2">
      {!content ? null : (
        <>
          <div className="flex space-x-1 py-2">
            <Link to={`/${userId}`}>
              <img
                src={profilePic}
                className="w-7 h-7 rounded-full "
                alt="user"
              />
            </Link>
            <div className="bg-gray-200 text-black rounded-2xl px-3 py-1 relative">
              <p className=" text-sm font-medium hover:underline">
                {`${firstName} ${lastName}`}
              </p>
              <p className="text-[0.90rem] break-words max-w-[14rem] sm:max-w-[16rem] md:max-w-[20rem] lg:max-w-md ">
                {content}
              </p>
              {replyLikes === 0 ? null : (
                <div className="absolute -right-10 -bottom-1 flex items-center gap-1 shadow-xl rounded-xl border px-1 bg-white">
                  <div className="flex justify-center items-center rounded-full bg-blue-500 w-[1.15rem] h-[1.15rem]">
                    <FaThumbsUp className="text-white h-[0.65rem] w-[0.65rem]" />
                  </div>
                  <p>{replyLikes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex text-xs space-x-3 ml-16 font-bold">
            <p
              className={
                replyLiked
                  ? "cursor-pointer hover:underline text-blue-500"
                  : "cursor-pointer hover:underline"
              }
              onClick={() => {
                likeComment(replyId);
                setReplyLiked(!replyLiked);
                handleReplyLike();
              }}
            >
              Like
            </p>
            <p
              className="cursor-pointer hover:underline"
              onClick={() => setReplyActive(!replyActive)}
            >
              Reply
            </p>
          </div>
        </>
      )}
    </section>
  );
}

export default Reply;
