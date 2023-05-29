const express = require('express');
const upload = require("../middleware/uploadMiddleware.js");
const router = express.Router();

const {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getAllProjects,
} = require('../controllers/proj-controllers');

router.route('/').post(upload.single('image'),createProject).get(getAllProjects);
router.route('/:id').get(getProject).put(upload.single('image'),updateProject).delete(deleteProject);

module.exports = router;
