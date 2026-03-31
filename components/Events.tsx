const events = [
  {
    name: "Tournament",
    category: "Tournament",
    color: "ocean",
    date: "Coming Soon",
    time: "TBD",
    description:
      "Stay tuned for our first tournament. Details and registration coming soon!",
    spots: "TBD",
    spotsLeft: null,
  },
  {
    name: "Clinic Series",
    category: "Clinic",
    color: "sunset",
    date: "Coming Soon",
    time: "TBD",
    description:
      "Multi-week progressive clinics for all skill levels. Check back for dates and details.",
    spots: "TBD",
    spotsLeft: null,
  },
  {
    name: "Social Event",
    category: "Social",
    color: "palm",
    date: "Coming Soon",
    time: "TBD",
    description:
      "Casual open play, rotating teams, and good vibes. Details coming soon!",
    spots: "TBD",
    spotsLeft: null,
  },
];

const badgeGradient: Record<string, string> = {
  ocean: "bg-[linear-gradient(135deg,var(--ocean),var(--ocean-dark))]",
  sunset: "bg-[linear-gradient(135deg,var(--sunset),#e0704a)]",
  palm: "bg-[linear-gradient(135deg,var(--palm),#2d7b5f)]",
};

export default function Events() {
  return (
    <section className="pt-[42px] pb-[22px]" id="events">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Events &amp; Tournaments</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              From competitive brackets to laid-back socials — there&apos;s
              always something happening on the sand.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {events.map((e) => (
            <div className="card event-card flex flex-col" key={e.name}>
              <span
                className={`inline-block self-start text-[0.78rem] font-bold py-1 px-[14px] rounded-full tracking-[0.04em] uppercase text-white mb-[14px] ${badgeGradient[e.color]}`}
              >
                {e.category}
              </span>
              <h3 className="m-0 mb-[10px] text-[color:var(--ocean-dark)] text-[1.18rem] dark:text-heading-dark">{e.name}</h3>
              <div className="flex flex-col gap-1 mb-3 text-[0.9rem] text-[color:var(--muted)]">
                <span>📅 {e.date}</span>
                <span>🕐 {e.time}</span>
              </div>
              <p className="m-0 mb-4 text-[color:var(--muted)] leading-[1.75] text-[0.95rem]">{e.description}</p>
              <div className="mb-[18px] mt-auto">
                {e.spotsLeft !== null ? (
                  <span className="text-[0.88rem] font-semibold text-[color:var(--ocean-dark)] dark:text-heading-dark">
                    {e.spotsLeft} spots left — {e.spots}
                  </span>
                ) : (
                  <span className="text-[0.88rem] font-semibold text-[color:var(--ocean-dark)] dark:text-heading-dark">{e.spots}</span>
                )}
              </div>
              <a className="btn btn-primary w-full" href="#booking">
                Sign Up
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
