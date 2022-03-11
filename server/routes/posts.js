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
  getComment,
  addComment,
  editComment,
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
router.get("/:id", getPost);
router.put("/:id", passport.authenticate("jwt", { session: false }), editPost);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);
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

router.get("/currentuser/:userId", getUserPosts);
router.get(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  getComment
);
router.post(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  addComment
);
router.put(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  editComment
);
router.delete(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);
router.post(
  "/comments/:commentId/reply",
  passport.authenticate("jwt", { session: false }),
  addReply
);
router.put(
  "/comments/:commentId/like",
  passport.authenticate("jwt", { session: false }),
  likeComment
);
module.exports = router;
