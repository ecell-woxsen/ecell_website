import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { affiliations } from "@/data/affiliations";

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

      {/* ── AFFILIATIONS GRID ── */}
      <section className="section-base bg-[#020817] pt-0 pb-20 text-white" id="affiliations">
        <div className="section-container">
          <RevealOnScroll>
            <SectionHeader
              label="Our Network"
              title="Affiliations & Partners"
            />
          </RevealOnScroll>

          <div className="grid grid-cols-5 gap-3 mt-14 max-lg:grid-cols-3 max-sm:grid-cols-2">
            {affiliations.map((a) => (
              <RevealOnScroll key={a.id} className="h-full">
                <div className="h-full card-pad bg-white/[0.02] border border-white/[0.06] rounded-xl min-h-[100px] flex items-center justify-center font-['Bebas_Neue',sans-serif] text-[17px] tracking-[0.12em] text-white/35 transition-all duration-300 text-center leading-[1.3] hover:bg-white/[0.05] hover:text-white/80 hover:border-[var(--green-lt)]/35">
                  {a.name}
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/30 mt-5.5 text-center">
            And growing — reach out to partner with us
          </p>
        </div>
      </section>
    </>
  );
}
