export default function Hero() {
  return (
    <div className="py-[18px]">
      <div className="inline-flex items-center gap-2 py-[10px] px-[14px] rounded-full bg-[rgba(248,250,244,0.7)] border border-[rgba(8,57,72,0.08)] text-[color:var(--ocean-dark)] font-bold text-[0.9rem] shadow-[0_8px_20px_rgba(8,57,72,0.06)] dark:bg-[rgba(30,35,40,0.7)] dark:border-[rgba(255,255,255,0.06)]">
        🏐 Private sand court • Fairfax, VA
      </div>
      <h1 className="text-[clamp(3rem,6vw,5.4rem)] leading-[0.95] mt-[18px] mb-4 tracking-[-0.04em] text-[color:var(--ocean-dark)] dark:text-[color:var(--heading-dark)] max-md:leading-none">
        Playa de Pineland
      </h1>
      <p className="text-[1.1rem] leading-[1.75] text-[color:var(--muted)] max-w-[640px] mb-7">
        Your Backyard Beach Volleyball Experience. Private coaching and small
        group training on a premium backyard sand court built for skill
        development, competition, and fun.
      </p>

      <div className="flex gap-[14px] flex-wrap mb-7">
        <a
          className="btn btn-primary"
          href="/group-classes"
        >
          View Classes
        </a>
        <a className="btn btn-secondary" href="/group-classes#class-calendar">
          View Calendar
        </a>
      </div>

      <div className="grid grid-cols-3 gap-[14px] mt-[30px] max-w-[700px] max-lg:grid-cols-2 max-sm:grid-cols-1">
        <div className="bg-[rgba(248,250,244,0.62)] border border-[rgba(255,255,255,0.35)] rounded-[20px] p-[18px] shadow-[0_12px_28px_rgba(8,57,72,0.08)] dark:bg-[rgba(30,35,40,0.6)] dark:border-[rgba(255,255,255,0.06)]">
          <strong className="block text-[1.4rem] text-[color:var(--ocean-dark)] mb-[6px] dark:text-[color:var(--heading-dark)]">
            Private
          </strong>
          <span className="text-[color:var(--muted)] text-[0.92rem]">
            Train on a dedicated backyard sand court, away from crowded public
            spaces.
          </span>
        </div>
        <div className="bg-[rgba(248,250,244,0.62)] border border-[rgba(255,255,255,0.35)] rounded-[20px] p-[18px] shadow-[0_12px_28px_rgba(8,57,72,0.08)] dark:bg-[rgba(30,35,40,0.6)] dark:border-[rgba(255,255,255,0.06)]">
          <strong className="block text-[1.4rem] text-[color:var(--ocean-dark)] mb-[6px] dark:text-[color:var(--heading-dark)]">
            Focused
          </strong>
          <span className="text-[color:var(--muted)] text-[0.92rem]">
            Build technique, movement, and confidence with intentional reps.
          </span>
        </div>
        <div className="bg-[rgba(248,250,244,0.62)] border border-[rgba(255,255,255,0.35)] rounded-[20px] p-[18px] shadow-[0_12px_28px_rgba(8,57,72,0.08)] dark:bg-[rgba(30,35,40,0.6)] dark:border-[rgba(255,255,255,0.06)]">
          <strong className="block text-[1.4rem] text-[color:var(--ocean-dark)] mb-[6px] dark:text-[color:var(--heading-dark)]">
            Flexible
          </strong>
          <span className="text-[color:var(--muted)] text-[0.92rem]">
            Great for 1-on-1 sessions, partner work, and small groups.
          </span>
        </div>
      </div>
    </div>
  );
}
