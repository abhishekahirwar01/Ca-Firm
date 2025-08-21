import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    document.title = "Sharda Associates | Real Estate";
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  return (
    <header className="header">
      <div className="header-container">
        {/* Mobile Hamburger + Logo */}
        <div className="mobile-left">
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-btn">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <Link to="/" className="logo-link">
            <img src="./logo.png" alt=" Logo" className="logo" />
            <span className="logo-text-gray">Sharda</span>
            <span className="logo-text-blue">Associates</span>
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search your software"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
        </form>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="#" className="nav-link">
            About
          </Link>
          <Link to="#" className="nav-link">
            Contact
          </Link>
          <Link to="/login" className="nav-link">
            Sign In
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="nav-mobile">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="nav-link-mobile"
          >
            Home
          </Link>
          <Link
            to="#"
            onClick={() => setMenuOpen(false)}
            className="nav-link-mobile"
          >
            About
          </Link>
          <Link
            to="#"
            onClick={() => setMenuOpen(false)}
            className="nav-link-mobile"
          >
            Contact
          </Link>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="nav-link-mobile"
          >
            Sign In
          </Link>
        </nav>
      )}
    </header>
  );
}
