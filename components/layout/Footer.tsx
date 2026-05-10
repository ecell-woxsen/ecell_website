import Link from "next/link";
import { siteConfig } from "@/data/site";
import { footerLinks } from "@/data/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#060A16] px-16 pt-20 pb-10 border-t border-[var(--border-g)] max-lg:px-8">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-15 mb-15 max-lg:grid-cols-2 max-lg:gap-9 max-sm:grid-cols-1">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3.5 mb-4.5">
            <span className="font-['Bebas_Neue',sans-serif] text-xl tracking-[0.14em] text-[var(--white)]">
              E<span className="text-[var(--green-lt)] font-normal">·</span>CELL{" "}
              <span className="text-[var(--green-lt)] font-normal">Woxsen</span>
            </span>
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
                className="w-9 h-9 border border-[var(--border-g)] flex items-center justify-center font-mono text-[10px] text-white/[0.42] no-underline transition-all duration-200 hover:border-[var(--green-lt)] hover:text-[var(--green-lt)] hover:bg-[rgba(30,107,46,0.1)]"
              >
                {platform.slice(0, 2).toUpperCase()}
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
        <span className="font-mono text-[10px] tracking-[0.1em] text-white/[0.18]">
          {siteConfig.university} · Hyderabad, India
        </span>
      </div>
    </footer>
  );
}
