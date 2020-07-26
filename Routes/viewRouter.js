const express = require("express");
const {
  overview,
  signUp,
  registration,
} = require("./../Controllers/viewController");

const router = express.Router();

router.get("", overview);
router.get("/sign-up", signUp);
router.get("/registration/:token", registration);

module.exports = router;
