const mongoose = require("mongoose");
require("dotenv").config();

const mongoDb = process.env.MONGO_DB_URI;

mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on("connected", () => {
  console.log("Database connected");
});
