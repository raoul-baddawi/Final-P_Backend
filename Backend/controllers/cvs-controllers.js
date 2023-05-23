const asyncHandler = require("express-async-handler");
const cloudinary = require('cloudinary').v2;
const Cv = require("../models/cv");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// this function get the links
// the route is GET/iframe/link
const getCvs = asyncHandler(async (req, res) => {
  const cvs = await Cv.find();
  res.status(200).json(cvs);
});

const getCv = asyncHandler(async (req, res) => {
  const {
    user_id,
    name,
    position,
    email,
    age,
    phone,
    about_me,
    image,
    education,
    experience,
  } = await Cv.findOne({
    user_id: req.params.id,
  });
  res.status(200).json({
    id: user_id,
    name: name,
    position: position,
    email: email,
    age: age,
    phone: phone,
    about_me: about_me,
    education: education,
    experience: experience,
    image: image,
  });
});

// this function Updates the links
// the route is PUT/iframe/link/:id
const updateCv = asyncHandler(async (req, res) => {
  const { name, position, email, age, phone, about_me, education, experience } = req.body;

  const updatedCv = {};

  if (req.file) {
    let image = req.file.path; // get the path of the image from multer
    const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
    updatedCv.image = uploadedImage.secure_url;
  }

  if (name) {
    updatedCv.name = name;
  }
  if (position) {
    updatedCv.position = position;
  }
  if (email) {
    updatedCv.email = email;
  }
  if (age) {
    updatedCv.age = age;
  }
  if (phone) {
    updatedCv.phone = phone;
  }
  if (about_me) {
    updatedCv.about_me = about_me;
  }
  if (education) {
    updatedCv.education = education;
  }
  if (experience) {
    updatedCv.experience = experience;
  }

  const updated = await Cv.findOneAndUpdate(
    { user_id: req.params.id },
    updatedCv,
    { new: true }
  );

  res.status(201).json(updated);
});

// this function delete link
// the route is DELETE/iframe/link/:id
const deleteCv = asyncHandler(async (req, res) => {
  const cv = await Cv.findById(req.params.id);

  if (!cv) {
    res.status(400);
    throw new Error("mesh mawjoud aslan la nemhi");
  }

  await cv.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCv,
  getCvs,
  updateCv,
  deleteCv,
};
