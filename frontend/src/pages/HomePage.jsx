import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleSubmit = () => {
    alert("our team contact you soon");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Reliable Chartered Accounting Services</h1>
          <p>Your Growth, Our Expertise</p>
          <a href="#contact" className="btn-primary">
            Schedule a Consultation
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2>Our Modules</h2>
          <div className="card-grid">
            {/* bootstrap */}
            <div className="card" style={{ width: "18rem", height: "25rem" }}>
              <img src="./fca.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">FCA</h5>
                <p className="card-text">
                  Automate tax filings, compliance tracking, and regulatory
                  processes.
                </p>
                <a href="/dashboard/services/fca" className="btn btn-primary">
                  Explore..
                </a>
              </div>
            </div>
            <div className="card" style={{ width: "18rem", height: "25rem" }}>
              <img src="./tumbledy.webp" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Tumbledy</h5>
                <p className="card-text">
                  Securely store, organize, and manage all your important
                  documents.
                </p>
                <a
                  href="/dashboard/services/tumbledy"
                  className="btn btn-primary"
                >
                  Explore..
                </a>
              </div>
            </div>
            <div className="card" style={{ width: "18rem", height: "25rem" }}>
              <img src="./pdf.png" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">PDF Viewer</h5>
                <p className="card-text">
                  Upload, preview, and review PDF documents seamlessly.
                </p>
                <a
                  href="/dashboard/services/pdf-viewer"
                  className="btn btn-primary"
                >
                  Explore..
                </a>
              </div>
            </div>
            <div className="card" style={{ width: "18rem", height: "25rem" }}>
              <img src="./report.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Reports & Analytics</h5>
                <p className="card-text">
                  Visualize financial data with charts, KPIs, and custom
                  reports.
                </p>
                <a
                  href="/dashboard/services/reports"
                  className="btn btn-primary"
                >
                  Explore..
                </a>
              </div>
            </div>
            <div className="card" style={{ width: "18rem", height: "25rem" }}>
              <img src="./task.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Task Management</h5>
                <p className="card-text">
                  Assign, track, and complete tasks efficiently with our tools.
                </p>
                <a href="/dashboard/services/tax" className="btn btn-primary">
                  Explore..
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news" id="news">
        <div className="container">
          <h2>Latest Updates</h2>
          <div className="card-grid">
            <div className="news-card">
              <div className="card" style={{ width: "45rem", height: "13rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Budget 2025 Highlights</h5>
                  <p className="card-text">
                    Budget 2025 Increase said the Narendra Modi.
                  </p>
                  <span className="date">Feb 2025</span>
                </div>
              </div>
            </div>

            <div className="news-card">
              <div className="card" style={{ width: "45rem", height: "13rem" }}>
                <div className="card-body">
                  <h5 className="card-title">GST Return Due Dates</h5>
                  <p className="card-text">
                    Check the updated due dates to avoid penalties.
                  </p>
                  <span className="date">Jan 2025</span>
                </div>
              </div>
            </div>
            <div className="news-card">
              <div className="card" style={{ width: "45rem", height: "13rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Startup Compliance Tips</h5>
                  <p className="card-text">
                    Essential financial steps for new entrepreneurs in India.
                  </p>
                  <span className="date">Dec 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team" id="team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="card-grid">
            <div className="team-card">
              <div className="card" style={{ width: "18rem", height: "25rem" }}>
                <img src="./founder.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">CA Rajiv Sharma</h5>
                  <p>Founder & Managing Partner</p>
                </div>
              </div>
            </div>

            <div className="team-card">
              <div className="card" style={{ width: "18rem", height: "25rem" }}>
                <img src="./partner1.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">CA Rohit Verma</h5>
                  <p>Associate Partner</p>
                </div>
              </div>
            </div>
            <div className="team-card">
              <div className="card" style={{ width: "18rem", height: "25rem" }}>
                <img src="./partner2.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">CA Rohit Mehra</h5>
                  <p>Senior Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="How can we help you?" required></textarea>
            <button
              type="submit"
              className="btn-primary"
              onClick={handleSubmit}
            >
              Send Message
            </button>
          </form>
          <div className="contact-details">
            <p>
              <b>Email:</b> info@abc-ca.com
            </p>
            <p>
              <b>Phone:</b> +91 12345 67890
            </p>
            <p>
              <b>Address:</b> 2th Floor,Sharda Associate,Gulmohar Colony, Bhopal
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
