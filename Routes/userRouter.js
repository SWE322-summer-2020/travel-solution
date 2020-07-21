const express = require("express");
const { signUp } = require("./../Controller/authController");

const router = express.Router();

router
  .route("/sign-up")
  .get()
  .post(signUp);

module.exports = router;
