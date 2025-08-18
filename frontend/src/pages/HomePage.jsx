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
          <a href="#contact" className="cta-btn">
            Schedule a Consultation
          </a>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <div className="container about-container">
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              ABC & Co. (now Sharda Associate) has been serving individuals and
              businesses with excellence and integrity for over 20 years. Our
              expert team delivers personalized solutions for all your tax,
              audit, and financial needs.
            </p>
          </div>
          <img src="./office.jpg" alt="Our Office" className="office-photo" />
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="card-grid">
            <div className="card">
              <img src="tax.jpg" alt="Tax Filing" />
              <h3>Tax Filing & Advisory</h3>
              <p>Seamless ITR filing, compliance, and tax optimization.</p>
            </div>
            <div className="card">
              <img src="gst.jpg" alt="GST Services" />
              <h3>GST Services</h3>
              <p>Registration, returns, audits, and litigation support.</p>
            </div>
            <div className="card">
              <img src="audit.jpg" alt="Audit & Assurance" />
              <h3>Audit & Assurance</h3>
              <p>Building trust with accurate and transparent audits.</p>
            </div>
            <div className="card">
              <img src="business.jpg" alt="Business Advisory" />
              <h3>Business Advisory</h3>
              <p>Strategic financial planning for sustainable growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="why-us">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>
              <strong>Expert Team:</strong> Qualified and experienced
              professionals.
            </li>
            <li>
              <strong>Personalized Service:</strong> Tailored financial
              solutions.
            </li>
            <li>
              <strong>Transparent Pricing:</strong> No hidden fees.
            </li>
            <li>
              <strong>On-Time Delivery:</strong> Commitment to deadlines.
            </li>
          </ul>
        </div>
      </section>

      {/* News */}
      <section className="news" id="news">
        <div className="container">
          <h2>Latest Updates</h2>
          <div className="card-grid">
            <div className="card">
              <h3>Budget 2025 Highlights</h3>
              <p>
                Key takeaways for businesses & individuals from Union Budget
                2025.
              </p>
              <span className="date">Feb 2025</span>
            </div>
            <div className="card">
              <h3>GST Return Due Dates</h3>
              <p>Check the updated due dates to avoid penalties.</p>
              <span className="date">Jan 2025</span>
            </div>
            <div className="card">
              <h3>Startup Compliance Tips</h3>
              <p>Essential financial steps for new entrepreneurs in India.</p>
              <span className="date">Dec 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <p>
                "Extremely professional and reliable. Highly recommend for
                businesses of any size."
              </p>
              <span>- Priya Sinha, CEO, StarTech</span>
            </div>
            <div className="testimonial">
              <p>"They guided my startup to financial clarity!"</p>
              <span>- Amit Gupta, Entrepreneur</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team" id="team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="founder.jpg" alt="Founder" />
              <h3>CA Rajiv Sharma</h3>
              <p>Founder & Managing Partner</p>
            </div>
            <div className="team-member">
              <img src="partner1.jpg" alt="Partner" />
              <h3>CA Anjali Mehra</h3>
              <p>Senior Partner</p>
            </div>
            <div className="team-member">
              <img src="partner2.jpg" alt="Partner" />
              <h3>CA Rohit Verma</h3>
              <p>Associate Partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contact">
        <div className="container contact-container">
          <div className="contact-info">
            <h2>Contact Us</h2>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="How can we help you?" required></textarea>
              <button type="submit">Send Message</button>
            </form>
            <div className="office-info">
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:info@abc-ca.com">info@abc-ca.com</a>
              </p>
              <p>
                <strong>Phone:</strong> +91 12345 67890
              </p>
              <p>
                <strong>Address:</strong> 5th Floor, Business Plaza, New Delhi
              </p>
            </div>
          </div>
          <div className="map-section">
            {/* Replace q=Business+Plaza+New+Delhi with your actual Google map place if needed */}
            <iframe
              title="Office Location"
              src="https://www.google.com/maps?q=Business+Plaza,+New+Delhi&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "260px", borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
