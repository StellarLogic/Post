const express = require("express");
const router = express.Router();
const {
  myProfile,
  addProfile,
  updateProfile,
} = require("../../controller/profile_controller");
const { authMiddleware } = require("../../middleware/auth_middleware");
const upload = require("../../middleware/imageUpload");

router.get("/", authMiddleware, myProfile);
router.post("/", authMiddleware, upload.single("image"), addProfile);
router.put("/", authMiddleware, upload.single("image"), updateProfile);

module.exports = router;
