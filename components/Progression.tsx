const levels = [
  {
    tier: "B",
    name: "Beginner / Low Intermediate",
    color: "sand",
    skills: [
      "Bump, set, spike fundamentals",
      "Underhand & overhand serving",
      "Basic 2v2 positioning & communication",
      "Keeping rallies alive in the sand",
    ],
    learn:
      "You're learning the basics of beach doubles — touches are inconsistent, reading your partner and the opposing team is still developing, and moving in sand feels new.",
    recommended: "Open Play – Beginner, Group Clinics",
    cta: "Get Started",
    ctaHref: "#pricing",
  },
  {
    tier: "BB",
    name: "Upper Intermediate / Solid",
    color: "palm",
    skills: [
      "Reliable pass-set-hit sequences",
      "Consistent serve placement",
      "Smart court coverage with your partner",
      "Reading the opposing team's tendencies",
    ],
    learn:
      "You and your partner move as a unit — you communicate on defense, split the court effectively, and can run plays off a good pass.",
    recommended: "Group Clinics",
    cta: "Level Up",
    ctaHref: "#pricing",
  },
  {
    tier: "A",
    name: "Competitive / Advanced",
    color: "ocean",
    skills: [
      "Consistent shot selection (line, cut, pokey)",
      "High game IQ & reading the block",
      "Effective hand signals & defensive schemes",
      "Strong serving & serve-receive as a team",
    ],
    learn:
      "You execute plays and read the game well — you use hand signals, adjust your defensive positioning based on the block, and can place shots around defenders.",
    recommended: "Private Lessons, Group Clinics",
    cta: "Train",
    ctaHref: "#pricing",
  },
  {
    tier: "AA",
    name: "Elite / High-Level",
    color: "sunset",
    skills: [
      "Precise shot selection under pressure",
      "Dominant serving & aggressive attacking",
      "Seamless partner chemistry & transitions",
      "Exceptional consistency in all skills",
    ],
    learn:
      "Top-tier amateur beach doubles — you and your partner play as one, with dominant serving, clean side-outs, and the ability to close out tight sets.",
    recommended: "Private Lessons, Tournaments",
    cta: "Compete",
    ctaHref: "#events",
  },
  {
    tier: "Open",
    name: "Professional / World-Class",
    color: "gold",
    skills: [
      "Elite-level power, speed & sand movement",
      "Flawless shot selection under pressure",
      "Pro-level serving & serve-receive",
      "Complete mastery of every beach doubles skill",
    ],
    learn:
      "The highest tier — former or current pros, D1 beach athletes, and players who compete at the national or international level. Every touch is intentional.",
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
