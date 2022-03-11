const Conversation = require("../models/conversationModel");
const User = require("../models/usersModel");
const mongoose = require("mongoose");
exports.findOrCreateConversation = (req, res) => {
  Conversation.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  })
    .populate({ path: "members", select: "firstName lastName profilePic" })

    .exec(async (error, conversation) => {
      if (error) {
        return res.status(404).json("No user");
      }

      if (conversation) {
        return res.status(200).json(conversation);
      } else {
        Conversation.create(
          {
            members: [
              mongoose.Types.ObjectId(req.body.senderId),
              mongoose.Types.ObjectId(req.body.receiverId),
            ],
          },
          (error, conversation) => {
            if (error) {
              return res.status(500).json(error);
            }
            conversation.populate(
              { path: "members", select: "firstName lastName profilePic" },
              (error, conversation) => {
                if (error) {
                  return res.status(404).json("No user");
                }
                res.status(200).json(conversation);
              }
            );
          }
        );
      }
    });
};

exports.getConversation = (req, res) => {
  Conversation.find({
    members: { $in: [req.params.userId] },
  })
    .populate({ path: "members", select: "firstName lastName profilePic" })
    .exec((err, conversation) => {
      if (err) {
        return res.status(404).json("No user");
      }
      return res.status(200).json(conversation);
    });
};
