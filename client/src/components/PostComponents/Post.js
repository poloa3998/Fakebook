import React, { useState, useEffect, useContext } from "react";
import { DateTime } from "luxon";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { AiOutlineLike, AiFillCaretDown } from "react-icons/ai";
import { FaThumbsUp } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import Comments from "../CommentComponents/Comments";
import PostModal from "./PostModal";
import { PostContext } from "../../context/posts";
import NewComment from "../CommentComponents/NewComment";
import { AuthContext } from "../../context/auth";

function Post({
  id,
  authorId,
  author,
  profilePic,
  likes,
  message,
  img,
  comments,
  timestamp,
}) {
  const { likePost } = useContext(PostContext);
  const { loggedInUser } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  const [postComments, setPostComments] = useState([]);
  const [commentsActive, setCommentsActive] = useState(true);
  const [displayAllComments, setDisplayAllComments] = useState(false);
  const [latestPost, setLatestPost] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [editPostActive, setEditPostActive] = useState(false);
  const [deletePostActive, setDeletePostActive] = useState(false);
  timestamp = DateTime.fromISO(timestamp);
  useEffect(() => {
    setPostLikes(likes.length);
    setPostComments(comments);
    if (likes?.includes(localStorage.getItem("id"))) {
      setLiked(true);
    }
    setLatestPost([comments[comments.length - 1]]);
  }, [likes, comments]);
  const handleLike = () => {
    if (liked) {
      setPostLikes(postLikes === 0 ? postLikes : postLikes - 1);
    } else {
      setPostLikes(postLikes + 1);
    }
  };

  return (
    <section className="flex flex-col bg-white shadow-md my-5 rounded-2xl">
      <div className="px-3 mt-3 ">
        <div className="flex items-center justify-between space-x-2 relative">
          <div className="flex space-x-3">
            <Link to={`/${authorId}`}>
              <img
                src={profilePic}
                className="h-10 w-10 rounded-full cursor-pointer"
                alt="User"
              />
            </Link>
            <div className="flex flex-col ">
              <Link to={`/${authorId}`}>
                <p className="font-medium hover:underline cursor-pointer">{`${author.firstName} ${author.lastName}`}</p>
              </Link>
              <ReactTimeAgo
                className="text-sm text-gray-500/80 font-light"
                date={timestamp.ts}
                timeStyle="twitter"
                locale="en-US"
              />
            </div>
          </div>
          {loggedInUser.id !== authorId ? null : (
            <BsThreeDots
              className="h-9 w-9 p-2 text-gray-500  hover:bg-gray-100 rounded-full cursor-pointer"
              onClick={() => setModalActive(!modalActive)}
            />
          )}
          {!modalActive ? null : (
            <PostModal
              id={id}
              setModalActive={setModalActive}
              setEditPostActive={setEditPostActive}
              editPostActive={editPostActive}
              setDeletePostActive={setDeletePostActive}
              deletePostActive={deletePostActive}
            />
          )}
        </div>
        <p className="py-2">{message}</p>
      </div>
      {img === "" ? null : <img src={img} alt={img} className="w-full" />}
      <div
        className={
          postLikes === 0 ? "" : "flex items-center justify-between pt-1"
        }
      >
        {postLikes === 0 ? null : (
          <div className="flex items-center gap-2 bg-white px-3 py-1">
            <div className="flex justify-center items-center rounded-full bg-blue-500 w-5 h-5">
              <FaThumbsUp className="text-white h-[0.8rem] w-[0.8rem]" />
            </div>
            {postLikes}
          </div>
        )}
        {postComments.length === 0 ? null : (
          <div className="flex justify-end">
            <p
              className=" text-gray-500/80 cursor-pointer hover:underline pb-2 px-4"
              onClick={() => setCommentsActive(!commentsActive)}
            >
              {postComments.length}{" "}
              {postComments.length === 1 ? "Comment" : "Comments"}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center bg-white text-gray-500 border-y px-2 py-1">
        <div
          className={liked ? "inputIcon text-blue-500" : "inputIcon"}
          onClick={() => {
            likePost(id);
            setLiked(!liked);
            handleLike();
          }}
        >
          <AiOutlineLike className="h-6 w-5" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="inputIcon">
          <BiComment className="h-6 w-5" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="inputIcon">
          <RiShareForwardLine className="h-6 w-5" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
      {!commentsActive ? null : (
        <>
          {postComments.length <= 1 ? null : (
            <div className="flex justify-between px-1 text-md  font-medium bg-white text-gray-600 ">
              <p
                className="cursor-pointer"
                onClick={() => setDisplayAllComments(!displayAllComments)}
              >
                {!displayAllComments
                  ? `View ${postComments.length - 1} previous comments`
                  : "Hide Comments"}
              </p>
              <div className="flex justify-center items-center space-x-1">
                <p>All comments</p>
                <AiFillCaretDown className="mt-1" />
              </div>
            </div>
          )}
          {!displayAllComments && latestPost[0] ? (
            <Comments
              authorId={authorId}
              comments={latestPost}
              setPostComments={setPostComments}
              setLatestPost={setLatestPost}
            />
          ) : (
            <Comments
              authorId={authorId}
              comments={postComments}
              setPostComments={setPostComments}
              setLatestPost={setLatestPost}
            />
          )}
          <NewComment
            id={id}
            setPostComments={setPostComments}
            latestPost={latestPost}
            setLatestPost={setLatestPost}
          />
        </>
      )}
    </section>
  );
}

export default Post;
