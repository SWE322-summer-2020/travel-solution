const express = require("express");
const {
  overview,
  signUp,
  registration,
  login,
  forgotPassword,
  resetPassword,
} = require("./../Controllers/viewController");

const router = express.Router();

router.get("", overview);
router.get("/sign-up", signUp);
router.get("/registration/:token", registration);
router.get("/login", login);
router.get("/forgot-password", forgotPassword);
router.get("/reset-password/:token", resetPassword);

module.exports = router;
