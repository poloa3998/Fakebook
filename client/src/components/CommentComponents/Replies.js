import React from "react";

import Reply from "./Reply";
function Replies({ replies, replyActive, setReplyActive }) {
  return (
    <section className="ml-12">
      {replies?.map((reply) => {
        return (
          <Reply
            key={reply._id}
            replyId={reply._id}
            userId={reply.user._id}
            profilePic={reply.user.profilePic}
            firstName={reply.user.firstName}
            lastName={reply.user.lastName}
            content={reply.content}
            likes={reply.likes}
            replyActive={replyActive}
            setReplyActive={setReplyActive}
          />
        );
      })}
    </section>
  );
}

export default Replies;
