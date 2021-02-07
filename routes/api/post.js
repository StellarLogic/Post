const express = require("express");
const {
  getAllPost,
  getSinglePost,
  addPost,
} = require("../../controller/post_controller");
const upload = require("../../middleware/imageUpload");
const { authMiddleware } = require("../../middleware/auth_middleware");
const router = express.Router();

router.get("/", getAllPost);
router.get("/:id", getSinglePost);
router.post("/", upload.single("image"), authMiddleware, addPost);

module.exports = router;
