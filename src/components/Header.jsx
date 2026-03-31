import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Shield } from "lucide-react";
import "../styles/header.css";
import logo from "../assets/idccc-logo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
    setMenuOpen(false);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className={`header-wrapper ${scrolled ? "scrolled" : ""}`}>
      <header className="header-capsule">
        <div className="logo-section" onClick={() => navigate("/")}>
          <div className="logo-container">
            <img src={logo} alt="IDCCC" className="logo-img" />
          </div>
          <div className="logo-text">
            <h2>IDCCC</h2>
          </div>
        </div>

        <nav className={`nav-menu ${menuOpen ? "mobile-open" : ""}`}>
          <div className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/membership">Membership</NavLink>
            <NavLink to="/activities">Activities</NavLink>
          </div>

          <div className="nav-separator"></div>

          <div className="nav-actions">
            {!isLoggedIn ? (
              <button className="btn-join" onClick={() => navigate("/join-membership")}>
                Join Membership
              </button>
            ) : (
              <button className="btn-logout" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </nav>

        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
    </div>
  );
}