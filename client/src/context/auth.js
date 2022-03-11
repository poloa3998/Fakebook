import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  axios.defaults.withCredentials = true;
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [peopleMayKnow, setPeopleMayKnow] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [error, setError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const facebookLogin = useCallback(async () => {
    if (
      !localStorage.getItem("authenticated") &&
      location.pathname !== "/login"
    ) {
      try {
        const res = await axios.get(`/api/users/auth/facebook/success`);

        localStorage.setItem("id", res.data.user.id);
        localStorage.setItem("authenticated", true);
        setLoggedInUser(res.data.user);
        navigate("/");
      } catch (error) {
        setError(error.response.data.msg);
      }
    }
    return;
  }, [navigate, location.pathname]);
  const login = async (email, password) => {
    try {
      const user = {
        email: email,
        password: password,
      };
      const res = await axios.post(
        `/api/users/login`,

        user
      );

      localStorage.setItem("id", res.data.userFound.id);
      localStorage.setItem("authenticated", true);
      setLoggedInUser(res.data.userFound);
      navigate("/");
    } catch (error) {
      setError(error.response.data.msg);
    }
  };
  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
    window.open("/api/users/logout", "_self");
  };

  const getUser = useCallback(async (userId) => {
    try {
      const res = await axios.get(`/api/users/${userId}`);
      const user = res.data;
      user.friends = user.friends.filter((friend) => friend.status === 3);
      setCurrentUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateProfilePic = async (img) => {
    const newProfilePic = {
      profilePic: `/api/images/${img}`,
    };

    const res = await axios.put(`/api/users/profilePic`, newProfilePic);
    addPicture(img);
    setLoggedInUser(res.data.user);
    getUser(loggedInUser.id);
  };

  const addPicture = async (img) => {
    const picture = {
      previousPictures: `/api/images/${img}`,
    };

    await axios.put(`/api/users/addpicture`, picture);
  };
  const getFriends = useCallback(async () => {
    try {
      const res = await axios.get(`/api/users/friends`);
      const friends = res.data.friends.filter((friend) => friend.status === 3);
      const requests = res.data.friends.filter((friend) => friend.status === 2);

      setFriends(friends);
      setFriendRequests(requests);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getPeopleMayKnow = useCallback(async () => {
    try {
      const res = await axios.get(`/api/users/friends/mayknow`);
      setPeopleMayKnow(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const sendFriendRequest = async (userId) => {
    try {
      await axios.get(`/api/users/friends/sendFriendRequest/${userId}`);
      getFriends();
    } catch (error) {
      console.log(error);
    }
  };
  const addFriendRequest = async (friendId) => {
    try {
      await axios.get(`/api/users/friends/addfriend/${friendId}`);
      getFriends();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFriendRequest = async (friendId) => {
    try {
      await axios.delete(`/api/users/friends/deletefriend/${friendId}`);
      getFriends();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const LogBackIn = async (userId) => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setLoggedInUser({
          id: res.data._id,
          name: res.data.firstName + " " + res.data.lastName,
          profilePic: res.data.profilePic,
        });
      } catch (error) {
        console.log(error);
      }
    };
    facebookLogin();
    if (!localStorage.getItem("authenticated")) {
      navigate("/login");
    } else {
      LogBackIn(localStorage.getItem("id"));
    }
  }, [facebookLogin, navigate]);
  const value = {
    setLoggedInUser,
    loggedInUser,
    setCurrentUser,
    currentUser,
    facebookLogin,
    login,
    logout,
    getUser,
    updateProfilePic,
    addPicture,
    getPeopleMayKnow,
    getFriends,
    sendFriendRequest,
    addFriendRequest,
    deleteFriendRequest,
    peopleMayKnow,
    friends,
    friendRequests,
    error,
    setError,
    registerError,
    setRegisterError,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
