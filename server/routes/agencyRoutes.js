const express = require("express");

const {
  createAgency,
  getAgencies,
} = require(
  "../controllers/agencyController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  authorize,
} = require(
  "../middleware/roleMiddleware"
);

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("DEVELOPER"),
  createAgency
);

router.get(
  "/",
  protect,
  authorize("DEVELOPER"),
  getAgencies
);

module.exports = router;