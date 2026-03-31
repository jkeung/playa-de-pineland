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
    <section className="pt-[42px] pb-[22px]">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">What Players Say</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              Don&apos;t just take our word for it — hear from the community
              that keeps coming back.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {testimonials.map((t) => (
            <div className="card flex flex-col justify-between" key={t.name}>
              <p className="italic leading-[1.75] text-[color:var(--muted)] text-[0.97rem] m-0 mb-[18px]">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[linear-gradient(135deg,var(--ocean),var(--sunset))] grid place-items-center text-white font-bold text-[0.85rem] shrink-0">{t.initials}</div>
                <div>
                  <strong className="block text-[0.95rem] text-[color:var(--ocean-dark)] dark:text-heading-dark">{t.name}</strong>
                  <span className="block text-[0.85rem] text-[color:var(--muted)]">{t.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
