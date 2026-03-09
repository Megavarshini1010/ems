import React from "react";
import bgimage from "../assets/images/vectorbg.jpg"
const AuthLayout = ({ children }) => {
  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row g-0 h-100">
  {/* Left Side: Image */}
        <div className="col-md-6 d-none d-md-block">
          <img
            src={bgimage}
            alt="Login Background"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right Side: Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
          <div className="w-75">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;