import Link from "next/link";

export default function Training() {
  return (
    <section className="pt-[42px] pb-[22px]" id="training">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-[color:var(--heading-dark)]">
              About Playa de Pineland
            </h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              A private backyard sand court in Fairfax built for focused reps,
              friendly competition, and a better way to play beach volleyball.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div className="card">
            <div className="w-[52px] h-[52px] rounded-[18px] grid place-items-center bg-[linear-gradient(135deg,rgba(255,138,91,0.18),rgba(15,92,115,0.12))] mb-[18px] text-[1.3rem]">
              🔥
            </div>
            <h3 className="m-0 mb-[10px] text-[color:var(--ocean-dark)] text-[1.18rem] dark:text-[color:var(--heading-dark)]">
              Private Court
            </h3>
            <p className="m-0 text-[color:var(--muted)] leading-[1.75] text-[0.97rem]">
              Train and play on a dedicated backyard sand court without the
              crowding and interruptions of a public park.
            </p>
          </div>

          <div className="card flex flex-col">
            <div className="w-[52px] h-[52px] rounded-[18px] grid place-items-center bg-[linear-gradient(135deg,rgba(255,138,91,0.18),rgba(15,92,115,0.12))] mb-[18px] text-[1.3rem]">
              🌴
            </div>
            <h3 className="m-0 mb-[10px] text-[color:var(--ocean-dark)] text-[1.18rem] dark:text-[color:var(--heading-dark)]">
              Group Classes
            </h3>
            <p className="m-0 text-[color:var(--muted)] leading-[1.75] text-[0.97rem]">
              Coach-led beginner and intermediate sessions with skill themes,
              high-touch drills, partner work, and live play.
            </p>
            <Link className="btn btn-secondary mt-5 w-full" href="/group-classes">
              View Group Classes
            </Link>
          </div>

          <div className="card">
            <div className="w-[52px] h-[52px] rounded-[18px] grid place-items-center bg-[linear-gradient(135deg,rgba(255,138,91,0.18),rgba(15,92,115,0.12))] mb-[18px] text-[1.3rem]">
              ☀️
            </div>
            <h3 className="m-0 mb-[10px] text-[color:var(--ocean-dark)] text-[1.18rem] dark:text-[color:var(--heading-dark)]">
              Private Coaching
            </h3>
            <p className="m-0 text-[color:var(--muted)] leading-[1.75] text-[0.97rem]">
              One-on-one and small group coaching focused on fundamentals,
              movement, ball control, and confidence on sand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
