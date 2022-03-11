const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
exports.newMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    Conversation.findByIdAndUpdate(
      req.body.conversationId,
      {
        $push: {
          messages: {
            $each: [savedMessage],
            $position: 0,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
