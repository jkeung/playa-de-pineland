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
    <section className="pt-[42px] pb-[22px]" id="progression">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Your Path to the Sand</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              Whether you&apos;re picking up a volleyball for the first time or
              gunning for tournament gold — here&apos;s the roadmap.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 relative max-lg:grid-cols-1 max-lg:gap-6">
          {levels.map((level, i) => (
            <div
              className="flex flex-col items-center text-center relative px-[10px] max-sm:flex-col max-sm:text-center max-sm:gap-0 max-sm:px-0"
              key={level.tier}
            >
              {i > 0 && (
                <div className="absolute top-7 right-1/2 w-full h-[3px] bg-[linear-gradient(90deg,rgba(8,57,72,0.12),rgba(8,57,72,0.12))] z-0 max-lg:hidden" />
              )}
              <div className={`progression-badge progression-badge--${level.color}`}>
                {level.tier}
              </div>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] py-[22px] px-[18px] shadow-[0_12px_30px_rgba(8,57,72,0.08)] backdrop-blur-[10px] flex flex-col items-center flex-1">
                <h3 className="m-0 mb-3 text-[color:var(--ocean-dark)] text-[1.08rem] dark:text-[color:var(--heading-dark)] max-sm:text-[0.95rem]">
                  {level.name}
                </h3>
                <ul className="progression-skills list-none p-0 m-0 mb-[14px] grid gap-[6px] w-full">
                  {level.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <p className="m-0 mb-3 text-[color:var(--muted)] text-[0.92rem] leading-[1.7] italic max-sm:text-[0.82rem]">
                  {level.learn}
                </p>
                <span className="block text-[0.82rem] font-semibold text-[color:var(--ocean-dark)] mb-4 mt-auto dark:text-[color:var(--heading-dark)]">
                  Recommended: {level.recommended}
                </span>
                <a
                  className="btn btn-secondary w-full py-[10px] px-[18px] text-[0.9rem]"
                  href={level.ctaHref}
                >
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
