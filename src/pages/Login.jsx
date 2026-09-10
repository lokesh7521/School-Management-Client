import "./Login.css";

import { Link } from "react-router-dom";

import {
  FaUserShield,
  FaChalkboardTeacher,
  FaUserGraduate
} from "react-icons/fa";

function Login() {

  return (

    <div className="login-page">

      <div className="login-container">

        <h1>
          Login Portal
        </h1>

        <p>
          Select your login type
        </p>

        <div className="login-cards">

          {/* STUDENT */}
          <Link
            to="/student-login"
            className="login-card"
          >
            <FaUserGraduate className="login-icon" />
            <h2>
              Student Login
            </h2>
          </Link>

          {/* TEACHER */}
          <Link
            to="/teacher-login"
            className="login-card"
          >
            <FaChalkboardTeacher className="login-icon" />
            <h2>
              Teacher Login
            </h2>
          </Link>

          {/* PRINCIPAL */}
          <Link
            to="/principal-login"
            className="login-card"
          >
            <FaUserShield className="login-icon" />
            <h2>
              Principal Login
            </h2>
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Login;