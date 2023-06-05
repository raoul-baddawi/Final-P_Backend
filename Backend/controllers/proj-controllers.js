const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const Project = require("../models/projects");

const createProject = asyncHandler(async (req, res) => {
  console.log("we are in create")
  const {
    title,
    subtitle,
    desc,
    technologies,
    email,
    password,
    website_link,
    repository,
  } = req.body;

  if (!title || !subtitle || !desc || !technologies || !repository) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }
  try {
    let imageUrl;
    // console.log(req.files)
    if (req.files) {
      let image = req.files.image[0].path; // get the path of the image from multer
      const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
      imageUrl = uploadedImage.secure_url;
      console.log(imageUrl)
    }
    const project = await Project.create({
      title,
      subtitle,
      desc,
      technologies,
      repository,
      email,
      password,
      website_link,
      image: imageUrl,
    });
    res.status(201).send(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
});




const getProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to get project" });
  }
});


const updateProject = asyncHandler(async (req, res) => {
  const {
    title,
    subtitle,
    website_link,
    desc,
    technologies,
    email,
    password,
    repository
  } = req.body;
  console.log("body is ",req.body)
  console.log("image is ", req.files)

  const updatedProject = {}
  

  if (req.files) {
    
    let image = req.files.image[0].path; // get the path of the image from multer
    const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
    updatedProject.image = uploadedImage.secure_url;
  }
  
  if (title) {updatedProject.title = title}
  if (subtitle) {updatedProject.subtitle = subtitle}
  if (website_link) {updatedProject.website_link = website_link}
  if (desc) {updatedProject.desc = desc}
  if (technologies) {updatedProject.technologies = technologies}
  if (email) {updatedProject.email = email}
  if (password) {updatedProject.password = password}
  if (repository) {updatedProject.repository = repository}
  console.log("Updatedddd",updatedProject)
  const updated = await Project.findByIdAndUpdate(req.params.id, updatedProject);
  res.status(200).json(updated)
});

const deleteProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

const getAllProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to get projects" });
  }
});

module.exports = {
  createProject,
  getProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
