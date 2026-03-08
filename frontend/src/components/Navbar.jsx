import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // make sure this is imported

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo / Title */}
      <h2 className="navbar-logo">Carbon Tracker</h2>

      {/* Navigation Links */}
      <div className="navbar-links">
        
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/add" className="nav-link">Activities</Link>
        <Link to="/insights" className="nav-link">Insights</Link>
        <Link to="/learn" className="nav-link">Learn</Link>
        <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
