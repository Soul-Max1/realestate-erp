import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FiUsers,
  FiHome,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import {
  FaChartBar,
  FaBuilding,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const menuItems = [
  {
    path: "/dashboard",
    icon: FaChartBar,
    label: "Dashboard",
  },
  {
    path: "/agencies",
    icon: FaBuilding,
    label: "Agencies",
  },
  {
    path: "/employees",
    icon: FiUsers,
    label: "Employees",
  },
  {
    path: "/attendance",
    icon: FaClipboardList,
    label: "Attendance",
  },
  {
    path: "/properties",
    icon: FiHome,
    label: "Properties",
  },
];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white transition-all duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "lg:w-20" : "lg:w-64 w-64"}`}
      >
        {/* Logo */}
        <div
          className={`border-b border-gray-800 flex items-center justify-between transition-all duration-300 ${
            isCollapsed ? "px-4 py-6" : "px-6 py-6"
          }`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">
                ER
              </div>
              <span className="text-xl font-bold">
                Real Estate ERP
              </span>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={() =>
                setIsCollapsed(true)
              }
              className="hidden lg:block text-gray-400 hover:text-white transition"
            >
              <FiChevronLeft size={20} />
            </button>
          )}
          {isCollapsed && (
            <button
              onClick={() =>
                setIsCollapsed(false)
              }
              className="hidden lg:block text-gray-400 hover:text-white transition mx-auto"
            >
              <FiChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex flex-col gap-2 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-gray-300 hover:bg-gray-800/50"
                  }`
                }
              >
                <Icon size={20} />
                {!isCollapsed && (
                  <span className="font-medium transition-opacity duration-200">
                    {item.label}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Info */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4 bg-gray-950">
            <div className="text-xs text-gray-400">
              <p className="font-semibold mb-1">
                Version 1.0
              </p>
              <p>Real Estate ERP Platform</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;