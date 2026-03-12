import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ toggleSidebar }) => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    toast.info("Signed out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-3">
    <button
  className="btn"
  onClick={toggleSidebar}
  style={{ color: "white", backgroundColor: "orange", border: "none" }}
>
  ☰
</button>

      <div className="ms-auto position-relative">
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setShowProfile(!showProfile)}
        >
          <i className="bi bi-person-circle fs-4"></i>
          <span className="ms-2">Profile</span>
        </span>

        {showProfile && (
          <div
            className="dropdown-menu show"
            style={{ right: 0, left: "auto" }}
          >
            <span className="dropdown-item fw-bold">Admin</span>
            <span className="dropdown-item text-muted small">
              admin@gmail.com
            </span>
            <div className="dropdown-divider"></div>
          <button
  className="dropdown-item"
  onClick={handleSignOut}
  style={{ color: "orange" }}
>
  Sign Out
</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
