const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
  {
    agencyCode: {
      type: String,
      required: true,
      unique: true,
    },

    agencyName: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
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
  "Agency",
  agencySchema
);