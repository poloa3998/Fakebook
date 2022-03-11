const express = require("express");
const http = require("http");
const cookeParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const path = require("path");
require("dotenv").config;

const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  //When connected
  console.log("user Connected");
  io.emit("welcome", "Welcome to the socket tests");
  //Takes userid and socketid from user
  socket.on("addUser", (userId) => {
    console.log(users);
    addUser(userId, socket.id);

    io.emit("getUsers", users);
  });
  //Send and get message
  socket.on("sendMessage", ({ sender, receiverId, text }) => {
    console.log("message sent");
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      sender,
      text,
    });
  });

  //When disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
  });
});

app.use(express.json());
app.use(cookeParser());
app.use(
  session({
    secret: "hey you found the secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/database");
require("./models/usersModel");
require("./models/postsModel");
require("./models/conversationModel");
require("./models/messageModel");
require("./config/passport")(passport);

app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/conversations", require("./routes/conversations"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/images", require("./routes/images"));
server.listen(port, () => {
  console.log(` Listening on port ${port}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));

module.exports = app;
