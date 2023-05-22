const mongoose = require("mongoose");

const Experience = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, "user id not found"],
    },
    title: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Experience", Experience);
