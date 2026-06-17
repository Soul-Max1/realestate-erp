const express = require("express");

const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorize(
    "DEVELOPER",
    "AGENCY_OWNER",
    "MANAGER"
  ),
  createProperty
);

router.get(
  "/",
  protect,
  getProperties
);

router.get(
  "/:id",
  protect,
  getPropertyById
);

router.put(
  "/:id",
  protect,
  authorize(
    "DEVELOPER",
    "AGENCY_OWNER",
    "MANAGER"
  ),
  updateProperty
);

router.delete(
  "/:id",
  protect,
  authorize(
    "DEVELOPER"
  ),
  deleteProperty
);

module.exports = router;