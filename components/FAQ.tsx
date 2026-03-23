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
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know before hitting the sand.</p>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => (
            <div
              className={`faq-item${openIndex === i ? " faq-item--open" : ""}`}
              key={i}
            >
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
