function HowItWorksSection() {
  const steps = [
    "Employee applies leave",
    "Manager reviews request",
    "Approve or reject",
    "Leave balance updated",
  ];

  return (
    <section className="content-section how-it-works-section">
      <h2>How It Works</h2>
      <div className="steps-list">
        {steps.map((step, index) => (
          <div className="step" key={step}>
            <span className="step-number">{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorksSection;
