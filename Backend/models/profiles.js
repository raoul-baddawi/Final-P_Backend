const mongoose = require("mongoose");

const Profile = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user_type: {
      type: String,
      enum: ['dev', 'mentor'],
      default: 'dev',
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    position: {
      type: String,
      required: [true, "Please add a position"],
    },
    website_link: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", Profile);
