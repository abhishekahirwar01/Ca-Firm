import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices([
      {
        id: 1,
        title: "FCA",
        desc: "Automate tax filings, compliance tracking, and regulatory processes.",
        img: "./fca.jpg",
        link: "/dashboard/services/fca",
      },
      {
        id: 2,
        title: "Tumbledy",
        desc: "Securely store, organize, and manage all your important documents.",
        img: "./tumbledy.webp",
        link: "/dashboard/services/tumbledy",
      },
      {
        id: 3,
        title: "PDF Viewer",
        desc: "Upload, preview, and review PDF documents seamlessly.",
        img: "./pdf.png",
        link: "/dashboard/services/pdf-viewer",
      },
      {
        id: 4,
        title: "Reports & Analytics",
        desc: "Visualize financial data with charts, KPIs, and custom reports.",
        img: "./report.jpg",
        link: "/dashboard/services/reports",
      },
      {
        id: 5,
        title: "Task Management",
        desc: "Assign, track, and complete tasks efficiently with our tools.",
        img: "./task.jpg",
        link: "/dashboard/services/tax",
      },
    ]);
  }, []);

  return (
    <div>
      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2 className="section-title">Our Softwares</h2>
          <div className="card-grid">
            {services.map((srv) => (
              <div key={srv.id} className="card">
                <img src={srv.img} alt={srv.title} />
                <h5 className="card-title">{srv.title}</h5>
                <p className="card-text">{srv.desc}</p>
                <Link to="/login" className="btn login-btn">
                  Login to Access
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
