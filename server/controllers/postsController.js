const Post = require("../models/postsModel");
const Comment = require("../models/commentsModel");
const User = require("../models/usersModel");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
exports.getPosts = (req, res) => {
  Post.find()
    .sort([["createdAt", "descending"]])
    .populate({ path: "author", select: "firstName lastName profilePic" })
    .populate({
      path: "comments",
      populate: [
        {
          path: "user",
          select: "firstName lastName profilePic",
        },
        {
          path: "replies",
          populate: { path: "user", select: "firstName lastName profilePic" },
        },
      ],
    })
    .exec((err, posts) => {
      if (err) {
        return res.status(404).json("No author");
      }
      return res.status(200).json(posts);
    });
};

exports.getPost = (req, res) => {
  Post.findById(req.params.id)
    .populate({ path: "author", select: "firstName lastName profilePic" })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "firstName lastName profilePic",
      },
    })
    .exec((error, post) => {
      if (error) {
        res.json(error);
      }
      res.status(200).json(post);
    });
};
exports.getUserPosts = async (req, res) => {
  Post.find({ author: req.params.userId })
    .sort([["createdAt", "descending"]])
    .populate({ path: "author", select: "firstName lastName profilePic" })
    .populate({
      path: "comments",
      populate: [
        {
          path: "user",
          select: "firstName lastName profilePic",
        },
        {
          path: "replies",
          populate: { path: "user", select: "firstName lastName profilePic" },
        },
      ],
    })
    .exec((err, posts) => {
      if (err) {
        return res.status(404).json("No author");
      }
      return res.status(200).json(posts);
    });
};
exports.getTimeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const userPosts = await Post.find({ author: req.user._id })
      .sort([["createdAt", "descending"]])
      .populate({ path: "author", select: "firstName lastName profilePic" })
      .populate({
        path: "comments",
        populate: [
          {
            path: "user",
            select: "firstName lastName profilePic",
          },
          {
            path: "replies",
            populate: { path: "user", select: "firstName lastName profilePic" },
          },
        ],
      });

    const friendPosts = await Promise.all(
      currentUser.friends
        .filter((friend) => friend.status === 3)
        .map((friend) => {
          return Post.find({ author: friend.user })
            .sort([["createdAt", "descending"]])
            .populate({
              path: "author",
              select: "firstName lastName profilePic",
            })
            .populate({
              path: "comments",
              populate: [
                {
                  path: "user",
                  select: "firstName lastName profilePic",
                },
                {
                  path: "replies",
                  populate: {
                    path: "user",
                    select: "firstName lastName profilePic",
                  },
                },
              ],
            });
        })
    );
    const timeline = userPosts.concat(...friendPosts);
    shuffle(timeline);
    return res.json(timeline);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
exports.createPost = (req, res) => {
  const { content, img } = req.body;
  Post.create(
    {
      content: !content ? " " : content,
      author: req.user._id,
      img: !img ? "" : img,
    },
    (error, post) => {
      if (error) {
        return res.status(500).json(error);
      }
      post.populate(
        { path: "author", select: "firstName lastName profilePic" },
        (error, newPost) => {
          if (error) {
            return res.json("Could not find author");
          }
          return res.status(201).json(newPost);
        }
      );
    }
  );
};
exports.editPost = (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      imgUrl: req.body.imgUrl,
    }
  )
    .then(() => {
      return res.status(200).json({ msg: "Successfully updated" });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};
exports.deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      } else {
        return res.status(200).json({ msg: "Post successfully deleted" });
      }
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.user_id)) {
      await post.updateOne(
        { $push: { likes: req.body.user_id } },
        { new: true }
      );
      return res.status(200).json("Post liked");
    } else {
      await post.updateOne(
        { $pull: { likes: req.body.user_id } },
        { new: true }
      );
      return res.status(200).json("Post has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment.likes.includes(req.body.user_id)) {
      await comment.updateOne(
        { $push: { likes: req.body.user_id } },
        { new: true }
      );
      return res.status(200).json("Comment liked");
    } else {
      await comment.updateOne(
        { $pull: { likes: req.body.user_id } },
        { new: true }
      );
      return res.status(200).json("Comment has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addComment = async (req, res) => {
  const comment = new Comment({
    user: req.user._id,
    content: req.body.content,
    timestamp: Date.now(),
  });
  await comment.save();
  Post.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { comments: comment } },
    { new: true }
  )
    .populate({
      path: "comments",
      populate: [
        {
          path: "user",
          select: "firstName lastName profilePic",
        },
        {
          path: "replies",
          populate: { path: "user", select: "firstName lastName profilePic" },
        },
      ],
    })
    .exec((error, post) => {
      if (error) {
        return res.status(500).json(error.message);
      }
      return res.status(200).json(post.comments);
    });
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    return res.status(200).json("Comment successfully deleted");
  } catch (error) {
    return res.status(500).json("Could not find comment");
  }
};

exports.addReply = async (req, res) => {
  const comment = new Comment({
    user: req.user._id,
    content: req.body.content,
    timestamp: Date.now(),
  });
  await comment.save();
  Comment.findOneAndUpdate(
    { _id: req.params.commentId },
    { $push: { replies: comment } },
    { new: true }
  )
    .populate({
      path: "replies",
      populate: {
        path: "user",
        select: "firstName lastName profilePic",
      },
    })
    .exec((error, comment) => {
      if (error) {
        return res.status(500).json(error.message);
      }
      return res.status(200).json(comment.replies);
    });
};
