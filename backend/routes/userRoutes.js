const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  register,
  login,
} = require("../controllers/authController");

const {
  getProfile,
} = require("../controllers/userController");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

module.exports = router;