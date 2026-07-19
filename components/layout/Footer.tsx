import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { footerLinks } from "@/data/navigation";

// ─── Inline SVG social icons (no external dependency needed) ──────────────────

const IconInstagram = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="0.1" fill="currentColor" strokeWidth="2.5" />
  </svg>
);

const IconLinkedIn = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconTwitterX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconYouTube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#060A16" />
  </svg>
);

const IconWhatsApp = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const IconDiscord = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const SOCIAL_ICONS: Record<string, { Icon: () => React.ReactElement; label: string }> = {
  instagram: { Icon: IconInstagram, label: "Instagram" },
  linkedin:  { Icon: IconLinkedIn,  label: "LinkedIn"  },
  twitter:   { Icon: IconTwitterX,  label: "X (Twitter)" },
  youtube:   { Icon: IconYouTube,   label: "YouTube"  },
  whatsapp:  { Icon: IconWhatsApp,  label: "WhatsApp" },
  discord:   { Icon: IconDiscord,   label: "Discord"  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-[#060A16] border-t border-[var(--border-g)]"
      style={{ padding: "80px 64px 32px" }}
    >
      {/* Decorative top glow line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "55%",
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, #4caf62 50%, transparent 100%)",
          opacity: 0.5,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "40%",
          height: "90px",
          background: "radial-gradient(ellipse at top, rgba(76,175,98,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">

        {/* ── Main 4-column grid ── */}
        <div
          className="grid gap-14 mb-16"
          style={{ gridTemplateColumns: "2.2fr 1fr 1fr 1fr" }}
        >
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: "24px" }}>
              <Image
                src="/ecell-logo.png"
                alt="E-Cell Woxsen Logo"
                width={148}
                height={60}
                className="h-14 w-auto object-contain object-left"
              />
            </div>

            <p
              className="font-mono uppercase text-[#4caf62]"
              style={{ fontSize: "9.5px", letterSpacing: "0.28em", marginBottom: "16px" }}
            >
              {siteConfig.tagline}
            </p>

            <p
              className="font-light text-white/60"
              style={{ fontSize: "13.5px", lineHeight: 1.8, maxWidth: "264px", marginBottom: "32px" }}
            >
              {siteConfig.description}
            </p>

            <p
              className="font-mono uppercase text-white/30"
              style={{ fontSize: "9px", letterSpacing: "0.22em", marginBottom: "12px" }}
            >
              Follow us
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {(Object.entries(siteConfig.social) as [string, string][]).map(([platform, url]) => {
                const entry = SOCIAL_ICONS[platform];
                return (
                  <Link
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={entry?.label ?? platform}
                    title={entry?.label ?? platform}
                    className="w-9 h-9 shrink-0 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/50 no-underline transition-all duration-200 hover:border-[#4caf62] hover:text-[#4caf62] hover:bg-[rgba(76,175,98,0.10)] hover:scale-105"
                  >
                    {entry ? <entry.Icon /> : (
                      <span style={{ fontFamily: "monospace", fontSize: "9px" }}>
                        {platform.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {(
            [
              { title: "Quick Links", links: footerLinks.quickLinks },
              { title: "Resources",   links: footerLinks.resources  },
              { title: "Connect",     links: footerLinks.connect    },
            ] as const
          ).map((col) => (
            <div key={col.title}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: "14px",
                    height: "1px",
                    background: "#4caf62",
                    opacity: 0.7,
                    flexShrink: 0,
                  }}
                />
                <h5
                  className="font-mono uppercase text-[#4caf62]"
                  style={{ fontSize: "10px", letterSpacing: "0.22em" }}
                >
                  {col.title}
                </h5>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="no-underline font-light text-white/55 transition-colors duration-200 hover:text-white group"
                      style={{ fontSize: "13.5px", lineHeight: 1.5, display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block h-px bg-[#4caf62] transition-all duration-200 group-hover:w-3 opacity-0 group-hover:opacity-100"
                        style={{ width: 0, flexShrink: 0 }}
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex justify-between items-center"
          style={{
            borderTop: "1px solid rgba(76,175,98,0.12)",
            paddingTop: "24px",
            paddingBottom: "8px",
          }}
        >
          <span
            className="font-mono text-white/25"
            style={{ fontSize: "10px", letterSpacing: "0.12em" }}
          >
            © {currentYear}{" "}
            <span className="text-white/40">{siteConfig.shortName}</span>
            {" "}—{" "}
            {siteConfig.university}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link
              href="/submit-idea"
              className="font-mono no-underline transition-opacity duration-200 opacity-60 hover:opacity-100"
              style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#4caf62" }}
            >
              Submit an Idea ↗
            </Link>
            <span aria-hidden="true" style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.10)", display: "inline-block" }} />
            <span
              className="font-mono text-white/25"
              style={{ fontSize: "10px", letterSpacing: "0.1em" }}
            >
              Hyderabad, India
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

