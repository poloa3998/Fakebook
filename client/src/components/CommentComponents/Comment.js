import React, { useEffect, useState, useContext } from "react";
import { DateTime } from "luxon";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";
import { PostContext } from "../../context/posts";
import { BsThreeDots } from "react-icons/bs";
import CommentModal from "./CommentModal";
import Replies from "./Replies";
import Reply from "./Reply";
import NewReply from "./NewReply";
import EditComment from "./EditComment";
import { AuthContext } from "../../context/auth";
function Comment({
  authorId,
  commentId,
  userId,
  profilePic,
  firstName,
  lastName,
  content,
  likes,
  replies,
  timestamp,
  setPostComments,
  setLatestPost,
}) {
  const { likeComment } = useContext(PostContext);
  const { loggedInUser } = useContext(AuthContext);
  const [commentLiked, setCommentLiked] = useState(false);
  const [replyActive, setReplyActive] = useState(false);
  const [commentLikes, setCommentLikes] = useState(0);
  const [commentReplies, setCommentReplies] = useState([]);
  const [hover, setHover] = useState(false);
  const [displayAllReplies, setDisplayAllReplies] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [editCommentActive, setEditCommentActive] = useState(false);
  const [deleteCommentActive, setDeleteCommentActive] = useState(false);
  timestamp = DateTime.fromISO(timestamp);

  useEffect(() => {
    setCommentLikes(likes.length);
    setCommentReplies(replies);
    if (likes?.includes(localStorage.getItem("id"))) {
      setCommentLiked(true);
    }
  }, [likes, replies]);
  const handleCommentLike = () => {
    if (commentLiked) {
      setCommentLikes(commentLikes === 0 ? commentLikes : commentLikes - 1);
    } else {
      setCommentLikes(commentLikes + 1);
    }
  };

  const displayReplies = () => {
    if (displayAllReplies) {
      return (
        <Replies
          replies={commentReplies}
          replyActive={replyActive}
          setReplyActive={setReplyActive}
        />
      );
    } else {
      if (commentReplies.length === 1) {
        const reply = commentReplies[0];
        return (
          <Reply
            key={reply._id}
            replyId={reply._id}
            profilePic={reply?.user.profilePic}
            firstName={reply?.user.firstName}
            lastName={reply?.user.lastName}
            content={reply.content}
            likes={reply.likes}
            replyActive={replyActive}
            setReplyActive={setReplyActive}
          />
        );
      } else {
        return (
          <Replies
            replies={commentReplies.slice(0, 2)}
            replyActive={replyActive}
            setReplyActive={setReplyActive}
          />
        );
      }
    }
  };

  const modalDisplays = () => {
    if (loggedInUser.id === authorId || loggedInUser.id === userId) {
      return (
        <BsThreeDots
          className="h-8 w-8 p-2 text-gray-500  hover:bg-gray-100 rounded-full cursor-pointer"
          onClick={() => setModalActive(!modalActive)}
          onMouseEnter={() => setHover(true)}
        />
      );
    } else {
      return null;
    }
  };
  return (
    <>
      {editCommentActive ? (
        <>
          <EditComment
            id={commentId}
            setEditCommentActive={setEditCommentActive}
            setModalActive={setModalActive}
            setPostComments={setPostComments}
            setLatestPost={setLatestPost}
          />
          {displayReplies()}
          {replies.length <= 2 ? null : (
            <div
              className="flex items-center space-x-2 ml-14 text-[0.95fem] font-medium"
              onClick={() => setDisplayAllReplies(!displayAllReplies)}
            >
              <BsArrowReturnRight className=" text-gray-600 cursor-pointer hover:underline" />
              <p className="cursor-pointer hover:underline">
                {!displayAllReplies
                  ? `View ${commentReplies.length - 2} more Replies`
                  : "Hide Replies"}
              </p>
            </div>
          )}
          {!replyActive ? null : (
            <NewReply id={commentId} setReplies={setCommentReplies} />
          )}
        </>
      ) : (
        <div
          className="bg-white text-gray-500 py-1 px-2 mr-5 relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {!content ? null : (
            <>
              <div
                className="flex items-center space-x-3 py-2 "
                onMouseEnter={() => setHover(true)}
              >
                <div
                  className="flex space-x-1 "
                  onMouseEnter={() => setHover(true)}
                >
                  <Link to={`/${userId}`}>
                    <img
                      src={profilePic}
                      className="w-8 h-8 rounded-full cursor-pointer "
                      alt="user"
                      onMouseEnter={() => setHover(true)}
                    />
                  </Link>
                  <div
                    className="bg-gray-200 text-black rounded-2xl px-3 py-1 relative"
                    onMouseEnter={() => setHover(true)}
                  >
                    <p
                      className="font-medium hover:underline cursor-pointer"
                      onMouseEnter={() => setHover(true)}
                    >
                      {`${firstName} ${lastName}`}
                    </p>
                    <p
                      className="text-[0.90rem] break-words max-w-[16.5rem] sm:max-w-[18rem] md:max-w-[23rem] lg:max-w-[30rem]"
                      onMouseEnter={() => setHover(true)}
                    >
                      {content}
                    </p>
                    {commentLikes === 0 ? null : (
                      <div
                        className="absolute -right-9 -bottom-1  flex items-center gap-1 shadow-xl rounded-xl border px-1 bg-white"
                        onMouseEnter={() => setHover(true)}
                      >
                        <div
                          className="flex justify-center items-center rounded-full bg-blue-500 w-[1.1rem] h-[1.1rem]"
                          onMouseEnter={() => setHover(true)}
                        >
                          <FaThumbsUp
                            className="text-white h-[0.6rem] w-[0.6rem]"
                            onMouseEnter={() => setHover(true)}
                          />
                        </div>
                        <p onMouseEnter={() => setHover(true)}>
                          {commentLikes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {!hover ? null : modalDisplays()}
                {!modalActive ? null : (
                  <CommentModal
                    onMouseEnter={() => setHover(true)}
                    commentAuthor={userId}
                    id={commentId}
                    setEditCommentActive={setEditCommentActive}
                    editCommentActive={editCommentActive}
                    setDeleteCommentActive={setDeleteCommentActive}
                    deleteCommentActive={deleteCommentActive}
                    setModalActive={setModalActive}
                    setPostComments={setPostComments}
                    setLatestPost={setLatestPost}
                  />
                )}
              </div>
              <section className="flex justify-between items-center text-xs ml-10 font-bold">
                <div className="flex space-x-3">
                  <p
                    className={
                      commentLiked
                        ? "cursor-pointer hover:underline text-blue-500"
                        : "cursor-pointer hover:underline"
                    }
                    onClick={() => {
                      likeComment(commentId);
                      setCommentLiked(!commentLiked);
                      handleCommentLike();
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
                  <ReactTimeAgo
                    className="text-gray-500/80 font-normal"
                    date={timestamp.ts}
                    timeStyle="twitter"
                    locale="en-US"
                  />
                </div>
              </section>
              {displayReplies()}
              {replies.length <= 2 ? null : (
                <div
                  className="flex items-center space-x-2 ml-14 text-[0.95fem] font-medium"
                  onClick={() => setDisplayAllReplies(!displayAllReplies)}
                >
                  <BsArrowReturnRight className=" text-gray-600 cursor-pointer hover:underline" />
                  <p className="cursor-pointer hover:underline">
                    {!displayAllReplies
                      ? `View ${commentReplies.length - 2} more Replies`
                      : "Hide Replies"}
                  </p>
                </div>
              )}
              {!replyActive ? null : (
                <NewReply id={commentId} setReplies={setCommentReplies} />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Comment;
