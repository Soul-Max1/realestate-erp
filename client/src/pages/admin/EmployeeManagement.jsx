import {
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import Table from "../../components/common/Table";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StatusBadge from "../../components/StatusBadge";

import employeeService from "../../services/employeeService";
import agencyService from "../../services/agencyService";

import {
  employeeStart,
  employeeSuccess,
  employeeFailure,
} from "../../redux/employeeSlice";

import {
  FiPlus,
  FiUsers,
} from "react-icons/fi";

const EmployeeManagement = () => {
  const dispatch = useDispatch();

  const { employees, loading } =
    useSelector(
      (state) => state.employee
    );

  const [agencies, setAgencies] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  const [formData, setFormData] =
    useState({
      employeeId: "",
      agencyId: "",
      fullName: "",
      mobileNumber: "",
      email: "",
      designation: "",
      role: "EMPLOYEE",
    });

  const loadEmployees =
    useCallback(async () => {
      try {
        dispatch(employeeStart());

        const response =
          await employeeService.getEmployees();

        dispatch(
          employeeSuccess(
            response.employees
          )
        );
      } catch (error) {
        dispatch(
          employeeFailure(
            error.response?.data
              ?.message ||
              error.message
          )
        );
      }
    }, [dispatch]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  useEffect(() => {
    const fetchAgencies =
      async () => {
        try {
          const response =
            await agencyService.getAgencies();

          setAgencies(
            response.agencies || []
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchAgencies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      employeeId: "",
      agencyId: "",
      fullName: "",
      mobileNumber: "",
      email: "",
      designation: "",
      role: "EMPLOYEE",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response =
        await employeeService.createEmployee(
          formData
        );

      alert(
        response.message ||
          "Employee Created Successfully"
      );

      resetForm();
      setShowModal(false);
      loadEmployees();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          error.message
      );
    }
  };

  const filteredEmployees = (
    employees || []
  ).filter(
    (emp) =>
      emp.fullName
        .toLowerCase()
        .includes(
          searchValue.toLowerCase()
        ) ||
      emp.employeeId
        .toLowerCase()
        .includes(
          searchValue.toLowerCase()
        ) ||
      emp.email
        .toLowerCase()
        .includes(
          searchValue.toLowerCase()
        ) ||
      emp.designation
        .toLowerCase()
        .includes(
          searchValue.toLowerCase()
        )
  );

  const tableColumns = [
    {
      key: "employeeId",
      label: "Employee ID",
      width: "12%",
      render: (value) => (
        <span className="font-semibold text-blue-600">
          {value}
        </span>
      ),
    },
    {
      key: "fullName",
      label: "Full Name",
      width: "18%",
    },
    {
      key: "agencyId",
      label: "Agency",
      width: "18%",
      render: (value) =>
        value?.agencyName || "-",
    },
    {
      key: "designation",
      label: "Designation",
      width: "18%",
    },
    {
      key: "role",
      label: "Role",
      width: "12%",
      render: (value) => (
        <StatusBadge
          status={
            value === "MANAGER"
              ? "PRESENT"
              : "Available"
          }
        />
      ),
    },
    {
      key: "email",
      label: "Contact",
      width: "22%",
      render: (value) => (
        <div className="text-sm">
          <p className="text-gray-900">
            {value}
          </p>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <FiUsers
                size={36}
                className="text-green-600"
              />
              Employees
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your workforce and
              team members
            </p>
          </div>

          <Button
            variant="primary"
            icon={FiPlus}
            onClick={() =>
              setShowModal(true)
            }
          >
            Add Employee
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchValue}
          onChange={(e) =>
            setSearchValue(
              e.target.value
            )
          }
          onClear={() =>
            setSearchValue("")
          }
          placeholder="Search employees by name, ID, email, or designation..."
        />
      </div>

      {/* Employees Table */}
      <Card>
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : filteredEmployees.length ===
            0 ? (
          <EmptyState
            icon={FiUsers}
            title={
              searchValue
                ? "No employees found"
                : "No employees yet"
            }
            description={
              searchValue
                ? "Try searching with different keywords"
                : "Create your first employee to get started"
            }
            action={
              !searchValue ? (
                <Button
                  variant="primary"
                  onClick={() =>
                    setShowModal(
                      true
                    )
                  }
                  icon={FiPlus}
                >
                  Add Employee
                </Button>
              ) : null
            }
          />
        ) : (
          <Table
            columns={tableColumns}
            data={filteredEmployees}
            emptyState={
              <EmptyState
                title="No data"
              />
            }
          />
        )}
      </Card>

      {/* Create Employee Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title="Add New Employee"
        size="lg"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
            >
              Add Employee
            </Button>
          </>
        }
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                placeholder="e.g., EMP001"
                value={
                  formData.employeeId
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Agency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agency
              </label>
              <select
                name="agencyId"
                value={
                  formData.agencyId
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">
                  Select Agency
                </option>

                {agencies.map(
                  (agency) => (
                    <option
                      key={
                        agency._id
                      }
                      value={
                        agency._id
                      }
                    >
                      {
                        agency.agencyName
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                placeholder="10-digit mobile"
                value={
                  formData.mobileNumber
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                placeholder="e.g., Sales Manager"
                value={
                  formData.designation
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                name="role"
                value={
                  formData.role
                }
                onChange={
                  handleChange
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="EMPLOYEE">
                  Employee
                </option>

                <option value="MANAGER">
                  Manager
                </option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default EmployeeManagement;