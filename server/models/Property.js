const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    propertyCode: {
      type: String,
      required: true,
      unique: true,
    },

    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },

    propertyType: {
      type: String,
      enum: [
        "Apartment",
        "Villa",
        "Independent House",
        "Plot",
        "Office",
        "Shop",
        "Warehouse",
        "Co-Living",
      ],
      required: true,
    },

    listingType: {
      type: String,
      enum: [
        "Sale",
        "Rent",
        "Co-Living",
      ],
      required: true,
    },

    occupancyType: {
  type: String,
  enum: [
    "Single Occupancy",
    "Double Occupancy",
    "Triple Occupancy",
  ],
  required: false,
},

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      required: true,
    },

    locality: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Booked",
        "Rented",
        "Sold",
        "Full Occupancy",
        "Inactive",
      ],
      default: "Available",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Property",
  propertySchema
);