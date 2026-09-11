import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleHostClick = () => {
    if (currentUser) {
      navigate("/listings/new");
    } else {
      navigate("/user/login", {
        state: { redirectTo: "/listings/new" },
      });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!response.ok) {
        return;
      }
      setCurrentUser(null);
      navigate("/");
    } catch (err) {
      setCurrentUser(null);
    }
  };

  const checkUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/current`,
        {
          credentials: "include",
        },
      );
      if (!response.ok) {
        setCurrentUser(null);
        return;
      }
      const data = await response.json();
      setCurrentUser(data.user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          <i className="fa-regular fa-compass"></i>
          <span>StaySpot</span>
        </NavLink>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <div className="navbar-left">
            <NavLink to="/" className="nav-link">
              Explore
            </NavLink>
          </div>

          <div className="navbar-search">
            <form>
              <input
                type="search"
                placeholder="Search Destinations"
                className="search-input"
              />

              <button type="submit" className="search-button">
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>Search</span>
              </button>
            </form>
          </div>

          <div className="navbar-right">
            <button className="nav-link home-link" onClick={handleHostClick}>
              Airbnb you home
            </button>

            {currentUser ? (
              <button
                className="nav-link auth-link logout-btn"
                onClick={handleLogout}
              >
                Log out
              </button>
            ) : (
              <>
                <NavLink to="/user/signup" className="nav-link auth-link">
                  Sign up
                </NavLink>

                <NavLink to="/user/login" className="nav-link auth-link">
                  Log in
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
