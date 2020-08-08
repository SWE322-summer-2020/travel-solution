const express = require("express");
const { postAStory } = require("./../Controllers/storyController");

const router = express.Router();

router.post("/", postAStory);

module.exports = router;
