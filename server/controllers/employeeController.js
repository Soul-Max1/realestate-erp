const Employee = require("../models/Employee");
const User = require("../models/User");
const Agency = require("../models/Agency");
const bcrypt = require("bcryptjs");

// Create Employee
const createEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      agencyId,
      fullName,
      mobileNumber,
      email,
      designation,
      role,
    } = req.body;

    if (
      !employeeId ||
      !agencyId ||
      !fullName ||
      !mobileNumber ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Required Fields",
      });
    }

    const agency = await Agency.findById(
      agencyId
    );

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: "Agency Not Found",
      });
    }

    const existingEmployee =
      await Employee.findOne({
        employeeId,
      });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message:
          "Employee ID Already Exists",
      });
    }

    const existingUser =
      await User.findOne({
        employeeId,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Login Account Already Exists",
      });
    }

    const employee =
      await Employee.create({
        employeeId,
        agencyId,
        fullName,
        mobileNumber,
        email,
        designation,
        role,
      });

    const hashedPassword =
      await bcrypt.hash(
        "Welcome@123",
        10
      );

    const user = await User.create({
      employeeId,
      fullName,
      email,
      password: hashedPassword,
      role,
      agencyId,
    });

    res.status(201).json({
      success: true,
      message:
        "Employee Created Successfully",
      loginCredentials: {
        employeeId,
        password: "Welcome@123",
      },
      employee,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const employees =
      await Employee.find()
        .populate(
          "agencyId",
          "agencyName agencyCode"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Employee
const getEmployeeById = async (
  req,
  res
) => {
  try {
    const employee =
      await Employee.findById(
        req.params.id
      ).populate(
        "agencyId",
        "agencyName agencyCode"
      );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
};