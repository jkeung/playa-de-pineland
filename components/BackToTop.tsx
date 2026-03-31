"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`fixed bottom-7 right-7 size-12 rounded-full border-none bg-[linear-gradient(135deg,var(--ocean),var(--ocean-dark))] text-white text-[1.3rem] font-bold cursor-pointer shadow-[0_8px_24px_rgba(8,57,72,0.25)] grid place-items-center transition-[opacity,transform,box-shadow] duration-300 z-[15] ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(8,57,72,0.35)]"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
