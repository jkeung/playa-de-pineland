"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How do I sign up for a class?",
    a: "Create an account or log in through the portal, then choose an active class from the class calendar. Once you sign up, your name appears on the class roster.",
  },
  {
    q: "What class levels do you offer?",
    a: "Current group classes are beginner and intermediate. Beginner classes focus on fundamentals like passing, setting, serving, movement, and communication. Intermediate classes are for players with solid fundamentals who are ready for faster, more strategic doubles.",
  },
  {
    q: "How much do group classes cost?",
    a: "Your first class is $20. Standard group classes are $30 while we continue building the Playa de Pineland community.",
  },
  {
    q: "Where are classes held?",
    a: "Classes are held on a private backyard sand court on Pineland Street in Fairfax, VA. The exact address is shared after your booking is confirmed.",
  },
  {
    q: "What should I bring?",
    a: "Bring water, sunscreen, and athletic clothes that can get sandy. Volleyballs and class equipment are provided.",
  },
  {
    q: "How large are the groups?",
    a: "Beginner classes are designed for about 12-16 players with plenty of reps and small-group work. Intermediate classes are designed for about 8-12 players so the pace, 2v2 drills, and coaching attention stay focused.",
  },
  {
    q: "Do I need beach volleyball experience?",
    a: "No. Beginner classes are built for newer sand players or players who want to rebuild strong fundamentals. If you already have reliable ball control, serving, and court coverage, intermediate may be the better fit.",
  },
  {
    q: "Do you offer private coaching?",
    a: "Yes. Private coaching is available for players who want more personalized work on fundamentals, movement, ball control, and confidence on sand. Send a message through the contact page for scheduling questions.",
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
