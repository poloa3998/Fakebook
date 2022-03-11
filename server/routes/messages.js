const router = require("express").Router();
const passport = require("passport");
const Message = require("../models/messageModel");
const {
  newMessage,
  getMessages,
} = require("../controllers/messagesController");
router.post("/", passport.authenticate("jwt", { session: false }), newMessage);
router.get(
  "/:conversationId",
  passport.authenticate("jwt", { session: false }),
  getMessages
);
module.exports = router;
