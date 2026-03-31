"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How do I book a session?",
    a: "You can book directly through our website by clicking the \"Book a Session\" button, or send us a message through the contact form. We'll confirm your slot within a few hours.",
  },
  {
    q: "What skill level do I need?",
    a: "All levels are welcome! We offer sessions for complete beginners through competitive players. Our coaches tailor each session to your experience level.",
  },
  {
    q: "What should I bring?",
    a: "Just bring yourself, water, and sunscreen. We provide balls and all the gear you need. Comfortable athletic wear and shoes you don't mind getting sandy are recommended.",
  },
  {
    q: "How large are the groups?",
    a: "Group sessions are capped at 8 players to ensure personal attention. Private lessons are one-on-one or up to 4 players if you bring friends.",
  },
  {
    q: "Do you set up courts for events?",
    a: "Absolutely! We host corporate outings, birthday parties, and tournaments. Contact us for custom event packages and pricing.",
  },
  {
    q: "How much does it cost?",
    a: "Drop-in sessions start at $25 per person. Group clinics and private lessons vary — check our booking page for current rates and package deals.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="pt-[42px] pb-[22px]">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Frequently Asked Questions</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">Everything you need to know before hitting the sand.</p>
          </div>
        </div>

        <div className="max-w-[800px]">
          {faqs.map((item, i) => (
            <div
              className={`border-b border-[rgba(8,57,72,0.08)]`}
              key={i}
            >
              <button
                className="w-full flex items-center justify-between gap-4 py-5 bg-transparent border-none cursor-pointer text-[1.05rem] font-semibold text-[color:var(--ocean-dark)] text-left font-[inherit] dark:text-heading-dark"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.q}</span>
                <span className={`shrink-0 text-[1.4rem] font-normal transition-transform duration-300 text-[color:var(--muted)]${openIndex === i ? " rotate-45" : ""}`}>+</span>
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-[350ms] ease-[ease]"
                style={{ maxHeight: openIndex === i ? "600px" : "0px" }}
              >
                <p className="m-0 mb-5 text-[color:var(--muted)] leading-[1.75] text-[0.97rem]">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
