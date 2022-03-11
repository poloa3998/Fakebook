const router = require("express").Router();
const passport = require("passport");
const {
  findOrCreateConversation,
  getConversation,
} = require("../controllers/conversationController");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  findOrCreateConversation
);

router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  getConversation
);
module.exports = router;
