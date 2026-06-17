import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiBell,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

import SearchBar from "./common/SearchBar";

const Header = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showUserMenu, setShowUserMenu] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearchClear = () => {
    setSearchValue("");
  };

  const formatDate = () => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date().toLocaleDateString(
      "en-US",
      options
    );
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-gray-600 hover:text-gray-900 transition"
          >
            <FiMenu size={24} />
          </button>

          <div className="hidden md:block max-w-xs">
            <SearchBar
              value={searchValue}
              onChange={(e) =>
                setSearchValue(e.target.value)
              }
              onClear={handleSearchClear}
              placeholder="Quick search..."
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Date */}
          <div className="hidden sm:block text-right">
            <p className="text-sm text-gray-600">
              {formatDate()}
            </p>
            <p className="text-xs text-gray-400">
              {new Date().toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-gray-200" />

          {/* Notifications */}
          <button className="relative text-gray-600 hover:text-gray-900 transition">
            <FiBell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() =>
                setShowUserMenu(!showUserMenu)
              }
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user?.email?.[0]?.toUpperCase() ||
                  "U"}
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {user?.email || "User"}
              </span>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;