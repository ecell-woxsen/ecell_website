"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-16 py-5 bg-[rgba(8,13,28,0.92)] backdrop-blur-[24px] border-b border-[var(--border-g)] transition-[padding] duration-300 max-lg:px-8">
      <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center no-underline shrink-0">
          <div className="bg-white/10 rounded-xl px-3 py-2 border border-white/10 hover:border-[var(--green-lt)]/40 transition-colors duration-200">
            <Image
              src="/ecell-logo.png"
              alt="E-Cell Woxsen Logo"
              width={160}
              height={56}
              className="h-11 w-auto object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  link.isCTA
                    ? "font-mono text-[10px] tracking-[0.14em] uppercase no-underline bg-[var(--green)] text-[var(--white)] px-5 py-2.5 border border-[var(--green)] rounded-lg transition-all duration-200 hover:bg-transparent hover:text-[var(--green-lt)]"
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
          className="lg:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[rgba(8,13,28,0.98)] backdrop-blur-[20px] border-b border-[var(--border-g)] p-8">
          <ul className="flex flex-col gap-6 list-none max-w-[1280px] mx-auto">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={
                    link.isCTA
                      ? "font-mono text-xs tracking-[0.14em] uppercase no-underline bg-[var(--green)] text-[var(--white)] px-5 py-2.5 border border-[var(--green)] rounded-lg inline-block"
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
