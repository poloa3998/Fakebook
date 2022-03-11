import React, { useContext, useEffect } from "react";

import { PostContext } from "../../context/posts";
import { AuthContext } from "../../context/auth";
import Posts from "../PostComponents/Posts";
import InputBox from "../PostComponents/InputBox";
function ProfileFeed({ id }) {
  const { userPosts, getUserPosts } = useContext(PostContext);
  const { loggedInUser } = useContext(AuthContext);
  useEffect(() => {
    getUserPosts(id);
  }, [getUserPosts, id, loggedInUser]);
  return (
    <div>
      <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
        {id === loggedInUser.id ? <InputBox /> : null}
        <Posts posts={userPosts} />
      </div>
    </div>
  );
}

export default ProfileFeed;
