const express = require("express");
const {
  getAllPost,
  getSinglePost,
  addPost,
} = require("../../controller/post_controller");
const { authMiddleware } = require("../../middleware/auth_middleware");
const router = express.Router();

router.get("/", getAllPost);
router.get("/:id", getSinglePost);
router.post("/", authMiddleware, addPost);

module.exports = router;
