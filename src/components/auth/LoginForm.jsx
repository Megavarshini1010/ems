import React, { useState } from "react";
import SocialLogin from "./SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {

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
    <div className="card shadow-lg p-4 rounded-4 border-0">

      <h3 className="fw-bold text-center">Admin Login</h3>
      <p className="text-muted text-center mb-4">
        Welcome back! Please enter your details
      </p>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control rounded-3"
            placeholder="Enter your email id..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control rounded-3"
            placeholder="Enter the password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-between mb-3">
          <div>
            <input type="checkbox" className="form-check-input me-2" />
            <label className="form-check-label">Remember me</label>
          </div>

          <a href="#" className="text-decoration-none">
            Forgot password
          </a>
        </div>

        <button type="submit" className="btn btn-warning w-100 rounded-3 mb-3">
          Login
        </button>

        <SocialLogin />

        <p className="text-center mt-4 mb-0">
          Don’t have an account?{" "}
          <Link to="/signup" className="fw-semibold">
            Sign up
          </Link>
        </p>

      </form>

    </div>
  );
};

export default LoginForm;