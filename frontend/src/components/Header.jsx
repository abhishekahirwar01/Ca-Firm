import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="page-header">
      {/* Hidden checkbox for toggle */}
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />

      {/* Hamburger icon */}
      <label htmlFor="menu-toggle" className="menu-icon">
        <i className="fa fa-bars"></i>
      </label>

      {/* Brand */}
      <div className="brand">
        <img src="logo.png" alt="logo" />
        <h1>Sharda Associates</h1>
      </div>

      {/* Navigation */}
      <nav className="nav-bar">
        <Link to="/" className="active">
          Home
        </Link>
        <Link to="#">Services</Link>
        <Link to="#">Profile</Link>
        <Link to="#">About</Link>
        <Link to="#">Contact</Link>
      </nav>

      {/* CTA */}
      <div className="header-right">
        <Link to="/login">
          <button>Sign In</button>
        </Link>
      </div>
    </header>
  );
}
