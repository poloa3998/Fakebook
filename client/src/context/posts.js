import React, { useState, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./auth";

export const PostContext = React.createContext();

export const usePost = () => {
  return useContext(PostContext);
};

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { loggedInUser, addPicture } = useContext(AuthContext);
  const createPost = async (content, img) => {
    try {
      if (img) {
        addPicture(img);
      }
      const newPost = {
        content: content,
        img: !img ? null : `/api/images/${img}`,
      };

      await axios.post(`api/posts/create`, newPost);
      getPosts();
      getUserPosts(loggedInUser.id);
    } catch (error) {
      console.log(error);
    }
  };
  const getPosts = useCallback(async () => {
    const res = await axios.get(`/api/posts/timeline`);
    setPosts(res.data);
  }, []);

  const getUserPosts = useCallback(async (id) => {
    const res = await axios.get(`/api/posts/${id}`);
    setUserPosts(res.data);
  }, []);

  const editPost = async (id, content, img) => {
    const post = {
      content: content,
      img: !img ? null : `/api/images/${img}`,
    };
    await axios.put(`/api/posts/${id}/edit`, post);
  };

  const deletePost = async (id) => {
    await axios.delete(`/api/posts${id}/delete`);
    getPosts();
  };
  const getComments = useCallback(async (id) => {
    const res = await axios.get(`/api/posts/${id}`);
    setComments(res.data.comments);
  }, []);
  const createComment = async (
    comment,
    id,
    setPostComments,
    latestPost,
    setLatestPost
  ) => {
    const newComment = {
      content: comment,
    };
    try {
      const res = await axios.post(
        `/api/posts/${id}/comments/create`,
        newComment
      );

      setPostComments(res.data);
      setLatestPost([...latestPost, res.data[res.data.length - 1]]);
    } catch (error) {
      console.log(error);
    }
  };
  const createReply = async (comment, id, setReplies) => {
    const newComment = {
      content: comment,
    };
    try {
      const res = await axios.post(
        `/api/posts/comments/${id}/create`,
        newComment
      );

      setReplies(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const likePost = async (id) => {
    try {
      await axios.put(`/api/posts/${id}/like`, {
        user_id: loggedInUser.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const likeComment = async (id) => {
    try {
      await axios.put(`/api/posts/comments/${id}/like`, {
        user_id: loggedInUser.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    getPosts,
    getUserPosts,
    editPost,
    deletePost,
    getComments,
    createPost,
    createComment,
    createReply,
    likePost,
    likeComment,
    posts,
    userPosts,
    comments,
    setPost,
    post,
    error,
    setError,
  };
  return (
    <PostContext.Provider value={value}>{props.children}</PostContext.Provider>
  );
};
