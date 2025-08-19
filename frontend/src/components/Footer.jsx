import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
        <Link to="/services">Services</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </p>
      <p>© 2025 ABC & Co. Chartered Accountants</p>
    </footer>
  );
}
