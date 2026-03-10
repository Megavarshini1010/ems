import React, { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Main Content */}
      <div
        style={{
          marginLeft: isOpen ? "250px" : "0",
          width: "100%"
        }}
      >

        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <div className="p-4">
          {children}
        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;