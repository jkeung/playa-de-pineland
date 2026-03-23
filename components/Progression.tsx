const levels = [
  {
    tier: "B",
    name: "Beginner / Low Intermediate",
    color: "sand",
    skills: [
      "Bump, set, spike fundamentals",
      "Overhand serving",
      "Basic rules & rotation",
      "Keeping rallies alive",
    ],
    learn:
      "You know the basics but lack consistency — sets are imprecise, mistakes are frequent, and blocking strategy is still new territory.",
    recommended: "Drop-In sessions, Beginner Bootcamp",
    cta: "Get Started",
    ctaHref: "#pricing",
  },
  {
    tier: "BB",
    name: "Upper Intermediate / Solid",
    color: "palm",
    skills: [
      "Reliable pass/set/spike",
      "7/10 passing accuracy",
      "Directional overhand serve",
      "Positioning & blocking awareness",
    ],
    learn:
      "You have solid ball control, understand where to be on the court, and regularly play with a blocker up.",
    recommended: "Group Clinics",
    cta: "Level Up",
    ctaHref: "#pricing",
  },
  {
    tier: "A",
    name: "Competitive / Advanced",
    color: "ocean",
    skills: [
      "Consistent shot placement",
      "High game IQ & court awareness",
      "Quick plays & hard-hit defense",
      "Effective blocking",
    ],
    learn:
      "Strong fundamentals across serving, passing, setting, and spiking — you execute plays and read the game, but may lack the raw power or speed of AA players.",
    recommended: "Private Lessons, Group Clinics",
    cta: "Train",
    ctaHref: "#pricing",
  },
  {
    tier: "AA",
    name: "Elite / High-Level",
    color: "sunset",
    skills: [
      "Precise shot selection",
      "Advanced blocking & aggressive hitting",
      "Reliable passing under pressure",
      "Exceptional consistency in all skills",
    ],
    learn:
      "Top-tier amateur play — high-level proficiency in every aspect of the game with consistent, dominant performance.",
    recommended: "Private Lessons, Summer Smash Tournament",
    cta: "Compete",
    ctaHref: "#events",
  },
  {
    tier: "Open",
    name: "Professional / World-Class",
    color: "gold",
    skills: [
      "Elite-level power, speed & athleticism",
      "Flawless shot selection under pressure",
      "Pro-level serve & serve-receive",
      "Complete mastery of every skill",
    ],
    learn:
      "The highest tier — former or current pros, D1 athletes, and players who compete at the national or international level. Every touch is intentional.",
    recommended: "Private Lessons, Tournament Prep",
    cta: "Go Pro",
    ctaHref: "#pricing",
  },
];

export default function Progression() {
  return (
    <section className="section" id="progression">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Your Path to the Sand</h2>
            <p>
              Whether you&apos;re picking up a volleyball for the first time or
              gunning for tournament gold — here&apos;s the roadmap.
            </p>
          </div>
        </div>

        <div className="progression-road">
          {levels.map((level, i) => (
            <div className="progression-node" key={level.tier}>
              {i > 0 && <div className="progression-connector" />}
              <div className={`progression-badge progression-badge--${level.color}`}>
                {level.tier}
              </div>
              <div className="progression-content">
                <h3>{level.name}</h3>
                <ul className="progression-skills">
                  {level.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <p className="progression-learn">{level.learn}</p>
                <span className="progression-rec">
                  Recommended: {level.recommended}
                </span>
                <a className="btn btn-secondary" href={level.ctaHref}>
                  {level.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
