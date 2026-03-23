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
          <a href="#training" onClick={closeMenu}>Training</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="btn btn-primary nav-book-mobile" href="#booking" onClick={closeMenu}>
            Book a Session
          </a>
        </div>
        <div className="nav-actions">
          <UserMenu />
          <ThemeToggle />
          <a className="btn btn-primary nav-book-desktop" href="#booking">
            Book a Session
          </a>
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
