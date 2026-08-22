const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  dashboard,
  getUsers,
  getOrders,
  getFoods,
  deleteOrder,
} = require("../controllers/adminController");

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  dashboard
);

// Users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getUsers
);

// Orders
router.get(
  "/orders",
  authMiddleware,
  adminMiddleware,
  getOrders
);

// Foods
router.get(
  "/foods",
  authMiddleware,
  adminMiddleware,
  getFoods
);

// Delete Order
router.delete(
  "/orders/:id",
  authMiddleware,
  adminMiddleware,
  deleteOrder
);

module.exports = router;