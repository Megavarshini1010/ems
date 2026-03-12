import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../layouts/AuthLayout";
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Account created successfully!");
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="glass-form-card p-4 animate-fade">
        
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#7C2D12" }}>
            Create Account
          </h2>
          <p className="text-muted small">
            Join us! Please enter your details
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="input-group-custom">
            <input
              type="text"
              name="name"
              className="styled-input"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label className="floating-label">Full Name</label>
          </div>

          {/* Email */}
          <div className="input-group-custom">
            <input
              type="email"
              name="email"
              className="styled-input"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="floating-label">Email</label>
          </div>

          {/* Password */}
          <div className="input-group-custom">
            <input
              type="password"
              name="password"
              className="styled-input"
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className="floating-label">Password</label>
          </div>

          {/* Confirm Password */}
          <div className="input-group-custom">
            <input
              type="password"
              name="confirmPassword"
              className="styled-input"
              placeholder=" "
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label className="floating-label">Confirm Password</label>
          </div>

          {/* Signup Button */}
          <button type="submit" className="glow-button">
            SIGN UP
          </button>
          {/* Login Link */}
          <p className="text-center mt-4 mb-0 small">
            Already have an account?{" "}
            <Link to="/" className="auth-link">
              Login
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;