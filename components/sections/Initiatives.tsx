import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { initiatives } from "@/data/initiatives";

function getInitiativeIcon(id: string) {
  switch (id) {
    case "launchpad":
      return (
        <svg className="w-5 h-5 text-[var(--ink)] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.4m5.96 5.97a14.96 14.96 0 01-12.12 6.16 14.96 14.96 0 016.16-12.12m5.96 5.97L9.63 8.4" />
        </svg>
      );
    case "founder-lab":
      return (
        <svg className="w-5 h-5 text-[var(--ink)] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case "speaker-circuit":
      return (
        <svg className="w-5 h-5 text-[var(--ink)] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      );
    case "community-fund":
      return (
        <svg className="w-5 h-5 text-[var(--ink)] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Initiatives() {
  return (
    <section
      className="section-base bg-[var(--paper)] text-[var(--ink)]"
      id="initiatives"
    >
      <div className="section-container">
        <RevealOnScroll>
          <SectionHeader label="What We Build" title="Core Initiatives" lightMode />
          <p className="text-[15px] text-[rgba(8,13,28,0.5)] max-w-[540px] leading-[1.85] font-light mb-[72px]">
            Four pillars that power E-Cell — from ideation to fundraising. Each is
            designed to reduce friction for student founders at every stage.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {initiatives.map((init, i) => (
            <RevealOnScroll key={init.id} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4} className="flex flex-col">
              <div
                className="card-pad ipillar bg-[var(--paper2)] border border-[rgba(8,13,28,0.08)] rounded-2xl transition-all duration-300 relative overflow-hidden hover:bg-[var(--navy-deep)] hover:-translate-y-1.5 group text-center flex-1 flex flex-col justify-start"
                data-n={init.number}
              >
                <div className="w-12 h-12 border border-[rgba(8,13,28,0.14)] rounded-xl flex items-center justify-center mb-7 transition-all duration-300 group-hover:bg-[var(--green)] group-hover:border-[var(--green)] mx-auto">
                  {getInitiativeIcon(init.id)}
                </div>
                <h3 className="font-['Bebas_Neue',sans-serif] text-[26px] tracking-[0.03em] text-[var(--ink)] mb-3 transition-colors duration-300 group-hover:text-white">
                  {init.title}
                </h3>
                <p className="text-xs text-[rgba(8,13,28,0.5)] leading-[1.7] font-light transition-colors duration-300 group-hover:text-white/[0.48]">
                  {init.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
