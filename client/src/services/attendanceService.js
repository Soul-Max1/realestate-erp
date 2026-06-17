import API from "./api";

const getAttendance = async () => {
  const response = await API.get(
    "/attendance"
  );

  return response.data;
};

const createAttendance = async (
  attendanceData
) => {
  const response = await API.post(
    "/attendance",
    attendanceData
  );

  return response.data;
};

const logoutAttendance = async (
  attendanceId
) => {
  const response = await API.put(
    "/attendance/logout",
    {
      attendanceId,
    }
  );

  return response.data;
};

const attendanceService = {
  getAttendance,
  createAttendance,
  logoutAttendance,
};

export default attendanceService;