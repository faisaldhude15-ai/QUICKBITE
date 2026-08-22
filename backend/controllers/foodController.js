const mongoose = require("mongoose");
const Food = require("../models/Food");

// =====================================
// Add Food
// POST /api/foods
// =====================================

const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const food = await Food.create({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category: category.trim(),
      image: req.file ? `/uploads/${req.file.filename}` : "",
      isAvailable: true,
    });

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      food,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get All Foods
// GET /api/foods
// =====================================

const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({ isAvailable: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get Single Food
// GET /api/foods/:id
// =====================================

const getFood = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Food ID",
      });
    }

    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Update Food
// PUT /api/foods/:id
// =====================================

const updateFood = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Food ID",
      });
    }

    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    food.name = req.body.name || food.name;
    food.description = req.body.description || food.description;
    food.price = req.body.price
      ? Number(req.body.price)
      : food.price;
    food.category = req.body.category || food.category;

    if (req.file) {
      food.image = `/uploads/${req.file.filename}`;
    }

    if (req.body.isAvailable !== undefined) {
      food.isAvailable = req.body.isAvailable;
    }

    await food.save();

    res.status(200).json({
      success: true,
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Delete Food
// DELETE /api/foods/:id
// =====================================

const deleteFood = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Food ID",
      });
    }

    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    food.isAvailable = false;

    await food.save();

    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addFood,
  getFoods,
  getFood,
  updateFood,
  deleteFood,
};