import React, { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="d-flex"
      style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}
    >
      <Sidebar isOpen={isOpen} />

      <div
        style={{
          marginLeft: isOpen ? "250px" : "0",
          width: "100%",
          transition: "0.3s ease",
        }}
      >
        <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

        <div className="container-fluid p-4 animate-fade">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
