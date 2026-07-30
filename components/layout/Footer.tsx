import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { footerLinks } from "@/data/navigation";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#060A16] px-6 sm:px-12 lg:px-16 pt-28 pb-16 border-t border-[var(--border-g)] text-white flex justify-center">
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-20 text-left">
          {/* Brand Column */}
          <div className="flex flex-col text-left">
            <div className="mb-6">
              <span className="font-mono text-sm tracking-[0.25em] font-semibold text-[var(--green-lt)] uppercase block">
                E-CELL WOXSEN
              </span>
            </div>
            <p className="text-[13px] text-white/50 leading-[1.8] font-light mb-8 max-w-[280px]">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/50 hover:text-[var(--green-lt)] transition-colors duration-200"
              >
                <InstagramIcon />
              </Link>
              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/50 hover:text-[var(--green-lt)] transition-colors duration-200"
              >
                <LinkedInIcon />
              </Link>
              <Link
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-white/50 hover:text-[var(--green-lt)] transition-colors duration-200"
              >
                <XIcon />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col text-left">
            <h5 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--green-lt)] mb-6 font-semibold">
              QUICK LINKS
            </h5>
            <ul className="list-none flex flex-col gap-3.5 p-0 m-0">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/50 no-underline transition-colors duration-200 font-light hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col text-left">
            <h5 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--green-lt)] mb-6 font-semibold">
              RESOURCES
            </h5>
            <ul className="list-none flex flex-col gap-3.5 p-0 m-0">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/50 no-underline transition-colors duration-200 font-light hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact Column */}
          <div className="flex flex-col text-left">
            <h5 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--green-lt)] mb-6 font-semibold">
              SUPPORT
            </h5>
            <ul className="list-none flex flex-col gap-3.5 p-0 m-0 mb-8">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/50 no-underline transition-colors duration-200 font-light hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-col text-left">
              <h5 className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--green-lt)] mb-3 font-semibold">
                Contact
              </h5>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 font-light no-underline block"
                >
                  {siteConfig.email}
                </a>
                <span className="text-[13px] text-white/50 font-light block">
                  Hyderabad, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="w-full pt-12 border-t border-[var(--border-g)] text-center">
          <p className="font-mono text-[11px] tracking-[0.1em] text-white/30 font-light m-0">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
