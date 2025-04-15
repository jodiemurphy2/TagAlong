import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../auth/AuthContext";
import '../Navbar.css'; // Let's use an external CSS file for styling

const Navbar = () => {
  const { authState, logout } = useAuthContext();

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/home" className="navbar-link">Home</Link>
        {authState.user ? (
          <>
            <Link to="/add-event" className="navbar-link">Add Event</Link>
            <Link to="/profile" className="navbar-link">Profile</Link>
            <button className="navbar-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
