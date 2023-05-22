const mongoose = require("mongoose");

const Cv = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user id not found"],
    },
    name: {
      type: String,
      required: [true, "user name is required"],
    },
    position: {
      type: String,
      required: [true, "Please add a position"],
    },
    email: {
      type: String,
      required: [true, "Please add a description"],
    },
    age: {
      type: Number,
      default: "Empty",
    },
    phone: {
      type: Number,
    },
    about_me: {
      type: String,
      required: [true, "Please add a description"],
    },
    image: {
      type: String,
      required: [true, "Please add an image"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cv", Cv);
