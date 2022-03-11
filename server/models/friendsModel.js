const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: Number,
      enums: [
        0, //'add friend',
        1, //'Sent a friend request to user',
        2, //'Friend request pending',
        3, //'friends'
      ],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("friends", FriendSchema);
