export default function Experience() {
  return (
    <section className="pt-[42px] pb-[22px]" id="experience">
      <div className="container grid grid-cols-2 gap-[18px] max-lg:grid-cols-1">
        <div className="card bg-[linear-gradient(180deg,rgba(255,255,255,0.66),rgba(255,255,255,0.42)),linear-gradient(135deg,rgba(255,138,91,0.08),rgba(15,92,115,0.08))] dark:bg-[linear-gradient(180deg,rgba(30,35,40,0.66),rgba(30,35,40,0.42)),linear-gradient(135deg,rgba(255,138,91,0.06),rgba(15,92,115,0.06))]">
          <h3 className="m-0 mb-[10px] text-[color:var(--ocean-dark)] text-[1.18rem] dark:text-[color:var(--heading-dark)]">
            Why Playa de Pineland?
          </h3>
          <p className="m-0 text-[color:var(--muted)] leading-[1.75] text-[0.97rem]">
            The goal is simple: create a space that feels elevated, personal,
            and fun. This is a private backyard court with beach volleyball
            energy and a clean, memorable brand behind it.
          </p>

          <div className="grid gap-[14px] mt-[18px]">
            <div className="flex gap-3 items-start text-[color:var(--muted)] leading-[1.65]">
              <div className="shrink-0 w-7 h-7 rounded-full grid place-items-center bg-[rgba(31,95,74,0.1)] text-[color:var(--palm)] font-extrabold">
                ✓
              </div>
              <div>
                Private court setting with a more curated and comfortable feel.
              </div>
            </div>
            <div className="flex gap-3 items-start text-[color:var(--muted)] leading-[1.65]">
              <div className="shrink-0 w-7 h-7 rounded-full grid place-items-center bg-[rgba(31,95,74,0.1)] text-[color:var(--palm)] font-extrabold">
                ✓
              </div>
              <div>
                Better focus and fewer distractions than public park training.
              </div>
            </div>
            <div className="flex gap-3 items-start text-[color:var(--muted)] leading-[1.65]">
              <div className="shrink-0 w-7 h-7 rounded-full grid place-items-center bg-[rgba(31,95,74,0.1)] text-[color:var(--palm)] font-extrabold">
                ✓
              </div>
              <div>
                Great fit for players who want quality reps and a premium vibe.
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="m-0 mb-[10px] text-[color:var(--ocean-dark)] text-[1.18rem] dark:text-[color:var(--heading-dark)]">
            Location
          </h3>
          <p className="m-0 text-[color:var(--muted)] leading-[1.75] text-[0.97rem]">
            Private court on Pineland Street in Fairfax, VA. Full address shared
            after booking to keep the experience private and streamlined.
          </p>

          <div className="grid gap-[14px] mt-[18px]">
            <div className="flex gap-3 items-start text-[color:var(--muted)] leading-[1.65]">
              <div className="shrink-0 w-7 h-7 rounded-full grid place-items-center bg-[rgba(31,95,74,0.1)] text-[color:var(--palm)] font-extrabold">
                📍
              </div>
              <div>Convenient local training environment</div>
            </div>
            <div className="flex gap-3 items-start text-[color:var(--muted)] leading-[1.65]">
              <div className="shrink-0 w-7 h-7 rounded-full grid place-items-center bg-[rgba(31,95,74,0.1)] text-[color:var(--palm)] font-extrabold">
                🏐
              </div>
              <div>Built for private lessons and small group sessions</div>
            </div>
            <div className="flex gap-3 items-start text-[color:var(--muted)] leading-[1.65]">
              <div className="shrink-0 w-7 h-7 rounded-full grid place-items-center bg-[rgba(31,95,74,0.1)] text-[color:var(--palm)] font-extrabold">
                📩
              </div>
              <div>Booking and questions handled directly</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
