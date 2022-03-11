const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  User.findById(req.params.id, { email: 0, password: 0 })
    .populate({ path: "friends", populate: { path: "user" } })
    .exec((error, user) => {
      if (error) {
        return res.status(500).json(error.message);
      }
      return res.status(200).json(user);
    });
};
exports.facebookLogin = async (req, res) => {
  if (req.user) {
    let token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res
      .cookie("jwt", token, { httpOnly: true, secure: true })
      .status(200)
      .json({
        success: true,
        message: "FB Auth successful",
        user: {
          id: req.user._id,
          name: req.user.firstName + " " + req.user.lastName,
          profilePic: req.user.profilePic,
        },
      });
  } else {
    return res
      .status(500)
      .json({ success: false, msg: "Could not authenticate" });
  }
};
exports.register = async (req, res) => {
  const { firstName, lastName, email, password, birthday, gender } = req.body;
  let randomColor = "";
  const chars = "abcdef0123456789";
  for (let i = 0; i < 6; i++) {
    randomColor += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const user = await User.create({
      profilePic: `https://avatars.dicebear.com/api/micah/${firstName}.svg?background=%23${randomColor}`,
      firstName,
      lastName,
      email,
      password: hashedPass,
      birthday,
      gender,
      timestamp: Date.now(),
    });
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res
      .cookie("jwt", token, { httpOnly: true, secure: true })
      .status(201)
      .json({
        success: true,
        user: {
          id: user._id,
          name: user.firstName + " " + user.lastName,
          profilePic: user.profilePic,
        },
      });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let userFound = await User.findOne({ email: email });
    if (!userFound) {
      res
        .status(404)
        .json({ success: false, msg: "Could not find user with that email" });
    }
    bcrypt.compare(password, userFound.password, (error, valid) => {
      if (valid) {
        let token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

        return res
          .cookie("jwt", token, { httpOnly: true, secure: true })
          .status(200)
          .json({
            success: true,
            userFound: {
              id: userFound._id,
              name: userFound.firstName + " " + userFound.lastName,
              profilePic: userFound.profilePic,
            },

            msg: "You are logged in",
          });
      } else {
        return res
          .status(404)
          .json({ success: "false", msg: "Incorrect Password" });
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

exports.updateProfilePic = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePic: req.body.profilePic,
      },
      { new: true }
    );
    res.status(200).json({
      user: {
        id: user._id,
        name: user.firstName + " " + user.lastName,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addPicture = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          previousPictures: {
            $each: [req.body.previousPictures],
            $position: 0,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({
      user: {
        id: user._id,
        name: user.firstName + " " + user.lastName,
        profilePic: user.profilePic,
        previousPictures: user.previousPictures,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getFriends = async (req, res) => {
  User.findById(req.user._id)
    .populate({ path: "friends", populate: { path: "user" } })
    .exec((error, user) => {
      if (error) {
        return res.status(500).json(error.message);
      }

      return res.status(200).json(user);
    });
};
exports.getPeopleMayKnow = async (req, res) => {
  User.find(
    {
      _id: { $ne: req.user._id },
      "friends.user": { $ne: req.user._id },
    },
    { email: 0, password: 0 }
  ).exec((error, users) => {
    if (error) {
      return res.status(500).json(error);
    } else {
      res.status(200).json(users);
    }
  });
};
exports.sendFriendRequest = async (req, res) => {
  //Send the friend request to recipient
  if (req.user_id !== req.params.id) {
    try {
      //Update the list of friends for both users
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { friends: { user: req.params.id, status: 1 } } }
      );
      await User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { friends: { user: req.user._id, status: 2 } } }
      );
      res.status(200).json("Friend Request Sent");
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

exports.addRequest = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id, "friends.user": req.params.id },
      { $set: { "friends.$.status": 3 } }
    );
    await User.findOneAndUpdate(
      { _id: req.params.id, "friends.user": req.user._id },
      { $set: { "friends.$.status": 3 } }
    );
    res.status(200).json("Friend Added");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.deleteFriend = async (req, res) => {
  console.log(req.user._id);
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { friends: { user: req.params.id } } }
    );
    await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: { user: req.user._id } } }
    );
    return res.status(200).json("Friend Deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};
