import "./TeacherLogin.css";
import { useNavigate, Link } from "react-router-dom";

function TeacherLogin() {
  const navigate = useNavigate();

  return (

    <div className="teacher-login">

      <div className="teacher-login-box">

        <h1>Teacher Login</h1>

        <p>
          Login to access teacher dashboard
        </p>

        <form>

          <input
            type="text"
            placeholder="Enter Username"
          />

          <input
            type="password"
            placeholder="Enter Password"
          />

          <button
            type="button"
            onClick={() => navigate("/teacher-dashboard")}
          >
            Login
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

export default TeacherLogin;