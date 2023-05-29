const asyncHandler = require("express-async-handler");
const Education = require("../models/education");




const createEducation = asyncHandler(async (req, res) => {
  const { title, start, end, description } = req.body;

  if ( !title || !start || !end || !description) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  else{
    const education = await Education.create({
      user_id: req.params.id,
      title,
      start,
      end,
      description,
    });
    res.status(200).json(education)
  }
});



// this function get the Educations by the givven id
// the route is GET/iframe/link
const getAllEducations = asyncHandler(async (req, res) => {
  const educations = await Education.find();
  res.status(200).json(educations);
});



// this function get the Educations by the givven id
// the route is GET/iframe/link
const getEducations = asyncHandler(async (req, res) => {
  const educations = await Education.find({user_id: req.params.id});
  res.status(200).json(educations);
});

// const getEducation = asyncHandler(async (req, res) => {
//   const {
//     user_id,
//     title,
//     start,
//     end,
//     description,
//   } = await Education.findOne({
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

const updateEducation = asyncHandler(async (req, res) => {
  const {
    title,
    start,
    end,
    description,
  } = req.body;

  const updatedEducation = {}
  
  if (title) {updatedEducation.title = title}
  if (start) {updatedEducation.start = start}
  if (end) {updatedEducation.end = end}
  if (description) {updatedEducation.description = description}
  const updated = await Education.findByIdAndUpdate( req.params.id, updatedEducation, { new: true });
  res.status(200).json(updated)
});

// this function delete link
// the route is DELETE/iframe/link/:id
const deleteEducation = asyncHandler(async (req, res) => {
  const education = await Education.findById(req.params.id);

  if (!education) {
    res.status(400);
    throw new Error("mesh mawjoud aslan la nemhi");
  }

  await education.remove();
  res.status(200).json({ id: req.params.id });
}); 

module.exports = { 
  createEducation,
  // getEducation, 
  getEducations,
  updateEducation,
  deleteEducation,
  getAllEducations,
};