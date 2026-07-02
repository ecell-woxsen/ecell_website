import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { footerLinks } from "@/data/navigation";

const socialIcons: Record<string, React.ReactElement> = {
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  twitter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.47C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.53C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
};

function getFallbackIcon(platform: string): React.ReactElement {
  return (
    <span className="font-mono text-[10px]">
      {platform.slice(0, 2).toUpperCase()}
    </span>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#060A16] px-16 pt-20 pb-10 border-t border-[var(--border-g)] max-lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-15 mb-15 max-lg:grid-cols-2 max-lg:gap-9 max-sm:grid-cols-1">
          {/* Brand */}
          <div>
            <div className="mb-4.5">
              <Image
                src="/ecell-logo.png"
                alt="E-Cell Woxsen Logo"
                width={140}
                height={56}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-[13px] text-white/[0.26] leading-[1.7] max-w-[248px] font-light mb-6.5">
              {siteConfig.description}
            </p>
            <div className="flex gap-2.5">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <Link
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="social-icon-link"
                >
                  {socialIcons[platform.toLowerCase()] ?? getFallbackIcon(platform)}
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {(
            [
              { title: "Quick Links", links: footerLinks.quickLinks },
              { title: "Resources", links: footerLinks.resources },
              { title: "Connect", links: footerLinks.connect },
            ] as const
          ).map((col) => (
            <div key={col.title}>
              <h5 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--green-lt)] mb-4.5">
                {col.title}
              </h5>
              <ul className="list-none flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/[0.36] no-underline transition-colors duration-200 font-light hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center pt-7 border-t border-[var(--border-g)] max-lg:flex-col max-lg:gap-2.5 max-lg:text-center">
          <span className="font-mono text-[10px] tracking-[0.1em] text-white/[0.18]">
            © {currentYear} {siteConfig.shortName} — {siteConfig.university}
          </span>
          <div className="flex items-center gap-5">
            <Link href="/submit-idea" className="font-mono text-[10px] tracking-[0.1em] text-[var(--green-lt)] opacity-50 hover:opacity-100 no-underline transition-opacity duration-200">
              Submit an Idea
            </Link>
            <span className="font-mono text-[10px] tracking-[0.1em] text-white/[0.18]">
              {siteConfig.university} · Hyderabad, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
