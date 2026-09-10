import "./StudentLogin.css";

import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import axios from "axios";

function StudentLogin() {

  const navigate = useNavigate();

  /* STATES */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  /* LOGIN FUNCTION */

  const handleLogin = async () => {

    if (!email || !password) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res =
        await axios.post(

          `${apiUrl}/api/auth/login`,

          {
            email,
            password
          }
        );

      /* SAVE TOKEN */

      localStorage.setItem(

        "token",

        res.data.token
      );

      /* SAVE USER DATA */

      localStorage.setItem(

        "studentName",

        res.data.user.name
      );

      localStorage.setItem(

        "studentRole",

        res.data.user.role
      );

      localStorage.setItem(

        "studentEmail",

        res.data.user.email
      );

      /* SUCCESS */

      alert(
        "Login Successful 🚀"
      );

      /* REDIRECT */

      navigate(
        "/student-dashboard"
      );

    } catch (error) {

      alert(

        error.response?.data?.message ||

        "Invalid Email or Password"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="student-login">

      <div className="student-login-box">

        <h1>
          Student Login
        </h1>

        <p>
          Login to access student dashboard
        </p>

        <form>

          {/* EMAIL */}

          <input
            type="email"

            placeholder="Enter Email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* PASSWORD */}

          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}

              placeholder="Enter Password"

              value={password}

              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
            <button
              type="button"

              className="password-toggle-btn"

              onClick={() =>
                setShowPassword(!showPassword)
              }

              title={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="login-options">
            <button
              type="button"
              className="forgot-password-btn"
              onClick={() => {
                alert("Please contact your Class Teacher or School Administrator to reset your Student Portal password.\n\nSupport Email: admin@school.com\nSupport Phone: +91 98765 43210");
              }}
            >
              Forgot Password?
            </button>
          </div>

          {/* BUTTON */}

          <button
            type="button"

            onClick={handleLogin}

            disabled={loading}
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

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

export default StudentLogin;