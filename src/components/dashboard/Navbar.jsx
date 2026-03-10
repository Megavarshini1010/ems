import React, { useState } from "react";

const Navbar = ({ toggleSidebar }) => {

  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <nav className="navbar navbar-light bg-white px-3 shadow-sm">

        {/* Hamburger */}
        <button
          className="btn btn-outline-secondary"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        {/* Profile Icon */}
        <div className="ms-auto">

          <i
            className="bi bi-person-circle fs-4"
            style={{ cursor: "pointer" }}
            onClick={() => setShowProfile(true)}
          ></i>

        </div>

      </nav>

      {/* Profile Modal */}
      {showProfile && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">User Profile</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowProfile(false)}
                ></button>
              </div>

              <div className="modal-body text-center">

                <i className="bi bi-person-circle fs-1 mb-3"></i>

                <h5>Admin User</h5>
                <p>admin@gmail.com</p>

              </div>

            </div>

          </div>
        </div>
      )}

    </>
  );
};

export default Navbar;