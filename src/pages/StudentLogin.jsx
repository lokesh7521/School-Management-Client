import "./StudentLogin.css";

import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

function StudentLogin() {

  const navigate = useNavigate();

  /* STATES */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

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

          <input
            type="password"

            placeholder="Enter Password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

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