const express = require("express");
const { signUp, verifyEmail } = require("./../Controllers/authController");

const router = express.Router();

router.post("/sign-up", verifyEmail);
router.post("/sign-up/:token", signUp);

module.exports = router;
