const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  getUser,
  getUsers,
  deleteAllUsers,
  registerAdmin,
  deleteAdmin,
  getNo,
  updateUserRole,
} = require("../controllers/users-controllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/auth/register").post(registerUser)
router.route("/auth/login").post(loginUser)

router.get("/users/getall", getUsers);
router.get("/users", getNo);
router.get("/users/:id", getUser);
router.delete("/delete/all", protect, deleteAllUsers);
router.post("/admin", registerAdmin);
router.delete("/admin/:id", deleteAdmin);
router.delete("/delete/:id", deleteUser);
router.patch("/user/:id", updateUserRole);

module.exports = router;
