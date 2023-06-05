const express = require("express");
const upload = require("../middleware/uploadMiddleware.js");
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
  getProfiles,
  updateProfile,
  deleteProfile,
  getProfile,
  deleteAllProfiles
} = require("../controllers/profiles-controllers.js");

router.route("/").get(getProfiles);
router.route("/:id").get(getProfile);
router.route('/:id').patch(Uploads.fields([{name:'image',maxCount:1}]),updateProfile)
router.route("/:id").delete(deleteProfile);
router.route("/").delete(deleteAllProfiles);

module.exports = router;