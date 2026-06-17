const express = require("express");

const {
  createAttendance,
  logoutAttendance,
  getAttendance,
  getTodayAttendance,
  getEmployeeAttendance,
} = require("../controllers/attendanceController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

const router = express.Router();

// Create Attendance
router.post(
  "/",
  protect,
  createAttendance
);

// Logout Attendance
router.put(
  "/logout",
  protect,
  logoutAttendance
);

// Get All Attendance
router.get(
  "/",
  protect,
  authorize(
    "DEVELOPER",
    "AGENCY_OWNER",
    "MANAGER"
  ),
  getAttendance
);

// Today's Attendance
router.get(
  "/today",
  protect,
  authorize(
    "DEVELOPER",
    "AGENCY_OWNER",
    "MANAGER"
  ),
  getTodayAttendance
);

// Employee Attendance
router.get(
  "/employee/:employeeId",
  protect,
  getEmployeeAttendance
);

module.exports = router;