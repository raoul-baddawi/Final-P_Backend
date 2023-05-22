const express = require("express");
const router = express.Router();
const {
  createExperience,
  getExperiences,
  getExperience,
  updateExperience,
  deleteExperience,
  getAllExperiences,
} = require("../controllers/exp-controllers");

router.route("/").get(getAllExperiences);
router.route("/:id").get(getExperiences);
router.route("/:id").post(createExperience);
router.route("/:id").patch(updateExperience);
router.route("/:id").delete(deleteExperience);
// router.route("/:id").get(getExperience);

module.exports = router;