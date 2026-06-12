import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { values, miniPillars, aboutBody } from "@/data/values";

function getValueIcon(id: string) {
  switch (id) {
    case "build-first":
      return (
        <svg className="w-5.5 h-5.5 text-[var(--green-lt)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "fail-forward":
      return (
        <svg className="w-5.5 h-5.5 text-[var(--green-lt)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3" />
        </svg>
      );
    case "community-driven":
      return (
        <svg className="w-5.5 h-5.5 text-[var(--green-lt)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case "impact-matters":
      return (
        <svg className="w-5.5 h-5.5 text-[var(--green-lt)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function About() {
  return (
    <section
      className="section-base bg-[#020817] relative overflow-hidden about-sec"
      id="about"
    >
      <div className="section-container">
        <div className="grid grid-cols-2 gap-20 items-center max-lg:grid-cols-1 max-lg:gap-12">
          {/* Left */}
          <RevealOnScroll>
            <SectionHeader label="Who We Are" title="More Than a Club." />
            <div
              className="text-[15px] text-white/[0.48] font-light leading-[1.9] mb-9 [&_strong]:text-white/[0.85] [&_strong]:font-medium"
              dangerouslySetInnerHTML={{ __html: aboutBody }}
            />

            <div className="grid grid-cols-2 gap-2 mt-9">
              {miniPillars.map((p) => (
                <div
                  key={p.id}
                  className="card-pad bg-[rgba(30,107,46,0.07)] border border-[var(--border-g)] rounded-xl transition-all duration-300 hover:bg-[rgba(26,47,94,0.3)] hover:border-[rgba(26,47,94,0.5)] text-center"
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
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--green-lt)] mb-8 opacity-70">
              What We Stand For
            </p>
            <div className="flex flex-col gap-1">
              {values.map((v, i) => (
                <div
                  key={v.id}
                  className="group relative flex flex-col gap-3 py-8 border-b border-[var(--border-g)] transition-all duration-300 hover:pl-4 cursor-default"
                >
                  {/* Large background index number */}
                  <span className="absolute right-0 top-4 font-['Bebas_Neue',sans-serif] text-[80px] leading-none text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-300 select-none pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon + Title row */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 border border-[var(--border-g)] rounded-xl flex items-center justify-center text-xl shrink-0 transition-all duration-300 group-hover:border-[var(--green-lt)] group-hover:bg-[rgba(30,107,46,0.14)]">
                      {getValueIcon(v.id)}
                    </div>
                    <h4 className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[0.03em] leading-none text-white group-hover:text-[var(--green-lt)] transition-colors duration-300">
                      {v.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-[15px] text-white/[0.45] font-light leading-[1.75] pl-[60px]">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
