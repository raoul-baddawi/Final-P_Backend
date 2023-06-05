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
  getCvs,
  updateCv,
  deleteCv,
  getCv,
  deleteAllCvs,
} = require("../controllers/cvs-controllers.js");

router.route("/").get(getCvs);
router.route("/:id").get(getCv);
router.route('/:id').patch(Uploads.fields([{name:'image',maxCount:1}]),updateCv)
router.route("/:id").delete(deleteCv);
router.route("/").delete(deleteAllCvs);

module.exports = router;
