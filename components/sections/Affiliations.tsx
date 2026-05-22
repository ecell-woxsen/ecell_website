import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { affiliations } from "@/data/affiliations";

export default function Affiliations() {
  return (
    <section
      className="section-base bg-[var(--paper)] text-[var(--ink)]"
      id="affiliations"
    >
      <div className="section-container">
        <RevealOnScroll>
          <SectionHeader
            label="Our Network"
            title="Affiliations & Partners"
            lightMode
          />
        </RevealOnScroll>

        <div className="grid grid-cols-5 gap-3 mt-14 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {affiliations.map((a) => (
            <RevealOnScroll key={a.id}>
              <div className="card-pad bg-[var(--paper2)] border border-[rgba(8,13,28,0.08)] rounded-xl min-h-[100px] flex items-center justify-center font-['Bebas_Neue',sans-serif] text-[17px] tracking-[0.12em] text-[rgba(8,13,28,0.28)] transition-all duration-300 text-center leading-[1.3] hover:bg-[var(--navy-deep)] hover:text-white/[0.62]">
                {a.name}
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[rgba(8,13,28,0.32)] mt-5.5 text-center">
          And growing — reach out to partner with us
        </p>
      </div>
    </section>
  );
}
