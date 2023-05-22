const asyncHandler = require("express-async-handler");
const Experience = require("../models/experience");


const createExperience = asyncHandler(async (req, res) => {
  const { title, start, end, description } = req.body;

  if ( !title || !start || !end || !description) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  else{
    const experience = await Experience.create({
      user_id: req.params.id,
      title,
      start,
      end,
      description,
    });
    res.status(200).json(experience)
  }
});


// this function get the Educations
// the route is GET/iframe/link
const getAllExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find();
  res.status(200).json(experiences);
});

// this function get the Educations
// the route is GET/iframe/link
const getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find({user_id: req.params.id});
  res.status(200).json(experiences);
});

// const getExperience = asyncHandler(async (req, res) => {
//   const {
//     user_id,
//     title,
//     start,
//     end,
//     description,
//   } = await Experience.findOne({
//     user_id: req.params.id,
//   });
//   res.status(200).json({
//     id: user_id,
//     title: title,
//     start: start,
//     end: end,
//     description: description,
//   });
// });

const updateExperience = asyncHandler(async (req, res) => {
  const {
    title,
    start,
    end,
    description,
  } = req.body;

  const updatedExperience = {}
  
  if (title) {updatedExperience.title = title}
  if (start) {updatedExperience.start = start}
  if (end) {updatedExperience.end = end}
  if (description) {updatedExperience.description = description}
  const updated = await Experience.findByIdAndUpdate(req.params.id, updatedExperience, { new: true });
  res.status(200).json(updated)
});

// this function delete link
// the route is DELETE/iframe/link/:id
const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    res.status(400);
    throw new Error("mesh mawjoud aslan la nemhi");
  }

  await experience.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  // getExperience,
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
  getAllExperiences,
};