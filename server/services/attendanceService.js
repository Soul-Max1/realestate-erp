const Attendance = require("../models/Attendance");

const calculateHours = (
  loginTime,
  logoutTime
) => {
  const diff =
    logoutTime - loginTime;

  return Number(
    (diff / (1000 * 60 * 60)).toFixed(2)
  );
};

module.exports = {
  calculateHours,
};