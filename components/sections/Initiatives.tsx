import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { initiatives } from "@/data/initiatives";

export default function Initiatives() {
  return (
    <section
      className="section-base bg-[var(--paper)] text-[var(--ink)]"
      id="initiatives"
    >
      <RevealOnScroll>
        <SectionHeader label="What We Build" title="Core Initiatives" lightMode />
        <p className="text-[15px] text-[rgba(8,13,28,0.5)] max-w-[540px] leading-[1.85] font-light mb-[72px]">
          Four pillars that power E-Cell — from ideation to fundraising. Each is
          designed to reduce friction for student founders at every stage.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-4 gap-0.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {initiatives.map((init, i) => (
          <RevealOnScroll key={init.id} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}>
            <div
              className="ipillar bg-[var(--paper2)] border border-[rgba(8,13,28,0.08)] px-6.5 py-9.5 transition-all duration-300 relative overflow-hidden hover:bg-[var(--navy-deep)] hover:-translate-y-1.5 group"
              data-n={init.number}
            >
              <div className="w-12 h-12 border border-[rgba(8,13,28,0.14)] flex items-center justify-center text-xl mb-7 transition-all duration-300 group-hover:bg-[var(--green)] group-hover:border-[var(--green)]">
                {init.icon}
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
    </section>
  );
}
