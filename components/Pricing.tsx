const tiers = [
  {
    name: "Open Play",
    price: "$0",
    unit: "/session",
    features: [
      "3-hour open-play session",
      "All skill levels welcome",
      "Equipment available on-site",
      "No commitment required",
    ],
  },
  {
    name: "Group Clinic",
    price: "$0",
    unit: "/session",
    popular: true,
    features: [
      "2-hour coach-led session",
      "Drills, strategy & live games",
      "Small groups (max 8)",
      "Skill-matched groupings",
    ],
  },
  {
    name: "Private Lesson",
    price: "$0",
    unit: "/session",
    features: [
      "1-on-1 with a certified coach",
      "Personalized training plan",
      "Video analysis included",
      "Flexible scheduling",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Simple, Transparent Pricing</h2>
            <p>
              Whether you&rsquo;re dropping in for a casual game or committing to
              structured coaching, we have a plan that fits.
            </p>
          </div>
        </div>

        <div className="cards">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`card pricing-card${tier.popular ? " pricing-card--popular" : ""}`}
            >
              {tier.popular && <span className="pricing-badge">Popular</span>}
              <h3>{tier.name}</h3>
              <div className="pricing-price">
                {tier.price}
                <span>{tier.unit}</span>
              </div>
              <ul className="pricing-features">
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                className={`btn ${tier.popular ? "btn-primary" : "btn-secondary"}`}
                href="#booking"
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
