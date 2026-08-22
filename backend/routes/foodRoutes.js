const express = require("express");
const router = express.Router();

const {
  addFood,
  getFoods,
  getFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../config/multer");

// =====================
// Public Routes
// =====================

router.get("/", getFoods);
router.get("/:id", getFood);

// =====================
// Admin Routes
// =====================

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addFood
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateFood
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteFood
);

module.exports = router;