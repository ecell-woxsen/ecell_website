import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { affiliations } from "@/data/affiliations";

export default function Affiliations() {
  return (
    <section
      className="section-base bg-[#020817] text-white"
      id="affiliations"
    >
      <div className="section-container">
        <RevealOnScroll>
          <SectionHeader
            label="Our Network"
            title="Affiliations & Partners"
          />
        </RevealOnScroll>

        <div className="grid grid-cols-5 gap-3 mt-14 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {affiliations.map((a) => (
            <RevealOnScroll key={a.id}>
              <div className="card-pad bg-white/[0.02] border border-white/[0.06] rounded-xl min-h-[100px] flex items-center justify-center font-['Bebas_Neue',sans-serif] text-[17px] tracking-[0.12em] text-white/35 transition-all duration-300 text-center leading-[1.3] hover:bg-white/[0.05] hover:text-white/80 hover:border-[var(--green-lt)]/35">
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
  );
}
