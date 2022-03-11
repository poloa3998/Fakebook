import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/auth";
import ProfileHeader from "../components/ProfileComponents/ProfileHeader";
import ProfileFeed from "../components/ProfileComponents/ProfileFeed";
import Photos from "../components/ProfileComponents/Photos";
import ProfileFriends from "../components/ProfileComponents/ProfileFriends";
import { TailSpin } from "react-loader-spinner";
function Profile({ setMessagesActive }) {
  const { userId } = useParams();
  const { currentUser, getUser, setCurrentUser, friends } =
    useContext(AuthContext);

  const [isFriend, setIsFriend] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUser(userId);
    if (friends.some((friend) => friend.user._id === userId)) {
      setIsFriend(true);
    }
    if (userId === localStorage.getItem("id")) {
      setIsUser(true);
    }
    return () => {
      setCurrentUser(null);
      setIsFriend(false);
      setIsUser(false);
    };
  }, [userId, friends, getUser, setCurrentUser]);
  return (
    <div>
      <div className=" h-screen bg-gray-100 ">
        {currentUser === null ? (
          <div className="fixed h-screen w-screen flex justify-center items-center">
            <TailSpin color="#3b82f6" width="150" height="150" />
          </div>
        ) : (
          <>
            <ProfileHeader
              id={currentUser._id}
              profilePic={currentUser.profilePic}
              name={`${currentUser.firstName} ${currentUser.lastName}`}
              friends={currentUser.friends.filter(
                (friend) => friend.status === 3
              )}
              isFriend={isFriend}
              isUser={isUser}
              setMessagesActive={setMessagesActive}
            />
            <div className="flex flex-col items-center bg-gray-100 justify-center lg:flex-row lg:items-start lg:space-x-10">
              <div className=" flex flex-col space-y-4 py-6 px-4 ">
                {currentUser.previousPictures.length === 0 ? null : (
                  <Photos id={userId} photos={currentUser.previousPictures} />
                )}
                {currentUser.friends.length === 0 ? null : (
                  <ProfileFriends
                    id={userId}
                    friends={currentUser.friends.filter(
                      (friend) => friend.status === 3
                    )}
                  />
                )}
              </div>

              <ProfileFeed id={userId} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
