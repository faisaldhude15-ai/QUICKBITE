// ======================================
// Admin Middleware
// Only Admin Can Access
// ======================================

const adminMiddleware = (req, res, next) => {
  try {

    // Check User Exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Check Admin Role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    // Continue
    next();

  } catch (error) {

    console.log("ADMIN MIDDLEWARE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

module.exports = adminMiddleware;