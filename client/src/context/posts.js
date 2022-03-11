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
  const [comment, setComment] = useState("");
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
  const getPost = useCallback(async (id) => {
    console.log(id);
    const res = await axios.get(`/api/posts/${id}`);
    console.log(res.data);
    setPost(res.data);
  }, []);
  const getPosts = useCallback(async () => {
    const res = await axios.get(`/api/posts/timeline`);
    setPosts(res.data);
  }, []);

  const getUserPosts = useCallback(async (id) => {
    const res = await axios.get(`/api/posts/currentuser/${id}`);
    setUserPosts(res.data);
  }, []);

  const editPost = async (id, content, img) => {
    const post = {
      content: content,
      img: !img ? null : `/api/images/${img}`,
    };
    await axios.put(`/api/posts/${id}`, post);
    getPosts();
    getUserPosts();
  };

  const deletePost = async (id) => {
    await axios.delete(`/api/posts/${id}`);
    getPosts();
    getUserPosts();
  };
  const getComments = useCallback(async (id) => {
    const res = await axios.get(`/api/posts/${id}`);
    setComments(res.data.comments);
  }, []);

  const getComment = useCallback(async (id) => {
    try {
      const res = await axios.get(`/api/posts/comments/${id}`);
      setComment(res.data);
    } catch (error) {
      console.log(error);
    }
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
      const res = await axios.post(`/api/posts/comments/${id}`, newComment);

      setPostComments(res.data);
      setLatestPost([...latestPost, res.data[res.data.length - 1]]);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (id, setPostComments, setLatestPost) => {
    const res = await axios.delete(`/api/posts/comments/${id}`);
    console.log(res.data);
    setPostComments(res.data);
    setLatestPost([res.data[res.data.length - 1]]);
    getComments();
  };
  const editComment = async (id, content, setPostComments, setLatestPost) => {
    try {
      const comment = {
        content: content,
      };
      const res = await axios.put(`/api/posts/comments/${id}`, comment);
      setPostComments(res.data);
      setLatestPost([res.data[res.data.length - 1]]);
      getComments();
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
        `/api/posts/comments/${id}/reply`,
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
    getPost,
    getPosts,
    getUserPosts,
    editPost,
    deletePost,
    getComments,
    getComment,
    createPost,
    createComment,
    deleteComment,
    editComment,
    createReply,
    likePost,
    likeComment,
    posts,
    userPosts,
    setComment,
    comment,
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
