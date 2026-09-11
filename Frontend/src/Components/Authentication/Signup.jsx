import "./Auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Welcome</h1>

        <p className="auth-subtext">Create an account to start booking stays</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="username">Username</label>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Create a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="auth-submit-btn" type="submit">
            Create Account
          </button>

          <p className="auth-footer-text">
            Already have an account? <NavLink to="/user/login">Log in</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
