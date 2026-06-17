const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const { calculateHours } = require("../services/attendanceService");

// Create Attendance
const createAttendance = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const employee = await Employee.findById(
      employeeId
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    const attendance =
      await Attendance.create({
        employeeId: employee._id,
        agencyId: employee.agencyId,
        loginTime: new Date(),
        status: "PRESENT",
      });

    res.status(201).json({
      success: true,
      message:
        "Attendance Created Successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout Attendance
const logoutAttendance = async (
  req,
  res
) => {
  try {
    const { attendanceId } = req.body;

    const attendance =
      await Attendance.findById(
        attendanceId
      );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message:
          "Attendance Record Not Found",
      });
    }

    attendance.logoutTime = new Date();

    attendance.totalHours =
      calculateHours(
        attendance.loginTime,
        attendance.logoutTime
      );

    await attendance.save();

    res.status(200).json({
      success: true,
      message:
        "Logout Recorded Successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Attendance
const getAttendance = async (
  req,
  res
) => {
  try {
    const attendance =
      await Attendance.find()
        .populate(
          "employeeId",
          "employeeId fullName"
        )
        .populate(
          "agencyId",
          "agencyName agencyCode"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Today's Attendance
const getTodayAttendance = async (
  req,
  res
) => {
  try {
    const start =
      new Date();

    start.setHours(
      0,
      0,
      0,
      0
    );

    const end =
      new Date();

    end.setHours(
      23,
      59,
      59,
      999
    );

    const attendance =
      await Attendance.find({
        attendanceDate: {
          $gte: start,
          $lte: end,
        },
      });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Employee Attendance
const getEmployeeAttendance =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.find({
          employeeId:
            req.params.employeeId,
        });

      res.status(200).json({
        success: true,
        count: attendance.length,
        attendance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createAttendance,
  logoutAttendance,
  getAttendance,
  getTodayAttendance,
  getEmployeeAttendance,
};