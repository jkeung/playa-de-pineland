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
    <section className="pt-[42px] pb-[22px]" id="coaches">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Meet Your Coaches</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              Experienced, passionate, and invested in every player&apos;s
              growth — from first-timers to tournament veterans.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {coaches.map((c) => (
            <div className="card flex flex-col items-center text-center" key={c.name}>
              <div className="w-16 h-16 rounded-full bg-[linear-gradient(135deg,var(--ocean),var(--sunset))] grid place-items-center text-white font-bold text-[1.05rem] mb-[14px] shrink-0">{c.initials}</div>
              <h3 className="m-0 mb-1 text-[color:var(--ocean-dark)] text-[1.18rem] dark:text-heading-dark">{c.name}</h3>
              <span className="block text-[0.88rem] font-semibold text-[color:var(--sunset)] mb-3 uppercase tracking-[0.04em]">{c.role}</span>
              <p className="m-0 mb-[14px] text-[color:var(--muted)] leading-[1.75] text-[0.95rem]">{c.bio}</p>
              <div className="flex flex-wrap gap-[6px] justify-center mt-auto">
                {c.specialties.map((s) => (
                  <span className="py-1 px-3 rounded-full bg-[rgba(15,92,115,0.08)] text-[color:var(--ocean-dark)] text-[0.8rem] font-semibold dark:bg-[rgba(15,92,115,0.2)] dark:text-[#9cc9d6]" key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
