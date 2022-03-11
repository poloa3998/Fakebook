import React from "react";

import Comment from "./Comment";

function Comments({ authorId, comments, setPostComments, setLatestPost }) {
  return (
    <section>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment._id}
            authorId={authorId}
            commentId={comment._id}
            userId={comment.user._id}
            profilePic={comment.user.profilePic}
            firstName={comment.user.firstName}
            lastName={comment.user.lastName}
            content={comment.content}
            likes={comment.likes}
            replies={comment.replies}
            timestamp={comment.createdAt}
            setPostComments={setPostComments}
            setLatestPost={setLatestPost}
          />
        );
      })}
    </section>
  );
}

export default Comments;
