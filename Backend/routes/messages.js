// const Conversation = require("../models/Conversation");
const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMsgsOfConv,
} = require("../controllers/msgs-controllers");

router.route("/").post(createMessage);
router.route("/:conversationId").get(getMsgsOfConv);

module.exports = router;