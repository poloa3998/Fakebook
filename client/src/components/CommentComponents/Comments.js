import React from "react";

import Comment from "./Comment";

function Comments({ comments }) {
  return (
    <section>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment._id}
            commentId={comment._id}
            userId={comment.user._id}
            profilePic={comment.user.profilePic}
            firstName={comment.user.firstName}
            lastName={comment.user.lastName}
            content={comment.content}
            likes={comment.likes}
            replies={comment.replies}
            timestamp={comment.createdAt}
          />
        );
      })}
    </section>
  );
}

export default Comments;
