"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-16 py-5 bg-[rgba(8,13,28,0.9)] backdrop-blur-[20px] border-b border-[var(--border-g)] transition-[padding] duration-300 max-lg:px-8">
      <Link href="/" className="flex items-center gap-3.5 no-underline">
        <span className="font-['Bebas_Neue',sans-serif] text-xl tracking-[0.14em] text-[var(--white)]">
          E<span className="text-[var(--green-lt)]">·</span>CELL{" "}
          <span className="font-['DM_Sans',sans-serif] text-sm text-white/[0.38] tracking-[0.06em] font-light">
            {siteConfig.university}
          </span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                link.isCTA
                  ? "font-mono text-[10px] tracking-[0.14em] uppercase no-underline bg-[var(--green)] text-[var(--white)] px-5 py-2.5 border border-[var(--green)] transition-all duration-200 hover:bg-transparent hover:text-[var(--green-lt)]"
                  : "font-mono text-[10px] tracking-[0.14em] uppercase text-white/[0.52] no-underline transition-colors duration-200 hover:text-[var(--green-lt)]"
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex flex-col gap-1.5 bg-transparent border-none"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle mobile menu"
      >
        <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[rgba(8,13,28,0.98)] backdrop-blur-[20px] border-b border-[var(--border-g)] p-8">
          <ul className="flex flex-col gap-6 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={
                    link.isCTA
                      ? "font-mono text-xs tracking-[0.14em] uppercase no-underline bg-[var(--green)] text-[var(--white)] px-5 py-2.5 border border-[var(--green)] inline-block"
                      : "font-mono text-xs tracking-[0.14em] uppercase text-white/60 no-underline hover:text-[var(--green-lt)]"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
