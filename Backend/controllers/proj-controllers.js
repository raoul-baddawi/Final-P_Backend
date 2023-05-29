const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const Project = require("../models/projects");

const createProject = asyncHandler(async (req, res) => {
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
    if (req.file) {
      let image = req.file.path; // get the path of the image from multer
      const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
      imageUrl = uploadedImage.secure_url;
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
    res.status(201).json(project);
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
    technologies,
    desc,
    repository,
    email,
    password, 
    website_link,
  } = req.body;
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404).send("Project not found");
  }
  try {
    if (project) {
      let imageUrl = project.image;
      if (req.file) {
        let image = req.file.path; // get the path of the image from multer
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        imageUrl = uploadedImage.secure_url;
      }
      project.title = title;
      project.subtitle = subtitle;
      project.technologies = technologies;
      project.desc = desc;
      project.repository = repository;
      project.email = email;
      project.password = password;
      project.website_link = website_link;
      project.image = imageUrl;

      let response = await project.save();
      if (response) {
        res.status(201).send(response);
      } else {
        res.status(404).send("something went wrong in the controller");
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
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
