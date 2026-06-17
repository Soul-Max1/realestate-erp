const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createDeveloper = async () => {
  try {
    const developerExists = await User.findOne({
      employeeId: "DEV001",
    });

    if (developerExists) {
      console.log("Developer Account Already Exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    await User.create({
      employeeId: "DEV001",
      fullName: "System Developer",
      email: "developer@realestateerp.com",
      password: hashedPassword,
      role: "DEVELOPER",
    });

    console.log("Developer Account Created");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = createDeveloper;