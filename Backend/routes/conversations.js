// const Conversation = require("../models/Conversation");
const express = require("express");
const router = express.Router();
const {
  createConversation,
  getConv,
  getConvOfTwo,
} = require("../controllers/conv-controllers");

router.route("/").post(createConversation);
router.route("/:userId").get(getConv);
router.route("/find/:firstUserId/:secondUserId").get(getConvOfTwo);

module.exports = router;