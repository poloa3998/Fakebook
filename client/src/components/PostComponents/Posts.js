import React from "react";

import Post from "./Post";
function Posts({ posts }) {
  return (
    <div>
      {!posts ? (
        <p>Loading</p>
      ) : (
        posts.map((post) => {
          return (
            <Post
              key={post._id}
              id={post._id}
              authorId={post.author._id}
              author={post.author}
              profilePic={post.author.profilePic}
              likes={post.likes}
              message={post.content}
              img={post.img}
              comments={post.comments}
              timestamp={post.createdAt}
            />
          );
        })
      )}
    </div>
  );
}

export default Posts;
