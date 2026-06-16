import type { Metadata } from "next";
import Affiliations from "@/components/sections/Affiliations";

export const metadata: Metadata = {
  title: "Affiliations & Partners — E-Cell Woxsen",
  description: "Our network of affiliations and partners at E-Cell Woxsen.",
};

export default function AffiliationsPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <div className="page-hero">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,107,46,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(30,107,46,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="animate-fade-up delay-1">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-5 flex items-center gap-3.5 opacity-80">
              <span className="w-7 h-px bg-[var(--green-lt)] opacity-50" />
              Our Network
            </p>
          </div>

          <h1 className="font-['Bebas_Neue',sans-serif] text-[clamp(64px,9vw,140px)] leading-[0.88] tracking-[-0.02em] text-white mb-7 animate-fade-up delay-2">
            Affiliations &
            <br />
            <span className="text-[var(--green-lt)]">Partners.</span>
          </h1>

          <p className="max-w-[520px] text-[15px] leading-[1.9] text-white/45 font-light animate-fade-up delay-3">
            The organizations, incubators, and companies that support our vision and empower student founders.
          </p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />
      </div>

      {/* Reusing the Affiliations Component */}
      <div className="bg-[#020817] pt-0 pb-20">
        <Affiliations />
      </div>
    </>
  );
}
