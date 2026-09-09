function FeaturesSection() {
  const features = [
    {
      title: "Apply Leave",
      description: "Submit leave requests quickly from one convenient place.",
    },
    {
      title: "Track Leave Balance",
      description: "Check your available leave balance whenever you need it.",
    },
    {
      title: "Manager Approval Workflow",
      description: "Managers can review, approve, or reject requests easily.",
    },
    {
      title: "Admin User Management",
      description: "Admins can manage employees, roles, and leave settings.",
    },
  ];

  return (
    <section id="features" className="content-section">
      <h2>Features</h2>
      <div className="feature-list">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
