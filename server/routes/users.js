const router = require("express").Router();
const passport = require("passport");
const {
  getUser,
  facebookLogin,
  register,
  login,
  updateProfilePic,
  addPicture,
  getPeopleMayKnow,
  getFriends,
  sendFriendRequest,
  deleteFriend,
  addRequest,
} = require("../controllers/usersController");
router.post("/login", login);

router.get("/logout", (req, res) => {
  req.logout();
  console.log(req.user);
  if (req.cookies["jwt"]) {
    res.clearCookie("jwt");
  }
  res.redirect(`${process.env.CLIENT_URL}/#/login`);
});
router.post("/register", register);

// Test route for Authorization
router.get(
  "/currentUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

router.get("/auth/facebook/success", facebookLogin);
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "user_friends", "user_photos", "user_posts"],
  })
);
router.put(
  "/profilePic",
  passport.authenticate("jwt", { session: false }),
  updateProfilePic
);
router.put(
  "/addpicture",
  passport.authenticate("jwt", { session: false }),
  addPicture
);
router.get(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  getFriends
);
router.get("/:id", getUser);
router.get(
  "/friends/mayknow",
  passport.authenticate("jwt", { session: false }),
  getPeopleMayKnow
);
router.get(
  "/friends/sendFriendRequest/:id",
  passport.authenticate("jwt", { session: false }),
  sendFriendRequest
);
router.get(
  "/friends/addfriend/:id",
  passport.authenticate("jwt", { session: false }),
  addRequest
);
router.delete(
  "/friends/deletefriend/:id",
  passport.authenticate("jwt", { session: false }),
  deleteFriend
);
router.get(
  "/auth/facebook/fakebook",
  passport.authenticate("facebook", {
    successRedirect: `${process.env.CLIENT_URL}/#/`,
    failureRedirect: `${process.env.CLIENT_URL}/#/login`,
  })
);

router.get("/:id/friends", getFriends);
module.exports = router;
