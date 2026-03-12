import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const linkStyle = (path) => ({
    backgroundColor: location.pathname === path ? "var(--secondary)" : "transparent",
    color: "white",
    borderRadius: "8px",
    transition: "var(--transition)",
    marginBottom: "5px"
  });

  return (
    <div
      className="position-fixed h-100 p-3 shadow"
      style={{
        width: "250px",
        display: isOpen ? "block" : "none",
        backgroundColor: "var(--sidebar-dark)",
        zIndex: 1000
      }}
    >
      <div className="d-flex align-items-center mb-4 ps-2">
        <i className="bi bi-people-fill fs-3 me-2 text-white"></i>
        <h4 className="text-white m-0 fw-bold">EMS Admin</h4>
      </div>

      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link" style={linkStyle("/dashboard")}>
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/employees" className="nav-link" style={linkStyle("/employees")}>
            <i className="bi bi-person-lines-fill me-2"></i> Employee List
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;