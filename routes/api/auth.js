const express = require("express");
const { signIn } = require("../../controller/auth_controller");
const router = express.Router();

router.post("/", signIn);

module.exports = router;
