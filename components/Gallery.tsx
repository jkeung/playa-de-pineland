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
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Gallery</h2>
            <p>A glimpse of what it&apos;s like to play at Playa de Pineland.</p>
          </div>
        </div>

        <div className="gallery">
          <div className="gallery-viewport">
            <div
              className="gallery-track"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((s) => (
                <div
                  className="gallery-slide"
                  key={s.label}
                  style={{ background: s.gradient }}
                >
                  <span className="gallery-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="gallery-arrow gallery-arrow--left" onClick={prev} aria-label="Previous slide">
            &#8249;
          </button>
          <button className="gallery-arrow gallery-arrow--right" onClick={next} aria-label="Next slide">
            &#8250;
          </button>

          <div className="gallery-dots">
            {slides.map((s, i) => (
              <button
                key={s.label}
                className={`gallery-dot${i === current ? " gallery-dot--active" : ""}`}
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
