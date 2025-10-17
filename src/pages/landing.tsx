import React from "react";
import { Link } from "react-router-dom";


const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Track Your Job Applications Easily</h1>
          <p>
            Stay on top of your job hunt! See which applications are pending,
            accepted, or rejected. Organize and monitor your progress all in one
            place.
          </p>
          <Link to="/register" className="cta-button">
            Get Started
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
            alt="Job Tracker"
          />
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Add Jobs</h3>
            <p>
              Add jobs you applied for with company, role, status, date applied
              and extra details.
            </p>
          </div>
          <div className="card">
            <h3>Track Status</h3>
            <p>
              See your job applications in different statuses: Applied,
              Interviewed, or Rejected.
            </p>
          </div>
          <div className="card">
            <h3>Search & Filter</h3>
            <p>
              Search by company or role, filter by status, and sort by date
              easily.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Start Tracking Your Jobs Today</h2>
        <Link to="/register" className="cta-button">
          Sign Up Now
        </Link>
      </section>

      <footer className="footer">
        &copy; 2025 Job Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
