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
import Card from "../../components/common/Card";
import Table from "../../components/common/Table";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StatusBadge from "../../components/StatusBadge";

import attendanceService from "../../services/attendanceService";
import employeeService from "../../services/employeeService";

import {
  attendanceStart,
  attendanceSuccess,
  attendanceFailure,
} from "../../redux/attendanceSlice";

import {
  FiPlus,
  FiCalendar,
  FiLogOut,
} from "react-icons/fi";

const AttendanceManagement = () => {
  const dispatch = useDispatch();

  const { attendance, loading } =
    useSelector(
      (state) => state.attendance
    );

  const [employees, setEmployees] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [employeeId, setEmployeeId] =
    useState("");

  const loadAttendance =
    useCallback(async () => {
      try {
        dispatch(
          attendanceStart()
        );

        const data =
          await attendanceService.getAttendance();

        dispatch(
          attendanceSuccess(
            data.attendance
          )
        );
      } catch (error) {
        dispatch(
          attendanceFailure(
            error.message
          )
        );
      }
    }, [dispatch]);

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  useEffect(() => {
    const fetchEmployees =
      async () => {
        try {
          const response =
            await employeeService.getEmployees();

          setEmployees(
            response.employees ||
              []
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchEmployees();
  }, []);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await attendanceService.createAttendance(
        {
          employeeId,
        }
      );

      alert(
        "Attendance Marked Successfully"
      );

      setEmployeeId("");
      setShowModal(false);
      loadAttendance();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          error.message
      );
    }
  };

  const handleLogout =
    async (attendanceId) => {
      try {
        await attendanceService.logoutAttendance(
          attendanceId
        );

        alert(
          "Logout Recorded"
        );

        loadAttendance();
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            error.message
        );
      }
    };
  const tableColumns = [
    {
      key: "employeeId",
      label: "Employee",
      width: "20%",
      render: (value) =>
        value
          ? `${value.employeeId} - ${value.fullName}`
          : "-",
    },
    {
      key: "agencyId",
      label: "Agency",
      width: "15%",
      render: (value) =>
        value?.agencyName || "-",
    },
    {
      key: "loginTime",
      label: "Login Time",
      width: "15%",
      render: (value) =>
        value
          ? new Date(
              value
            ).toLocaleTimeString()
          : "-",
    },
    {
      key: "logoutTime",
      label: "Logout Time",
      width: "15%",
      render: (value) =>
        value
          ? new Date(
              value
            ).toLocaleTimeString()
          : "-",
    },
    {
      key: "totalHours",
      label: "Hours",
      width: "10%",
    },
    {
      key: "status",
      label: "Status",
      width: "10%",
      render: (value) => (
        <StatusBadge
          status={value}
        />
      ),
    },
    {
      key: "attendanceDate",
      label: "Date",
      width: "12%",
      render: (value) =>
        new Date(
          value
        ).toLocaleDateString(),
    },
    {
      key: "_id",
      label: "Action",
      width: "3%",
      render: (value, row) =>
        !row.logoutTime ? (
          <button
            onClick={() =>
              handleLogout(value)
            }
            className="text-red-600 hover:text-red-800 text-sm font-medium transition"
          >
            <FiLogOut
              size={18}
            />
          </button>
        ) : null,
    },
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <FiCalendar
                size={36}
                className="text-orange-600"
              />
              Attendance
            </h1>
            <p className="text-gray-600 mt-2">
              Track employee attendance
              and working hours
            </p>
          </div>

          <Button
            variant="primary"
            icon={FiPlus}
            onClick={() =>
              setShowModal(true)
            }
          >
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {
              attendance?.filter(
                (a) =>
                  a.status ===
                  "PRESENT"
              ).length
            }
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Present
          </p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-orange-600">
            {
              attendance?.filter(
                (a) =>
                  a.status ===
                  "LATE"
              ).length
            }
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Late
          </p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-red-600">
            {
              attendance?.filter(
                (a) =>
                  a.status ===
                  "ABSENT"
              ).length
            }
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Absent
          </p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-600">
            {
              attendance?.filter(
                (a) =>
                  a.status ===
                  "HALF_DAY"
              ).length
            }
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Half Day
          </p>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : attendance &&
            attendance.length > 0 ? (
          <Table
            columns={tableColumns}
            data={attendance}
            emptyState={
              <EmptyState
                title="No data"
              />
            }
          />
        ) : (
          <EmptyState
            icon={FiCalendar}
            title="No attendance records"
            description="Start marking attendance for your employees"
            action={
              <Button
                variant="primary"
                onClick={() =>
                  setShowModal(
                    true
                  )
                }
                icon={FiPlus}
              >
                Mark Attendance
              </Button>
            }
          />
        )}
      </Card>

      {/* Mark Attendance Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEmployeeId("");
        }}
        title="Mark Attendance"
        size="md"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                setShowModal(false);
                setEmployeeId("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
            >
              Mark Present
            </Button>
          </>
        }
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Employee
            </label>
            <select
              value={employeeId}
              onChange={(e) =>
                setEmployeeId(
                  e.target.value
                )
              }
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">
                Choose an employee...
              </option>

              {employees.map(
                (employee) => (
                  <option
                    key={
                      employee._id
                    }
                    value={
                      employee._id
                    }
                  >
                    {
                      employee.employeeId
                    }
                    {" - "}
                    {
                      employee.fullName
                    }
                  </option>
                )
              )}
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> The
              current time will be
              recorded as login time.
            </p>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default AttendanceManagement;