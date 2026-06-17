import API from "./api";

const getEmployees = async () => {
  const response = await API.get("/employees");
  return response.data;
};

const createEmployee = async (employeeData) => {
  const response = await API.post(
    "/employees",
    employeeData
  );

  return response.data;
};

const employeeService = {
  getEmployees,
  createEmployee,
};

export default employeeService;