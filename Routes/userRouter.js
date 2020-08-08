const express = require("express");
const {
  signUp,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
} = require("./../Controllers/authController");

const router = express.Router();

router.post("/sign-up", verifyEmail);
router.post("/sign-up/:token", signUp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
