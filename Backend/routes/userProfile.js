const express = require("express");
const upload = require("../middleware/uploadMiddleware.js");
const router = express.Router();
const {
  getProfiles,
  updateProfile,
  deleteProfile,
  getProfile,
} = require("../controllers/profiles-controllers.js");

router.route("/").get(getProfiles);
router.route("/:id").get(getProfile);
router.route('/:id').patch(upload.single('image'),updateProfile)
router.route("/:id").delete(deleteProfile);

module.exports = router;