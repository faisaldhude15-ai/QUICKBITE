const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");


// ======================================
// Place Order
// POST /api/orders/place
// ======================================

router.post(
  "/place",
  authMiddleware,
  placeOrder
);


// ======================================
// Get My Orders
// GET /api/orders/my
// ======================================

router.get(
  "/my",
  authMiddleware,
  getMyOrders
);


// ======================================
// Get All Orders (Admin)
// GET /api/orders/all
// ======================================

router.get(
  "/all",
  authMiddleware,
  getAllOrders
);


// ======================================
// Get Single Order
// GET /api/orders/:id
// ======================================

router.get(
  "/:id",
  authMiddleware,
  getOrderById
);


// ======================================
// Update Order Status (Admin)
// PUT /api/orders/status/:id
// ======================================

router.put(
  "/status/:id",
  authMiddleware,
  updateOrderStatus
);


// ======================================
// Cancel Order
// PUT /api/orders/cancel/:id
// ======================================

router.put(
  "/cancel/:id",
  authMiddleware,
  cancelOrder
);


module.exports = router;