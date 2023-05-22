const express = require("express");
const router = express.Router();
const {
  getEducations,
  createEducation,
  getEducation,
  updateEducation,
  deleteEducation,
  getAllEducations,
} = require("../controllers/educ-controllers");

router.route("/").get(getAllEducations);
router.route("/:id").get(getEducations);
router.route("/:id").post(createEducation);
router.route("/:id").patch(updateEducation);
router.route("/:id").delete(deleteEducation);
// router.route("/:id").get(getEducation);

module.exports = router;