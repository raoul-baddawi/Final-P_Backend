const express = require('express');
const router = express.Router();
const multer=require('multer')
const storage=multer.diskStorage({})
const fileFilter=(req,file,cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null,true)
  }else{
    cb("invalid image file",false)
  }
}
var Uploads=multer({storage,fileFilter})
const {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getAllProjects,
} = require('../controllers/proj-controllers');

router.route('/').post(Uploads.fields([{name:'image',maxCount:1}]),createProject).get(getAllProjects);
router.route('/:id').patch(Uploads.fields([{name:'image',maxCount:1}]),updateProject)
router.route('/:id').get(getProject).delete(deleteProject);

module.exports = router;
