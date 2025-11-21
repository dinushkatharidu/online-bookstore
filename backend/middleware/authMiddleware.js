const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ============================================
// 1. PROTECT MIDDLEWARE
// ============================================
exports.protect = async (req, res, next) => {
  let token;

  // get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    try {
      // extract token
      token = req.headers.authorization.split("")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from database
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({
          sucess: false,
          message: "User not found",
        });
      }

      // attach user to request obj
      req.user = user;

      // continue
      next();
    } catch (error) {
      console.error(error);

      // Specific Error Handling
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired, please login again",
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Not authorized, token failed",
        });
      }
    }
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

// ============================================
// 2. ADMIN MIDDLEWARE (The VIP Check)
// ============================================
exports.admin = (req, res, next) => {
  // Check if user exists (Ensure protect ran first)
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }

  //  Check role
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only",
    });
  }

  // User is admin, continue
  next();
};
