const testimonials = [
  {
    quote:
      "The courts at Playa de Pineland are unreal — sand quality rivals anything I've played on in California. Coaching was top-notch too.",
    name: "Alex M.",
    detail: "Competitive player, 3 years",
    initials: "AM",
  },
  {
    quote:
      "I signed up as a complete beginner and within a few sessions I was rallying confidently. The vibe is so welcoming you forget you're exercising.",
    name: "Sarah K.",
    detail: "Recreational player",
    initials: "SK",
  },
  {
    quote:
      "Golden-hour sessions are something else. Great workout, great people, and you're literally on the beach. Can't beat it.",
    name: "Jordan T.",
    detail: "Weekend regular",
    initials: "JT",
  },
];

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>What Players Say</h2>
            <p>
              Don&apos;t just take our word for it — hear from the community
              that keeps coming back.
            </p>
          </div>
        </div>

        <div className="cards">
          {testimonials.map((t) => (
            <div className="card testimonial-card" key={t.name}>
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="avatar">{t.initials}</div>
                <div>
                  <strong className="testimonial-name">{t.name}</strong>
                  <span className="testimonial-detail">{t.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
