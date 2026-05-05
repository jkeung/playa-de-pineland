"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./portal/UserMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const linkClass =
    "hover:text-[color:var(--ocean-dark)] dark:hover:text-[#e8e6e1] max-md:w-full max-md:rounded-xl max-md:px-3 max-md:py-2.5 max-md:font-bold max-md:text-[color:var(--ocean-dark)] max-md:hover:bg-[rgba(30,107,72,0.08)] max-md:dark:text-heading-dark max-md:dark:hover:bg-[rgba(255,255,255,0.08)]";

  return (
    <nav className="sticky top-0 z-20 backdrop-blur-[14px] bg-[rgba(244,247,238,0.62)] border-b border-[rgba(27,77,58,0.08)] dark:bg-[rgba(26,29,33,0.82)] dark:border-[rgba(255,255,255,0.06)]">
      <div className="container flex items-center justify-between py-4 gap-4">
        <Link
          href="/"
          className="font-extrabold tracking-[0.02em] text-[1.05rem] text-[color:var(--ocean-dark)] dark:text-heading-dark"
        >
          Playa de <span className="text-[color:var(--sunset)]">Pineland</span>
        </Link>

        {menuOpen && (
          <div
            className="hidden max-md:block fixed inset-0 bg-black/30 z-[24]"
            onClick={closeMenu}
          />
        )}

        <div
          className={`flex gap-[22px] items-center text-[color:var(--muted)] text-[0.95rem] dark:text-[#9ca3a8] max-md:fixed max-md:top-0 max-md:right-0 max-md:bottom-0 max-md:w-[min(320px,86vw)] max-md:flex-col max-md:items-start max-md:pt-20 max-md:px-5 max-md:pb-7 max-md:gap-2 max-md:bg-[#f8faf4] max-md:dark:bg-[#1a1d21] max-md:border-l max-md:border-[rgba(8,57,72,0.1)] max-md:dark:border-[rgba(255,255,255,0.08)] max-md:shadow-[-14px_0_36px_rgba(8,57,72,0.24)] max-md:transition-transform max-md:duration-300 max-md:z-[25] max-md:text-[1.08rem] ${
            menuOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"
          }`}
        >
          <Link href="/#training" onClick={closeMenu} className={linkClass}>About</Link>
          <Link href="/group-classes" onClick={closeMenu} className={linkClass}>Classes</Link>
          <Link href="/contact" onClick={closeMenu} className={linkClass}>Contact</Link>
          <Link href="/find-us" onClick={closeMenu} className={linkClass}>Find Us</Link>
          <Link href="/faq" onClick={closeMenu} className={linkClass}>FAQ</Link>
          <Link href="/rules" onClick={closeMenu} className={linkClass}>Rules</Link>
          <Link
            className="btn btn-primary !hidden max-md:!inline-flex max-md:!mt-3 max-md:!w-full"
            href="/portal/book"
            onClick={closeMenu}
          >
            Join a Class
          </Link>
        </div>
        <div className="flex items-center gap-3 max-md:hidden">
          <UserMenu />
          <ThemeToggle />
          <Link className="btn btn-primary" href="/portal/book">
            Join a Class
          </Link>
        </div>
        <button
          className="hidden max-md:flex flex-col gap-[5px] p-2 bg-none border-none cursor-pointer z-30"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="block w-6 h-[2.5px] bg-[color:var(--ocean-dark)] dark:bg-[#e8e6e1] rounded-sm transition-[transform,opacity] duration-300" />
          <span className="block w-6 h-[2.5px] bg-[color:var(--ocean-dark)] dark:bg-[#e8e6e1] rounded-sm transition-[transform,opacity] duration-300" />
          <span className="block w-6 h-[2.5px] bg-[color:var(--ocean-dark)] dark:bg-[#e8e6e1] rounded-sm transition-[transform,opacity] duration-300" />
        </button>
      </div>
    </nav>
  );
}
