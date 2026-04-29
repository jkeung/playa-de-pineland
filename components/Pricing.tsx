import Link from "next/link";

const tiers = [
  {
    name: "Open Play",
    price: "$0",
    unit: "/session",
    features: [
      "3-hour open-play session",
      "All skill levels welcome",
      "Equipment available on-site",
      "No commitment required",
    ],
  },
  {
    name: "Group Clinic",
    price: "$0",
    unit: "/session",
    popular: true,
    features: [
      "2-hour coach-led session",
      "Drills, strategy & live games",
      "Small groups (max 8)",
      "Skill-matched groupings",
    ],
  },
  {
    name: "Private Lesson",
    price: "$0",
    unit: "/session",
    features: [
      "1-on-1 with a certified coach",
      "Personalized training plan",
      "Video analysis included",
      "Flexible scheduling",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="pt-[42px] pb-[22px]" id="pricing">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Simple, Transparent Pricing</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">
              Whether you&rsquo;re dropping in for a casual game or committing to
              structured coaching, we have a plan that fits.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`card flex flex-col items-center text-center relative${tier.popular ? " border-2 border-[var(--ocean)] shadow-[0_16px_40px_rgba(8,57,72,0.16)]" : ""}`}
            >
              {tier.popular && (
                <span className="absolute -top-[13px] left-1/2 -translate-x-1/2 bg-[linear-gradient(135deg,var(--ocean),var(--ocean-dark))] text-white text-[0.78rem] font-bold py-1 px-4 rounded-full tracking-[0.04em] uppercase">
                  Popular
                </span>
              )}
              <h3>{tier.name}</h3>
              <div className="text-[2.4rem] font-extrabold text-[color:var(--ocean-dark)] mt-3 mb-2 leading-none dark:text-heading-dark">
                {tier.price}
                <span className="text-[0.9rem] font-medium text-[color:var(--muted)]">{tier.unit}</span>
              </div>
              <ul className="pricing-features">
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link
                className={`btn mt-auto w-full ${tier.popular ? "btn-primary" : "btn-secondary"}`}
                href={`/portal/book?focus=${encodeURIComponent(tier.name)}`}
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
