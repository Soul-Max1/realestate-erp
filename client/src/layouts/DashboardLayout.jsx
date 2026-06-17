import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <Header
          onMenuToggle={() =>
            setSidebarOpen(true)
          }
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;