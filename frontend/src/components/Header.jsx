import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo + Title together */}
        <div className="brand">
          <img src="./logo.jpg" alt="Firm Logo" className="logo" />
          <h1>Sharda Associate</h1>
        </div>

        <nav className={`nav ${menuOpen ? "show" : ""}`} id="navMenu">
          <a href="/">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#news">News</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </nav>

        <div
          className="hamburger"
          id="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>
    </header>
  );
}
