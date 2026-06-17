const Agency = require("../models/Agency");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create Agency
const createAgency = async (req, res) => {
  try {
    const {
      agencyCode,
      agencyName,
      ownerName,
      mobileNumber,
      email,
      address,
      city,
      state,
    } = req.body;

    if (
      !agencyCode ||
      !agencyName ||
      !ownerName ||
      !mobileNumber ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const agencyExists = await Agency.findOne({
      agencyCode,
    });

    if (agencyExists) {
      return res.status(400).json({
        success: false,
        message: "Agency Already Exists",
      });
    }

    const agency = await Agency.create({
      agencyCode,
      agencyName,
      ownerName,
      mobileNumber,
      email,
      address,
      city,
      state,
    });

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    await User.create({
      employeeId: `${agencyCode}-ADMIN`,
      fullName: ownerName,
      email,
      password: hashedPassword,
      role: "AGENCY_OWNER",
    });

    res.status(201).json({
      success: true,
      message: "Agency Created Successfully",
      agency,
      loginCredentials: {
        employeeId: `${agencyCode}-ADMIN`,
        password: "Admin@123",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Agencies
const getAgencies = async (req, res) => {
  try {
    const agencies = await Agency.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: agencies.length,
      agencies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAgency,
  getAgencies,
};