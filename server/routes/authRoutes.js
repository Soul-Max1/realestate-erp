const express = require("express");

const {
  loginUser,
  getProfile,
  testDeveloperRoute,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

const router = express.Router();

// Public Route
router.post("/login", loginUser);

// Protected Routes
router.get("/profile", protect, getProfile);

router.get(
  "/developer-test",
  protect,
  authorize("DEVELOPER"),
  testDeveloperRoute
);

module.exports = router;