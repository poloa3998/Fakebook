const router = require("express").Router();
const passport = require("passport");
const {
  createPost,
  getPosts,
  getPost,
  editPost,
  deletePost,
  likePost,
  likeComment,
  addComment,
  addReply,
  getUserPosts,
  getTimeline,
  deleteComment,
} = require("../controllers/postsController");
router.get("/", getPosts);
router.get(
  "/timeline",
  passport.authenticate("jwt", { session: false }),
  getTimeline
);
router.get("/:userId", getUserPosts);
router.get("/:id", getPost);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createPost
);
router.put(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  likePost
);

router.put(
  "/:id/edit",
  passport.authenticate("jwt", { session: false }),
  editPost
);

router.delete(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  deletePost
);
router.delete(
  "/comments/:commentId/delete",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);
router.post(
  "/:id/comments/create",
  passport.authenticate("jwt", { session: false }),
  addComment
);
router.post(
  "/comments/:commentId/create",
  passport.authenticate("jwt", { session: false }),
  addReply
);
router.put(
  "/comments/:commentId/like",
  passport.authenticate("jwt", { session: false }),
  likeComment
);
module.exports = router;
