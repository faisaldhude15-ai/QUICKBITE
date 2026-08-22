const express = require("express");

const router = express.Router();

const {
  getCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Get All Categories
router.get("/", getCategories);

// Add Category
router.post("/", addCategory);

// Delete Category
router.delete("/:id", deleteCategory);

module.exports = router;