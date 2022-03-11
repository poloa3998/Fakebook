import React, { useContext, useEffect } from "react";
import { PostContext } from "../../context/posts";
import InputBox from "../PostComponents/InputBox";
import Posts from "../PostComponents/Posts";
function Feed() {
  const { posts, getPosts } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-8 overflow-y-auto">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        {/* Stories */}
        {/* InputBox */}
        <InputBox />
        {/* Posts */}
        <Posts posts={posts} />
      </div>
    </div>
  );
}

export default Feed;
