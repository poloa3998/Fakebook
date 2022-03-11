const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    facebookId: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    cover: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    birthday: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    friends: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        status: {
          type: Number,
          enums: [
            0, //'add friend',
            1, //"Sent a friend request",
            2, //'pending friend request',
            3, //'friends'
          ],
        },
      },
    ],
    previousPictures: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
