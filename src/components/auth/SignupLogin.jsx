import React, { useState } from "react";
import SocialLogin from "./SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Account created successfully!");

    navigate("/login");
  };

  return (
    <div className="card shadow-lg p-4 rounded-4 border-0">

      <h3 className="fw-bold text-center">Create Account</h3>
      <p className="text-muted text-center mb-4">
        Please enter your details to register
      </p>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control rounded-3"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control rounded-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control rounded-3"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control rounded-3"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="btn btn-warning w-100 rounded-3 mb-3"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center mt-0 mb-0">
          Already have an account?{" "}
          <Link to="/login" className="fw-semibold">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default SignupForm;