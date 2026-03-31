"use client";

export default function BookingCalendly() {
  return (
    <section className="pt-[42px] pb-[22px]" id="booking">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Book Your Session</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              Pick a time that works for you. Whether it&apos;s private coaching,
              open play, or a group session — we&apos;ll see you on the sand.
            </p>
          </div>
        </div>
        <div className="rounded-[var(--radius)] overflow-hidden shadow-[var(--shadow)] bg-[var(--card)] border border-[var(--border)]">
          <iframe
            className="w-full h-[660px] border-none rounded-[var(--radius)]"
            src="https://calendly.com/playadepineland"
            title="Book a session at Playa de Pineland"
            loading="lazy"
          />
          <noscript>
            <p>
              <a href="https://calendly.com/playadepineland" target="_blank" rel="noopener noreferrer">
                Book a session on Calendly
              </a>
            </p>
          </noscript>
        </div>
      </div>
    </section>
  );
}
