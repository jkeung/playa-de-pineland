"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="size-9 rounded-full border border-[rgba(8,57,72,0.1)] bg-[rgba(255,253,248,0.6)] cursor-pointer text-[1.1rem] grid place-items-center transition-[background,transform] duration-200 leading-none p-0 hover:scale-110 dark:bg-[rgba(255,255,255,0.08)] dark:border-[rgba(255,255,255,0.1)]"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
