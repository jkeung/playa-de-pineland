"use client";

import { useState } from "react";

const slides = [
  { label: "Court Setup", gradient: "linear-gradient(135deg, #0f5c73, #1f8daa)" },
  { label: "Golden Hour", gradient: "linear-gradient(135deg, #ff8a5b, #ffb071)" },
  { label: "Palm Courts", gradient: "linear-gradient(135deg, #1f5f4a, #2d7b5f)" },
  { label: "Sandy Shores", gradient: "linear-gradient(135deg, #f5e3b3, #e6c983)" },
  { label: "Ocean View", gradient: "linear-gradient(135deg, #083948, #0f5c73)" },
  { label: "Sunset Rally", gradient: "linear-gradient(135deg, #ff8a5b, #ff6b3d)" },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <section className="pt-[42px] pb-[22px]">
      <div className="container">
        <div className="mb-6 flex justify-between items-end gap-[18px] flex-wrap">
          <div>
            <h2 className="m-0 mb-2 text-[clamp(1.5rem,3vw,2.7rem)] text-[color:var(--ocean-dark)] tracking-[-0.03em] dark:text-heading-dark">Gallery</h2>
            <p className="m-0 text-[color:var(--muted)] max-w-[640px] leading-[1.7]">A glimpse of what it&apos;s like to play at Playa de Pineland.</p>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow)]">
            <div
              className="flex transition-transform duration-[400ms] ease-[ease]"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((s) => (
                <div
                  className="min-w-full aspect-[16/7] grid place-items-center"
                  key={s.label}
                  style={{ background: s.gradient }}
                >
                  <span className="text-[clamp(1.4rem,3vw,2.2rem)] font-extrabold text-white/85 tracking-[-0.02em]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-none bg-[rgba(248,250,244,0.82)] backdrop-blur-[10px] shadow-[0_6px_18px_rgba(8,57,72,0.12)] cursor-pointer text-[1.6rem] text-[color:var(--ocean-dark)] grid place-items-center transition-[transform,box-shadow] duration-200 leading-none hover:-translate-y-1/2 hover:scale-[1.08] max-md:w-9 max-md:h-9 max-md:text-[1.2rem] dark:bg-[rgba(30,35,40,0.82)] dark:text-[#e8e6e1] left-3"
            onClick={prev}
            aria-label="Previous slide"
          >
            &#8249;
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-none bg-[rgba(248,250,244,0.82)] backdrop-blur-[10px] shadow-[0_6px_18px_rgba(8,57,72,0.12)] cursor-pointer text-[1.6rem] text-[color:var(--ocean-dark)] grid place-items-center transition-[transform,box-shadow] duration-200 leading-none hover:-translate-y-1/2 hover:scale-[1.08] max-md:w-9 max-md:h-9 max-md:text-[1.2rem] dark:bg-[rgba(30,35,40,0.82)] dark:text-[#e8e6e1] right-3"
            onClick={next}
            aria-label="Next slide"
          >
            &#8250;
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {slides.map((s, i) => (
              <button
                key={s.label}
                className={`w-[10px] h-[10px] rounded-full border-none cursor-pointer p-0 transition-[background,transform] duration-200 dark:bg-[rgba(255,255,255,0.18)]${i === current ? " bg-[var(--ocean)] scale-[1.25]" : " bg-[rgba(8,57,72,0.18)]"}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
