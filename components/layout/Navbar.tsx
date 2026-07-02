"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll spy active section highlighting
  useEffect(() => {
    const sectionIds = ["about", "initiatives", "community", "contact", "newsletter"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -55% 0px", // matches section active when centered in viewport
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    // Reset active section if scrolled to top (Hero section)
    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Reset active section when pathname changes (navigating away from homepage)
  useEffect(() => {
    setActiveSection("");
    setMobileOpen(false);
  }, [pathname]);

  // Track scroll for island border brightening
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  // Helper to determine if link is active
  const isLinkActive = (href: string) => {
    // Exact page routes
    if (!href.startsWith("/#") && !href.startsWith("#") && href !== "/") {
      return pathname === href || pathname.startsWith(href + "/");
    }
    // Homepage section anchors
    if (href.startsWith("/#")) {
      if (pathname !== "/") return false;
      return activeSection === href.substring(2);
    }
    if (href.startsWith("#")) {
      return activeSection === href.substring(1);
    }
    return pathname === href;
  };

  return (
    <>
      <style>{`
        /* ── Island shell ── */
        .nav-island {
          position: fixed;
          top: 18px;
          left: 50%;
          translate: -50% 0;
          z-index: 900;
          width: auto;
          border-radius: 9999px;
          background: rgba(8, 13, 28, 0.78);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(30, 107, 46, 0.28);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.45),
            0 2px 8px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 0 0 1px rgba(30, 107, 46, 0.08);
          padding: 8px 10px;
          transition:
            border-radius 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.3s ease,
            padding 0.3s ease;
        }

        .nav-island.menu-open {
          border-radius: 24px;
        }

        /* ── Inner row ── */
        .nav-inner {
          display: flex;
          align-items: center;
          gap: 0;
          white-space: nowrap;
        }

        /* ── Logo ── */
        .nav-logo-wrap {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }
        .nav-logo-box {
          background: rgba(255, 255, 255, 0.07);
          border-radius: 9999px;
          padding: 5px 10px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          transition: border-color 0.2s, background 0.2s;
        }
        .nav-logo-box:hover {
          border-color: rgba(76, 175, 98, 0.38);
          background: rgba(255, 255, 255, 0.11);
        }
        .nav-logo-img {
          height: 28px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* ── Pulsing status dot ── */
        .nav-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 6px var(--green);
          flex-shrink: 0;
          margin-left: 10px;
          margin-right: 4px;
          animation: dotPulse 2.5s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1;   box-shadow: 0 0 6px  var(--green); }
          50%       { opacity: 0.5; box-shadow: 0 0 12px var(--green); }
        }

        /* ── Divider ── */
        .nav-divider {
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 6px;
          flex-shrink: 0;
        }

        /* ── Desktop links (hidden ≤1024px) ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
        }
        @media (max-width: 1024px) {
          .nav-links { display: none; }
        }

        .nav-link {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(245, 248, 255, 0.52);
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 9999px;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover,
        .nav-link.active {
          color: var(--green-lt);
          background: rgba(30, 107, 46, 0.14);
        }

        /* ── CTA ── */
        .nav-cta {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          background: var(--green);
          color: var(--white);
          border: 1px solid var(--green);
          border-radius: 9999px;
          padding: 6px 14px;
          margin-left: 4px;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: transparent;
          color: var(--green-lt);
        }

        /* ── Hamburger (shown ≤1024px) ── */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 7px;
          border-radius: 50%;
          margin-left: 6px;
          transition: background 0.2s;
        }
        .nav-hamburger:hover { background: rgba(255,255,255,0.08); }
        .nav-hamburger span {
          display: block;
          width: 18px;
          height: 1.5px;
          background: rgba(245, 248, 255, 0.8);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
        @media (max-width: 1024px) {
          .nav-hamburger { display: flex; }
        }

        /* ── Mobile dropdown (expands inside the island) ── */
        .nav-mobile-menu {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition:
            max-height 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity 0.3s ease;
        }
        .nav-mobile-menu.open {
          max-height: 520px;
          opacity: 1;
        }
        .nav-mobile-menu-inner {
          padding: 12px 6px 6px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 200px;
        }
        .nav-mobile-link {
          font-family: "Space Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(245, 248, 255, 0.6);
          padding: 10px 16px;
          border-radius: 14px;
          transition: background 0.2s, color 0.2s;
          display: block;
        }
        .nav-mobile-link:hover,
        .nav-mobile-link.active {
          background: rgba(30, 107, 46, 0.15);
          color: var(--green-lt);
        }
        .nav-mobile-cta {
          display: block;
          text-align: center;
          font-family: "Space Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          background: var(--green);
          color: var(--white);
          padding: 10px 16px;
          border-radius: 14px;
          margin-top: 6px;
          transition: background 0.2s;
        }
        .nav-mobile-cta:hover { background: var(--green-mid); }
      `}</style>

      <div
        ref={navRef}
        className={`nav-island ${mobileOpen ? "menu-open" : ""} ${isScrolled ? "scrolled" : ""}`}
      >
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo-wrap">
            <div className="nav-logo-box">
              <Image
                src="/ecell-logo.png"
                alt="E-Cell Woxsen Logo"
                width={160}
                height={56}
                className="nav-logo-img"
                priority
              />
            </div>
          </Link>

          {/* Status dot */}
          <div className="nav-dot" />

          {/* Divider */}
          <div className="nav-divider" />

          {/* Desktop links */}
          <ul className="nav-links">
            {navLinks.map((link) =>
              link.isCTA ? (
                <li key={link.href}>
                  <Link href={link.href} className="nav-cta">
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isLinkActive(link.href) ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Hamburger */}
          <button
            className={`nav-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`nav-mobile-menu ${mobileOpen ? "open" : ""}`}>
          <div className="nav-mobile-menu-inner">
            {navLinks.map((link) =>
              link.isCTA ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-mobile-cta"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-mobile-link ${isLinkActive(link.href) ? "active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* Top-Right Woxsen University Logo Overlay (only on subpages, since the home page has it baked into the video) */}
      {pathname !== "/" && (
        <div className="fixed top-6 right-12 z-[900] pointer-events-none select-none max-lg:hidden">
          <Image
            src="/wou-logo.png"
            alt="Woxsen University Logo"
            width={180}
            height={55}
            className="h-12 w-auto object-contain opacity-80"
            priority
          />
        </div>
      )}
    </>
  );
}
