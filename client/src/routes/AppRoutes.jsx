import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";

import DeveloperDashboard from "../pages/developer/DeveloperDashboard";
import AgencyManagement from "../pages/developer/AgencyManagement";

import EmployeeManagement from "../pages/admin/EmployeeManagement";
import AttendanceManagement from "../pages/admin/AttendanceManagement";
import PropertyManagement from "../pages/admin/PropertyManagement";

import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
  path="/login"
  element={<Login />}
/>

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DeveloperDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DeveloperDashboard />
            </PrivateRoute>
          }
        />

        {/* Agency Management */}
        <Route
          path="/agencies"
          element={
            <PrivateRoute>
              <AgencyManagement />
            </PrivateRoute>
          }
        />

        {/* Employee Management */}
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <EmployeeManagement />
            </PrivateRoute>
          }
        />

        {/* Attendance Management */}
        <Route
          path="/attendance"
          element={
            <PrivateRoute>
              <AttendanceManagement />
            </PrivateRoute>
          }
        />

        {/* Property Management */}
        <Route
          path="/properties"
          element={
            <PrivateRoute>
              <PropertyManagement />
            </PrivateRoute>
          }
        />

        {/* Invalid Routes */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;