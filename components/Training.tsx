export default function Training() {
  return (
    <section className="pt-[42px] pb-[22px]" id="training">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-[color:var(--heading-dark)]">
              Train your way
            </h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              A premium backyard training setup built for personal attention,
              good reps, and a great atmosphere.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div className="card">
            <div className="w-[52px] h-[52px] rounded-[18px] grid place-items-center bg-[linear-gradient(135deg,rgba(255,138,91,0.18),rgba(15,92,115,0.12))] mb-[18px] text-[1.3rem]">
              🔥
            </div>
            <h3 className="m-0 mb-[10px] text-[color:var(--ocean-dark)] text-[1.18rem] dark:text-[color:var(--heading-dark)]">
              Private Coaching
            </h3>
            <p className="m-0 text-[color:var(--muted)] leading-[1.75] text-[0.97rem]">
              One-on-one sessions focused on fundamentals, movement, ball
              control, decision making, and confidence on sand.
            </p>
          </div>

          <div className="card">
            <div className="w-[52px] h-[52px] rounded-[18px] grid place-items-center bg-[linear-gradient(135deg,rgba(255,138,91,0.18),rgba(15,92,115,0.12))] mb-[18px] text-[1.3rem]">
              🌴
            </div>
            <h3 className="m-0 mb-[10px] text-[color:var(--ocean-dark)] text-[1.18rem] dark:text-[color:var(--heading-dark)]">
              Small Group Training
            </h3>
            <p className="m-0 text-[color:var(--muted)] leading-[1.75] text-[0.97rem]">
              Bring a partner or a few friends for a more competitive and
              collaborative training environment.
            </p>
          </div>

          <div className="card">
            <div className="w-[52px] h-[52px] rounded-[18px] grid place-items-center bg-[linear-gradient(135deg,rgba(255,138,91,0.18),rgba(15,92,115,0.12))] mb-[18px] text-[1.3rem]">
              ☀️
            </div>
            <h3 className="m-0 mb-[10px] text-[color:var(--ocean-dark)] text-[1.18rem] dark:text-[color:var(--heading-dark)]">
              Backyard Experience
            </h3>
            <p className="m-0 text-[color:var(--muted)] leading-[1.75] text-[0.97rem]">
              More than a lesson — a relaxed, polished, destination-style
              training experience right here in Fairfax.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
