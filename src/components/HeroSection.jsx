import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-section">
      <h1>LeavePilot</h1>
      <h2>Smart Leave Management System</h2>
      <p>
        Manage leave requests, balances, and approvals easily in one simple
        system.
      </p>
      <div className="hero-buttons">
        <Link className="primary-button" to="/register">Get Started</Link>
        <Link className="secondary-button" to="/login">Login</Link>
      </div>
    </section>
  );
}

export default HeroSection;
