import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);

  // Dummy Data (later you’ll fetch from backend API)
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

    setTeam([
      {
        id: 1,
        name: "CA Rajiv Sharma",
        role: "Founder & Managing Partner",
        img: "./founder.jpg",
      },
      {
        id: 2,
        name: "CA Rohit Verma",
        role: "Associate Partner",
        img: "./partner1.jpg",
      },
      {
        id: 3,
        name: "CA Rohit Mehra",
        role: "Senior Partner",
        img: "./partner2.jpg",
      },
    ]);
  }, []);

  return (
    <div>
      {/* Services Section */}
      <section className="services py-5" id="services">
        <div className="container">
          <h2 className="mb-4">Our Modules</h2>
          <div className="row">
            {services.map((srv) => (
              <div key={srv.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img src={srv.img} className="card-img-top" alt={srv.title} />
                  <div className="card-body">
                    <h5 className="card-title">{srv.title}</h5>
                    <p className="card-text">{srv.desc}</p>
                    <a href="/login" className="btn btn-primary">
                      Login to Access
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team py-5" id="team">
        <div className="container">
          <h2 className="mb-4">Meet Our Team</h2>
          <div className="row">
            {team.map((member) => (
              <div key={member.id} className="col-md-4 mb-4">
                <div className="card h-100 text-center">
                  <img
                    src={member.img}
                    className="card-img-top"
                    alt={member.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{member.name}</h5>
                    <p className="card-text">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
