const express = require("express");
const {
  getCurrentUser,
  getAllUsers,
  signUp,
} = require("../../controller/user_controller");
const { authMiddleware } = require("../../middleware/auth_middleware");
const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);
router.get("/", getAllUsers);
router.post("/", signUp);

module.exports = router;
