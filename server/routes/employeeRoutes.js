const express = require("express");

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
} = require("../controllers/employeeController");

const { protect } = require("../middleware/authMiddleware");

const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("DEVELOPER", "AGENCY_OWNER"),
  createEmployee
);

router.get(
  "/",
  protect,
  getEmployees
);

router.get(
  "/:id",
  protect,
  getEmployeeById
);

module.exports = router;