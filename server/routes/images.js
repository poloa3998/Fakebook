const router = require("express").Router();
const passport = require("passport");
const {
  uploadImage,
  getFiles,
  getFile,
  getImages,
  viewImage,
  upload,
} = require("../controllers/imageController");
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  uploadImage
);

router.get("/", passport.authenticate("jwt", { session: false }), getImages);
router.get(
  "/files",
  passport.authenticate("jwt", { session: false }),
  getFiles
);

router.get(
  "/files/:filename",
  passport.authenticate("jwt", { session: false }),
  getFile
);

router.get("/:filename", viewImage);
module.exports = router;
