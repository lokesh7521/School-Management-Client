import "./PrincipalLogin.css";
import { useNavigate, Link } from "react-router-dom";
function PrincipalLogin() {
  const navigate = useNavigate();

  return (

    <div className="principal-login">

      <div className="principal-box">

        <h1>
          Principal Login
        </h1>

        <p>
          Login to access principal dashboard
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
            onClick={() =>
            navigate("/principal-dashboard")
            }
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

export default PrincipalLogin;