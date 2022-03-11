import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/auth";

function AllPhotos() {
  const { userId } = useParams();
  const { currentUser, getUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    getUser(userId);
    return () => {
      setCurrentUser(null);
    };
  }, [userId, getUser, setCurrentUser]);
  return (
    <div className="h-screen w-screen bg-gray-100 p-5">
      <p className="text-2xl font-semibold mb-4"> Photos </p>

      <div className="grid grid-cols-auto-fill grid-rows-auto-fill gap-5 ">
        {currentUser?.previousPictures.map((picture) => {
          return (
            <div
              className="bg-white p-3 rounded-md shadow-md flex items-center space-x-2 cursor-pointer"
              key={picture}
            >
              <img src={picture} alt="user" className="w-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllPhotos;
