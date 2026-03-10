import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {

  return (
    <div
      className={`bg-dark text-white p-3 position-fixed h-100 ${
        isOpen ? "d-block" : "d-none"
      }`}
      style={{ width: "250px" }}
    >
      <h4 className="mb-4">Admin</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link to="/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/employees" className="nav-link text-white">
            Employee List
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;