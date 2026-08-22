const express = require("express");

const router = express.Router();


// Debug check
console.log("✅ Cart Routes Loaded");


// Controllers

const {
  addToCart,
  getCart,
  removeCart
} = require("../controllers/cartController");


// Middleware

const isLoggedIn = require("../middleware/isLoggedIn");




// ===============================
// Add Food To Cart
// POST /api/cart/add
// ===============================

router.post(
  "/add",
  isLoggedIn,
  addToCart
);




// ===============================
// Get User Cart
// GET /api/cart
// ===============================

router.get(
  "/",
  isLoggedIn,
  getCart
);




// ===============================
// Remove Cart Item
// DELETE /api/cart/:id
// ===============================

router.delete(
  "/:id",
  isLoggedIn,
  removeCart
);



module.exports = router;