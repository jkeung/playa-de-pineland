"use client";

export default function BookingCalendly() {
  return (
    <section className="section" id="booking">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Book Your Session</h2>
            <p>
              Pick a time that works for you. Whether it&apos;s private coaching,
              open play, or a group session — we&apos;ll see you on the sand.
            </p>
          </div>
        </div>
        <div className="booking-embed">
          <iframe
            className="booking-iframe"
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
