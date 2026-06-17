const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },

    loginTime: {
      type: Date,
      required: true,
    },

    logoutTime: {
      type: Date,
      default: null,
    },

    totalHours: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "PRESENT",
        "ABSENT",
        "HALF_DAY",
        "LATE",
        "AUTO_LOGOUT",
      ],
      default: "PRESENT",
    },

    attendanceDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);