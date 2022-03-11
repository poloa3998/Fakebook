import React from "react";
import { Link } from "react-router-dom";
function ProfileFriends({ id, photos }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md max-w-md">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-semibold"> Photos </p>
            <p>
              {photos.length} {photos.length === 1 ? "Photo" : "Photos"}{" "}
            </p>
          </div>
          {photos.length > 9 ? (
            <Link to={`/${id}/photos`}>
              <p className="cursor-pointer text-blue-500 hover:bg-gray-100 p-2">
                See all photos
              </p>
            </Link>
          ) : null}
        </div>
        <div className="grid grid-cols-3 gap-3  ">
          {photos.length > 9
            ? photos.slice(0, 9).map((photo) => {
                return (
                  <div key={photo}>
                    <img src={photo} className="h-32 w-32" alt="images" />
                  </div>
                );
              })
            : photos.map((photo) => {
                return (
                  <div key={photo}>
                    <img src={photo} className="h-32 w-32" alt="images" />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default ProfileFriends;
