const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    img: {
      type: String,
    },
    likes: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", PostSchema);
