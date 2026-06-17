import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import {
  FiBriefcase,
  FiUsers,
  FiCalendar,
  FiHome,
} from "react-icons/fi";

const DeveloperDashboard = () => {
  const navigate = useNavigate();

  const agencies = useSelector(
    (state) => state.agency?.agencies || []
  );

  const employees = useSelector(
    (state) => state.employee?.employees || []
  );

  const attendance = useSelector(
    (state) => state.attendance?.attendance || []
  );

  const properties = useSelector(
    (state) => state.property?.properties || []
  );

  // Calculate attendance stats
  const attendanceStats =
    attendance.length > 0
      ? {
          present: attendance.filter(
            (a) =>
              a.status === "PRESENT"
          ).length,
          absent: attendance.filter(
            (a) =>
              a.status === "ABSENT"
          ).length,
          late: attendance.filter(
            (a) => a.status === "LATE"
          ).length,
          halfDay: attendance.filter(
            (a) =>
              a.status === "HALF_DAY"
          ).length,
        }
      : {
          present: 0,
          absent: 0,
          late: 0,
          halfDay: 0,
        };

  // Property stats
  const propertyStats = {
    sale: properties.filter(
      (p) => p.listingType === "Sale"
    ).length,
    rent: properties.filter(
      (p) => p.listingType === "Rent"
    ).length,
    available: properties.filter(
      (p) => p.status === "Available"
    ).length,
    booked: properties.filter(
      (p) => p.status === "Booked"
    ).length,
  };

  // Chart data
  const attendanceChartData = [
    {
      name: "Present",
      value: attendanceStats.present,
    },
    {
      name: "Absent",
      value: attendanceStats.absent,
    },
    {
      name: "Late",
      value: attendanceStats.late,
    },
    {
      name: "Half Day",
      value: attendanceStats.halfDay,
    },
  ];

  const propertyChartData = [
    {
      name: "Sale",
      value: propertyStats.sale,
    },
    {
      name: "Rent",
      value: propertyStats.rent,
    },
  ];

  const colors = [
    "#3b82f6",
    "#ef4444",
    "#f59e0b",
    "#8b5cf6",
  ];

  const propertyColors = [
    "#3b82f6",
    "#10b981",
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Real Estate ERP Overview
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Agencies"
          value={agencies.length}
          icon={FiBriefcase}
          color="bg-blue-600"
          trend={12}
          subtitle="Active agencies"
        />

        <StatCard
          title="Employees"
          value={employees.length}
          icon={FiUsers}
          color="bg-green-600"
          trend={8}
          subtitle="Total employees"
        />

        <StatCard
          title="Properties"
          value={properties.length}
          icon={FiHome}
          color="bg-purple-600"
          trend={15}
          subtitle="Listed properties"
        />

        <StatCard
          title="Attendance"
          value={attendance.length}
          icon={FiCalendar}
          color="bg-orange-500"
          trend={-5}
          subtitle="Records tracked"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Attendance Chart */}
        <Card>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiCalendar size={20} />
              Attendance Overview
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Monthly attendance breakdown
            </p>
          </div>

          {attendance.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={
                    attendanceChartData
                  }
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) =>
                    `${name}: ${value}`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceChartData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          colors[
                            index %
                              colors.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No attendance data
            </div>
          )}
        </Card>

        {/* Property Listings Chart */}
        <Card>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiHome size={20} />
              Property Listings
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Sale vs Rent properties
            </p>
          </div>

          {properties.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart
                data={propertyChartData}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    background:
                      "#ffffff",
                    border:
                      "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                >
                  {propertyChartData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          propertyColors[
                            index %
                              propertyColors.length
                          ]
                        }
                      />
                    )
                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No property data
            </div>
          )}
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Platform Overview
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Active Agencies
                  </p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {agencies.length}
                  </p>
                </div>
                <FiBriefcase
                  size={32}
                  className="text-blue-300"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Total Employees
                  </p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {employees.length}
                  </p>
                </div>
                <FiUsers
                  size={32}
                  className="text-green-300"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div>
                  <p className="text-sm font-medium text-purple-900">
                    Properties Listed
                  </p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">
                    {properties.length}
                  </p>
                </div>
                <FiHome
                  size={32}
                  className="text-purple-300"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div>
                  <p className="text-sm font-medium text-orange-900">
                    Attendance Records
                  </p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">
                    {attendance.length}
                  </p>
                </div>
                <FiCalendar
                  size={32}
                  className="text-orange-300"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() =>
                navigate("/agencies")
              }
              icon={FiBriefcase}
            >
              Manage Agencies
            </Button>

            <Button
              variant="primary"
              fullWidth
              onClick={() =>
                navigate("/employees")
              }
              icon={FiUsers}
            >
              Manage Employees
            </Button>

            <Button
              variant="primary"
              fullWidth
              onClick={() =>
                navigate("/properties")
              }
              icon={FiHome}
            >
              Manage Properties
            </Button>

            <Button
              variant="primary"
              fullWidth
              onClick={() =>
                navigate("/attendance")
              }
              icon={FiCalendar}
            >
              Track Attendance
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-3">
              System Version 1.0
            </p>
            <p className="text-xs text-gray-500">
              Real Estate ERP Platform
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DeveloperDashboard;