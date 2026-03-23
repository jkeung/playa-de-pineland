const coaches = [
  {
    name: "Mike Reeves",
    initials: "MR",
    role: "Head Coach",
    bio: "CBVA-certified with 10+ years of coaching experience. Mike specializes in technique refinement and competitive strategy — from your serve toss to your defensive reads.",
    specialties: ["Technique", "Strategy", "Advanced Play"],
  },
  {
    name: "Daniela Cruz",
    initials: "DC",
    role: "Assistant Coach",
    bio: "Active tournament player who brings game-day intensity to every clinic. Daniela runs our group sessions and knows how to push you just the right amount.",
    specialties: ["Group Clinics", "Tournament Prep", "Hitting"],
  },
  {
    name: "Chris Nakamura",
    initials: "CN",
    role: "Youth Director",
    bio: "Former D1 player turned junior development specialist. Chris runs our school partnership programs and makes sure the next generation falls in love with the game.",
    specialties: ["Junior Development", "School Programs", "Fundamentals"],
  },
];

export default function Coaches() {
  return (
    <section className="section" id="coaches">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Meet Your Coaches</h2>
            <p>
              Experienced, passionate, and invested in every player&apos;s
              growth — from first-timers to tournament veterans.
            </p>
          </div>
        </div>

        <div className="cards">
          {coaches.map((c) => (
            <div className="card coach-card" key={c.name}>
              <div className="coach-avatar">{c.initials}</div>
              <h3 className="coach-name">{c.name}</h3>
              <span className="coach-role">{c.role}</span>
              <p>{c.bio}</p>
              <div className="coach-specialties">
                {c.specialties.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
