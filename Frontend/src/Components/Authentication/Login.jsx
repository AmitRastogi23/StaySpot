import "./Auth.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setCurrentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const text = await response.text();
      const data = JSON.parse(text);
      if (!response.ok) {
        setError(data.message);
        return;
      }
      setCurrentUser(data.user);
      navigate(location.state?.redirectTo || data.redirectUrl);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtext">Log in to continue booking stays</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Enter a valid username.</div>
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Enter a valid password.</div>
          </div>

          <button className="auth-submit-btn" type="submit">
            Log In
          </button>

          <p className="auth-footer-text">
            Don't have an account? <NavLink to="/user/signup">Sign up</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
