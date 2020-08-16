const express = require("express");
const {
  overview,
  signUp,
  registration,
  login,
  forgotPassword,
  resetPassword,
  postStory,
  getPost,
} = require("./../Controllers/viewController");

const router = express.Router();

router.get("", overview);
router.get("/story/:id", getPost);
router.get("/sign-up", signUp);
router.get("/registration/:token", registration);
router.get("/login", login);
router.get("/forgot-password", forgotPassword);
router.get("/reset-password/:token", resetPassword);
router.get("/post-a-story", postStory);

module.exports = router;
