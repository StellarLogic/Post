const express = require("express");
const router = express.Router();

router.use("/auth", require("./api/auth"));
router.use("/users", require("./api/user"));
router.use("/profile", require("./api/profile"));
router.use("/posts", require("./api/post"));
router.get("*", function (req, res) {
  res.send("what???", 404);
});

module.exports = router;
