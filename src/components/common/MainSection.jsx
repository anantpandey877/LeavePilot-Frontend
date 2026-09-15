function MainSection() {
  return (
    <main className="main-section">

      <section className="intro-section">
        <h1>LeavePilot</h1>

        <p className="intro-tagline">
          Simple Leave Management System
        </p>

        <p className="intro-description">
          Apply, track and manage employee leave
          requests through a streamlined approval
          workflow.
        </p>

        <div className="intro-actions">
          <button type="button">Login</button>

          <button type="button">Register</button>
        </div>
      </section>

      <section className="info-section">
        <h2>Who We Are</h2>

        <p>
          LeavePilot is a leave management platform
          designed to simplify employee leave
          tracking and approval processes.
        </p>
      </section>

      <section className="info-section">
        <h2>How It Works</h2>

        <ol>
          <li>Employee applies for leave</li>

          <li>Manager reviews request</li>

          <li>System updates leave balance</li>
        </ol>
      </section>

    </main>
  );
}

export default MainSection;