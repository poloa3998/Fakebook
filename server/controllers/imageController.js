const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const path = require("path");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const mongoDB = process.env.MONGO_DB_URI;
const conn = mongoose.createConnection(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

let gfs, gridFSBucket;

conn.once("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: mongoDB,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (error, buf) => {
        if (error) {
          return reject(error);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

exports.upload = multer({ storage });

exports.uploadImage = (req, res) => {
  res.json({ files: req.file });
};

exports.getFiles = (req, res) => {
  gfs.files.find().toArray((error, files) => {
    if (!files || files.length === 0) {
      res.status(404).json("No files found");
    }

    return res.status(200).json(files);
  });
};

exports.getFile = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (error, file) => {
    if (!file || file.length === 0) {
      res.status(404).json("No files found");
    }

    return res.status(200).json(file);
  });
};

exports.getImages = (req, res) => {
  gfs.files.find().toArray((error, files) => {
    if (!files || files.length === 0) {
      res.status(500).json("No files found");
    } else {
      files.map((file) => {
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      return res.status(200).json(files);
    }
  });
};

exports.viewImage = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (error, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json("No files found");
    }

    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      const readstream = gridFSBucket.openDownloadStreamByName(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json("Not an image");
    }
  });
};
