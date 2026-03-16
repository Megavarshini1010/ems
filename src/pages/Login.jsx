import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../layouts/AuthLayout";
import { loginUser } from "../services/loginService";
import "../styles/Login.css";

const Login = () => {

const navigate = useNavigate();

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [showForgotModal, setShowForgotModal] = useState(false);


// ==========================
// LOGIN AUTHENTICATION
// ==========================

const handleSubmit = async (e) => {

e.preventDefault();

try {

const response = await loginUser(username, password);

toast.success("Login successful");

localStorage.setItem("token", response.token);

navigate("/dashboard");

} catch (error) {

toast.error(error.message || "Login failed");

}

};


return (

<AuthLayout>

<div className="glass-form-card p-4 animate-fade">

<div className="text-center mb-4">

<h2 className="fw-bold" style={{ color: "#7C2D12" }}>
Admin Login
</h2>

<p className="text-muted small">
Welcome back! Please enter your details
</p>

</div>


<form onSubmit={handleSubmit}>

{/* USERNAME */}

<div className="input-group-custom">

<input
type="text"
className="styled-input"
placeholder=" "
value={username}
onChange={(e)=>setUsername(e.target.value)}
required
/>

<label className="floating-label">Username</label>

</div>


{/* PASSWORD */}

<div className="input-group-custom password-field">

<input
type={showPassword ? "text" : "password"}
className="styled-input"
placeholder=" "
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<label className="floating-label">Password</label>

<span
className="password-toggle"
onMouseDown={(e)=>e.preventDefault()}
onClick={()=>setShowPassword(!showPassword)}
>
<i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
</span>

</div>


{/* REMEMBER + FORGOT */}

<div className="d-flex justify-content-between align-items-center mb-2 small">

<div className="form-check">

<input
className="form-check-input"
type="checkbox"
id="remember"
/>

<label className="form-check-label" htmlFor="remember">
Remember me
</label>

</div>

<span
className="forgot-link"
onClick={()=>setShowForgotModal(true)}
>
Forgot password?
</span>

</div>


{/* LOGIN BUTTON */}

<button type="submit" className="glow-button">
LOGIN
</button>


{/* SOCIAL LOGIN */}

<div className="divider-container">
OR Continue with
</div>


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

<Link to="/signup" className="auth-link">
Sign up
</Link>

</p>

</form>



{/* FORGOT PASSWORD MODAL */}

{showForgotModal && (

<div className="modal show d-block">

<div className="modal-dialog modal-dialog-centered">

<div className="modal-content">

<div className="modal-header">

<h5 className="modal-title">
Forgot Password
</h5>

<button
className="btn-close"
onClick={()=>setShowForgotModal(false)}
></button>

</div>


<div className="modal-body">

<input
type="email"
className="form-control"
placeholder="Enter registered email"
/>

</div>


<div className="modal-footer">

<button
className="btn btn-secondary"
onClick={()=>setShowForgotModal(false)}
>
Cancel
</button>

<button className="btn btn-primary">
Submit
</button>

</div>

</div>

</div>

</div>

)}

</div>

</AuthLayout>

);

};

export default Login;