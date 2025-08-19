import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <Link to="/dashboard/services/fca" className="service-card">
              <img src="fca.jpg" alt="FCA" />
              <h3>FCA</h3>
              <p>
                Automate tax filings, compliance tracking, and regulatory
                processes.
              </p>
            </Link>

            <Link to="/dashboard/services/tumbledy" className="service-card">
              <img src="tumbledy.jpg" alt="Tumbledy" />
              <h3>Tumbledy</h3>
              <p>
                Securely store, organize, and manage all your important
                documents.
              </p>
            </Link>

            <Link to="/dashboard/services/pdf-viewer" className="service-card">
              <img src="pdf.jpg" alt="PDF Viewer" />
              <h3>PDF Viewer</h3>
              <p>Upload, preview, and review PDF documents seamlessly.</p>
            </Link>

            <Link to="/dashboard/services/reports" className="service-card">
              <img src="analytics.jpg" alt="Reports & Analytics" />
              <h3>Reports & Analytics</h3>
              <p>
                Visualize financial data with charts, KPIs, and custom reports.
              </p>
            </Link>

            <Link to="/dashboard/services/tax" className="service-card">
              <img src="tax.jpg" alt="Task Management" />
              <h3>Task Management</h3>
              <p>
                Assign, track, and complete tasks efficiently with our tools.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news" id="news">
        <div className="container">
          <h2>Latest Updates</h2>
          <div className="card-grid">
            <div className="news-card">
              <h3>Budget 2025 Highlights</h3>
              <p>
                Key takeaways for businesses & individuals from Union Budget
                2025.
              </p>
              <span className="date">Feb 2025</span>
            </div>
            <div className="news-card">
              <h3>GST Return Due Dates</h3>
              <p>Check the updated due dates to avoid penalties.</p>
              <span className="date">Jan 2025</span>
            </div>
            <div className="news-card">
              <h3>Startup Compliance Tips</h3>
              <p>Essential financial steps for new entrepreneurs in India.</p>
              <span className="date">Dec 2024</span>
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
              <img src="founder.jpg" alt="Founder" />
              <h3>CA Rajiv Sharma</h3>
              <p>Founder & Managing Partner</p>
            </div>
            <div className="team-card">
              <img src="partner1.jpg" alt="Partner" />
              <h3>CA Anjali Mehra</h3>
              <p>Senior Partner</p>
            </div>
            <div className="team-card">
              <img src="partner2.jpg" alt="Partner" />
              <h3>CA Rohit Verma</h3>
              <p>Associate Partner</p>
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
            <button type="submit" className="btn-primary">
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
              <b>Address:</b> 5th Floor, Business Plaza, New Delhi
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
