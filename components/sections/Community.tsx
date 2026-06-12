import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import { communitySteps, communityStats } from "@/data/community";

export default function Community() {
  return (
    <section className="section-base bg-[#020817]" id="community">
      <div className="section-container">
        <div className="grid grid-cols-2 gap-20 items-center max-lg:grid-cols-1 max-lg:gap-12">
          <RevealOnScroll>
            <SectionHeader label="Join Us" title="Be Part of the Builder Network" />
            <p className="text-[15px] text-white/[0.42] font-light leading-[2] mb-10">
              E-Cell is a community you belong to. Over 1,200 builders across
              disciplines, connected by a single obsession: making things people want.
            </p>
            <div className="flex flex-col">
              {communitySteps.map((step) => (
                <div key={step.id} className="flex items-start gap-5 py-6 border-b border-[var(--border-g)]">
                  <span className="font-['Bebas_Neue',sans-serif] text-[28px] text-[var(--green-lt)] leading-none w-9 shrink-0">
                    {step.number}
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">{step.title}</h4>
                    <p className="text-xs text-white/[0.36] leading-[1.8] font-light">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button href="#" variant="primary">Apply Now</Button>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <div className="grid grid-cols-2 gap-3">
              {communityStats.map((stat) => (
                <div key={stat.id} className="card-pad bg-white/[0.02] border border-white/[0.06] rounded-2xl transition-all duration-300 hover:border-[var(--green-lt)]/35 text-center">
                  <div className="font-['Bebas_Neue',sans-serif] text-[56px] text-[var(--green-lt)] leading-none mb-3">{stat.value}</div>
                  <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/[0.36] mb-1">{stat.label}</div>
                  <p className="text-xs text-white/[0.2] mt-3 leading-[1.7]">{stat.description}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
