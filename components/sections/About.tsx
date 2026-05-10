import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { values, miniPillars, aboutBody } from "@/data/values";

export default function About() {
  return (
    <section
      className="section-base bg-[var(--ink2)] relative overflow-hidden about-sec"
      id="about"
    >
      <div className="grid grid-cols-2 gap-20 items-start max-lg:grid-cols-1 max-lg:gap-12">
        {/* Left */}
        <RevealOnScroll>
          <SectionHeader label="Who We Are" title="More Than a Club." />
          <div
            className="text-[15px] text-white/[0.48] font-light leading-[1.9] mb-9 [&_strong]:text-white/[0.85] [&_strong]:font-medium"
            dangerouslySetInnerHTML={{ __html: aboutBody }}
          />

          <div className="grid grid-cols-2 gap-0.5 mt-9">
            {miniPillars.map((p) => (
              <div
                key={p.id}
                className="bg-[rgba(30,107,46,0.07)] border border-[var(--border-g)] px-5 py-5.5 transition-all duration-300 hover:bg-[rgba(26,47,94,0.3)] hover:border-[rgba(26,47,94,0.5)]"
              >
                <div className="font-['Bebas_Neue',sans-serif] text-[34px] text-[var(--green-lt)] leading-none mb-1.5">
                  {p.number}
                </div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/[0.45]">
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Right — Values */}
        <RevealOnScroll delay={2}>
          <div className="flex flex-col">
            {values.map((v) => (
              <div
                key={v.id}
                className="flex items-start gap-5.5 py-5.5 border-b border-[var(--border-g)] transition-[padding-left] duration-300 hover:pl-2.5 group"
              >
                <div className="w-10 h-10 border border-[var(--border-g)] flex items-center justify-center text-base shrink-0 transition-all duration-300 group-hover:border-[var(--green-lt)] group-hover:bg-[rgba(30,107,46,0.12)]">
                  {v.icon}
                </div>
                <div>
                  <h4 className="text-sm font-medium tracking-[0.04em] mb-1">
                    {v.title}
                  </h4>
                  <p className="text-xs text-white/[0.38] font-light leading-[1.6]">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
