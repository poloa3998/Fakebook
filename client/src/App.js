import "./App.css";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/home";
import Nav from "./components/NavComponents/Nav";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Messages from "./components/MessageComponents/Messages";
import { AuthProvider } from "./context/auth";
import { PostProvider } from "./context/posts";

import { MessageProvider } from "./context/Messaging";
import { useState } from "react";
import AllFriends from "./pages/AllFriends";
import AllPhotos from "./pages/AllPhotos";

function App() {
  const [messageActive, setMessagesActive] = useState(false);
  const NavBarActive = () => {
    const location = useLocation();
    return location.pathname === "/login" ? null : (
      <Nav setMessagesActive={setMessagesActive} />
    );
  };

  return (
    <HashRouter basename="/">
      <AuthProvider>
        <MessageProvider>
          <PostProvider>
            <NavBarActive />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={<Home setMessagesActive={setMessagesActive} />}
              />
              <Route path="/friends" element={<Friends />} />
              <Route
                path="/:userId"
                element={<Profile setMessagesActive={setMessagesActive} />}
              />
              <Route path="/:userId/friends" element={<AllFriends />} />
              <Route path="/:userId/photos" element={<AllPhotos />} />
            </Routes>
            <Messages
              setMessagesActive={setMessagesActive}
              messageActive={messageActive}
            />
          </PostProvider>
        </MessageProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
