const asyncHandler = require("express-async-handler");
const cloudinary = require('cloudinary').v2;
const Profile = require("../models/profiles");


// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


// this function get the Profiles
// the route is 
const getProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json(profiles);
});



// this function get a specific Profile
// the route is 
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    user_id: req.params.id,
  });

  if (!profile) {
    return res.status(200).json({ message: "No" });
  }

  const {
    user_id,
    name,
    position,
    website_link,
    description,
    facebook,
    instagram,
    github,
    linkedin,
    user_type,
    image,
  } = profile;

  
  res.status(200).json({
    id: user_id,
    name: name,
    position: position,
    website_link: website_link,
    description: description,
    facebook: facebook,
    instagram: instagram,
    github: github,
    linkedin: linkedin,
    image: image,
    user_type: user_type,
  });
});

// this function Updates the links
// the route is PUT/iframe/link/:id
// const updatedProfile = await Profile.findOne({ user_id: req.params.id });
// if (updatedProfile) {
//   updateProfile.name = name;
//   updateProfile.position = position;
//   updateProfile.website_link = website_link;
//   updateProfile.description = description;
//   updateProfile.facebook = facebook;
//   updateProfile.instagram = instagram;
//   updateProfile.github = github;
//   updateProfile.linkedin = linkedin;
//   updateProfile.image = image;
// }
// else res.status(404).json("something went wrong ");
// updated = await updateProfile.save();
// res.status(201).json(updated);



// this function updates a specific Profile
// the route is 
const updateProfile = asyncHandler(async (req, res) => {
  const {
    name,
    position,
    website_link,
    description,
    facebook,
    instagram,
    github,
    linkedin,
    user_type
  } = req.body;

  const updatedProfile = {}
  

  if (req.files) {
    
    let image = req.files.image[0].path; // get the path of the image from multer
    const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
    updatedProfile.image = uploadedImage.secure_url;
  }
  if (name) {updatedProfile.name = name}
  if (position) {updatedProfile.position = position}
  if (website_link) {updatedProfile.website_link = website_link}
  if (description) {updatedProfile.description = description}
  if (facebook) {updatedProfile.facebook = facebook}
  if (instagram) {updatedProfile.instagram = instagram}
  if (github) {updatedProfile.github = github}
  if (linkedin) {updatedProfile.linkedin = linkedin}
  if (user_type) {updatedProfile.user_type = user_type}
  console.log(updatedProfile)
  const updated = await Profile.findOneAndUpdate({ user_id: req.params.id }, updatedProfile, { new: true });
  res.status(200).json(updated)
});

// this function delete link
// the route is DELETE/iframe/link/:id
const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile) {
    res.status(400);
    throw new Error("mesh mawjoud aslan la nemhi");
  }

  await profile.remove();
  res.status(200).json({ id: req.params.id });
});


const deleteAllProfiles = asyncHandler(async (req, res) => {
  const result = await Profile.deleteMany({});
  res
    .status(200)
    .json({ message: `${result.deletedCount} users have been deleted.` });
});

module.exports = {
  getProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
  deleteAllProfiles
};
