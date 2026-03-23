const events = [
  {
    name: "Summer Smash Tournament",
    category: "Tournament",
    color: "ocean",
    date: "June 14, 2026",
    time: "8:00 AM – 4:00 PM",
    description:
      "Doubles format, round-robin into single elimination. Prizes for top 3 teams plus a raffle for all participants.",
    spots: "16 teams max",
    spotsLeft: 5,
  },
  {
    name: "Beginner Bootcamp",
    category: "Clinic",
    color: "sunset",
    date: "Every Saturday in July",
    time: "9:00 AM – 11:00 AM",
    description:
      "A 4-week progressive series covering passing, setting, hitting, and game play. No experience needed — just bring water and sunscreen.",
    spots: "12 spots per session",
    spotsLeft: 8,
  },
  {
    name: "Sunset Social",
    category: "Social",
    color: "palm",
    date: "Monthly — Next: July 18, 2026",
    time: "5:00 PM – 8:00 PM",
    description:
      "Casual open play, rotating teams, and a post-match BBQ. The most fun you'll have on a Friday evening without leaving Fairfax.",
    spots: "Drop-in welcome",
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
