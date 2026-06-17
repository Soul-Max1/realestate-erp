const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Login User
const loginUser = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    if (!employeeId || !password) {
      return res.status(400).json({
        success: false,
        message: "Employee ID and Password are required",
      });
    }

    const user = await User.findOne({ employeeId });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Employee ID",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        employeeId: user.employeeId,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Profile
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Developer Test Route
const testDeveloperRoute = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Developer Access Granted",
    role: req.user.role,
  });
};

module.exports = {
  loginUser,
  getProfile,
  testDeveloperRoute,
};