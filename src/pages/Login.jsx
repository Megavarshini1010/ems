import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../layouts/AuthLayout";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "123456") {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <AuthLayout>
      <div className="glass-form-card p-4 animate-fade">
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#7C2D12" }}>Admin Login</h2>
          <p className="text-muted small">Welcome back! Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Floating Email */}
          <div className="input-group-custom">
            <input
              type="email"
              className="styled-input"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="floating-label">Email</label>
          </div>

          {/* Floating Password */}
          <div className="input-group-custom">
            <input
              type="password"
              className="styled-input"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="floating-label">Password</label>
          </div>

          {/* Main Login Button */}
          <button type="submit" className="glow-button">LOGIN</button>

          {/* Social Divider */}
          <div className="divider-container">OR Continue with</div>
          <div className="social-row">
            <button type="button" className="social-btn">
              <i className="bi bi-google text-danger"></i> Google
            </button>
            <button type="button" className="social-btn">
              <i className="bi bi-github text-dark"></i> GitHub
            </button>
          </div>

          <p className="text-center mt-4 mb-0 small">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;