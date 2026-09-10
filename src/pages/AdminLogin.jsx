import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner
} from "react-icons/fa";
import axios from "axios";
import "./AdminLogin.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

function AdminLogin({ onLoginSuccess }) {
  const navigate = useNavigate();

  // Form input options (Email & Password)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill out both email and password fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email: email.trim(),
        password: password.trim()
      });

      if (res.data.success && res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminUser", JSON.stringify(res.data.user));
        setSuccessMsg("Login successful! Redirecting to Admin Dashboard...");

        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess();
          } else {
            navigate("/admin");
          }
        }, 1000);
      } else {
        setError(res.data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Admin Login Error:", err);
      const serverMsg = err.response?.data?.message || "Login failed. Please check backend connection and credentials.";
      setError(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Please contact your Master Administrator or IT Department to reset your Admin Portal credentials.\n\nSupport Email: admin@school.com\nSupport Phone: +91 98765 43210");
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <h1>Admin Login</h1>
        <p>Login to access admin dashboard</p>

        {/* ALERT NOTIFICATIONS */}
        {error && (
          <div className="admin-alert error-alert">
            <FaExclamationTriangle className="alert-icon" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="admin-alert success-alert">
            <FaCheckCircle className="alert-icon" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username or Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            disabled={loading}
            required
          />

          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              disabled={loading}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="login-options">
            <button
              type="button"
              className="forgot-password-btn"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="admin-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spin-icon" /> Authenticating...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="login-back-container">
          <Link to="/login" className="login-back-link">
            ← Back to Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
