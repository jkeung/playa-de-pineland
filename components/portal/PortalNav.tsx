"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { logout } from "@/app/portal/actions";

export default function PortalNav({ displayName }: { displayName: string }) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-20 bg-[rgba(248,250,244,0.82)] backdrop-blur-[14px] border-b border-[rgba(8,57,72,0.06)] px-6 dark:bg-[rgba(26,29,33,0.82)] dark:border-[rgba(255,255,255,0.06)]">
      <div className="container flex items-center justify-between h-16 gap-6 max-md:flex-wrap max-md:h-auto max-md:py-3 max-md:gap-[10px]">
        <Link
          href="/"
          className="font-extrabold tracking-[0.02em] text-[1.05rem] text-[color:var(--ocean-dark)] dark:text-heading-dark"
        >
          Playa de <span className="text-[color:var(--sunset)]">Pineland</span>
        </Link>

        <div className="flex gap-2 max-md:order-3 max-md:w-full">
          <Link
            href="/portal"
            className={`py-[6px] px-[14px] rounded-full text-[0.9rem] font-medium text-[color:var(--muted)] no-underline transition-[color,background] duration-200 hover:text-[color:var(--text)] hover:bg-[rgba(8,57,72,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)]${pathname === "/portal" ? " text-[color:var(--ocean-dark)] bg-[rgba(30,107,72,0.08)] font-semibold dark:text-heading-dark dark:bg-[rgba(255,255,255,0.08)]" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            href="/portal/book"
            className={`py-[6px] px-[14px] rounded-full text-[0.9rem] font-medium text-[color:var(--muted)] no-underline transition-[color,background] duration-200 hover:text-[color:var(--text)] hover:bg-[rgba(8,57,72,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)]${pathname === "/portal/book" ? " text-[color:var(--ocean-dark)] bg-[rgba(30,107,72,0.08)] font-semibold dark:text-heading-dark dark:bg-[rgba(255,255,255,0.08)]" : ""}`}
          >
            Book
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal"
            className="text-[0.88rem] text-[color:var(--muted)] whitespace-nowrap no-underline transition-colors duration-200 hover:text-[color:var(--ocean-dark)] max-md:hidden"
          >
            Hey, {displayName || "Player"}
          </Link>
          <ThemeToggle />
          <form action={logout}>
            <button type="submit" className="btn btn-secondary !py-[6px] !px-4 !text-[0.85rem]">
              Log Out
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
