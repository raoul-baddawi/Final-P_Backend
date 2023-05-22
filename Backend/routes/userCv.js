const express = require("express");
const upload = require("../middleware/uploadMiddleware.js");
const router = express.Router();
const {
  getCvs,
  updateCv,
  deleteCv,
  getCv,
} = require("../controllers/cvs-controllers.js");

router.route("/").get(getCvs);
router.route("/:id").get(getCv);
router.route('/:id').patch(upload.single('image'),updateCv)
router.route("/:id").delete(deleteCv);

module.exports = router;
