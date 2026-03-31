export default function Location() {
  return (
    <section className="pt-[42px] pb-[22px]" id="location">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Find Us</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              A private backyard sand court in Fairfax, VA. Come play where the
              grass meets the sand.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[18px] max-lg:grid-cols-1">
          <div className="grid gap-7 content-start">
            <div className="location-detail">
              <h3 className="m-0 mb-2 text-[color:var(--ocean-dark)] text-[1.1rem] dark:text-[color:var(--heading-dark)]">
                📍 Address
              </h3>
              <p className="text-[color:var(--muted)] leading-[1.7] text-[0.97rem] m-0">
                Fairfax, VA 22031
              </p>
            </div>

            <div className="location-detail">
              <h3 className="m-0 mb-2 text-[color:var(--ocean-dark)] text-[1.1rem] dark:text-[color:var(--heading-dark)]">
                🕐 Hours
              </h3>
              <ul className="list-none p-0 m-0 grid gap-[6px] text-[color:var(--muted)] text-[0.97rem] leading-[1.7]">
                <li><strong>Mon – Fri:</strong> 7:00 AM – 8:00 PM</li>
                <li><strong>Saturday:</strong> 8:00 AM – 6:00 PM</li>
                <li><strong>Sunday:</strong> 9:00 AM – 4:00 PM</li>
              </ul>
            </div>

            <div className="location-detail">
              <h3 className="m-0 mb-2 text-[color:var(--ocean-dark)] text-[1.1rem] dark:text-[color:var(--heading-dark)]">
                📞 Contact
              </h3>
              <p className="text-[color:var(--muted)] leading-[1.7] text-[0.97rem] m-0">
                <a
                  className="text-[color:var(--muted)] leading-[1.7] text-[0.97rem] m-0 hover:text-[color:var(--ocean)]"
                  href="mailto:playadepineland@gmail.com"
                >
                  playadepineland@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="rounded-[var(--radius)] overflow-hidden min-h-[320px]">
            <div className="w-full h-full min-h-[320px] bg-[linear-gradient(135deg,#0f5c73,#1f8daa,#8fd5e5)] flex flex-col items-center justify-center gap-3 rounded-[var(--radius)] shadow-[var(--shadow)]">
              <span className="text-[3rem] drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]">📍</span>
              <span className="text-white font-bold text-[1.1rem] opacity-90">Playa de Pineland</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
