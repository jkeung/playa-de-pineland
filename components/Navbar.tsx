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

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          Playa de <span>Pineland</span>
        </Link>

        {menuOpen && (
          <div className="nav-overlay" onClick={closeMenu} />
        )}

        <div className={`nav-links${menuOpen ? " nav-links--open" : ""}`}>
          <Link href="/#training" onClick={closeMenu}>Training</Link>
          <Link href="/#experience" onClick={closeMenu}>Experience</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
          <Link href="/find-us" onClick={closeMenu}>Find Us</Link>
          <Link href="/faq" onClick={closeMenu}>FAQ</Link>
          <Link href="/rules" onClick={closeMenu}>Rules</Link>
          <Link className="btn btn-primary nav-book-mobile" href="/#booking" onClick={closeMenu}>
            Book a Session
          </Link>
        </div>
        <div className="nav-actions">
          <UserMenu />
          <ThemeToggle />
          <Link className="btn btn-primary nav-book-desktop" href="/#booking">
            Book a Session
          </Link>
        </div>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>
    </nav>
  );
}
