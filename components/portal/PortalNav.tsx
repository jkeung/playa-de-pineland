"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { logout } from "@/app/portal/actions";

export default function PortalNav({ displayName }: { displayName: string }) {
  const pathname = usePathname();

  return (
    <nav className="portal-nav">
      <div className="container portal-nav-inner">
        <Link href="/" className="brand">
          Playa de <span>Pineland</span>
        </Link>

        <div className="portal-nav-links">
          <Link
            href="/portal"
            className={`portal-nav-link${pathname === "/portal" ? " portal-nav-link--active" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            href="/portal/book"
            className={`portal-nav-link${pathname === "/portal/book" ? " portal-nav-link--active" : ""}`}
          >
            Book
          </Link>
          <Link
            href="/portal/profile"
            className={`portal-nav-link${pathname === "/portal/profile" ? " portal-nav-link--active" : ""}`}
          >
            Profile
          </Link>
        </div>

        <div className="portal-nav-actions">
          <span className="portal-nav-greeting">Hey, {displayName || "Player"}</span>
          <ThemeToggle />
          <form action={logout}>
            <button type="submit" className="btn btn-secondary portal-logout-btn">
              Log Out
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
