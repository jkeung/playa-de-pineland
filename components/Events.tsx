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

export default function Events() {
  return (
    <section className="section" id="events">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Events &amp; Tournaments</h2>
            <p>
              From competitive brackets to laid-back socials — there&apos;s
              always something happening on the sand.
            </p>
          </div>
        </div>

        <div className="cards">
          {events.map((e) => (
            <div className="card event-card" key={e.name}>
              <span className={`event-badge event-badge--${e.color}`}>
                {e.category}
              </span>
              <h3>{e.name}</h3>
              <div className="event-meta">
                <span>📅 {e.date}</span>
                <span>🕐 {e.time}</span>
              </div>
              <p>{e.description}</p>
              <div className="event-spots">
                {e.spotsLeft !== null ? (
                  <span className="event-spots-count">
                    {e.spotsLeft} spots left — {e.spots}
                  </span>
                ) : (
                  <span className="event-spots-count">{e.spots}</span>
                )}
              </div>
              <a className="btn btn-primary" href="#booking">
                Sign Up
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
