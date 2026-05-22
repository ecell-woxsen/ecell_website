import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import { teamMembers } from "@/data/team";

export default function Team() {
  return (
    <section className="section-base bg-[var(--ink2)]" id="team">
      <div className="section-container">
        <RevealOnScroll>
          <div className="flex justify-between items-end mb-15 max-lg:flex-col max-lg:items-start max-lg:gap-4">
            <SectionHeader label="The People" title="Core Team" />
            <Button href="#" variant="outline">
              Full Team →
            </Button>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2">
          {teamMembers.map((member, i) => (
            <RevealOnScroll key={member.id} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}>
              <div className="bg-[var(--ink)] border border-[var(--border-g)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[rgba(76,175,98,0.45)] hover:-translate-y-1.5">
                {/* Image placeholder */}
                <div className="w-full aspect-[3/4] flex items-center justify-center font-['Bebas_Neue',sans-serif] text-[60px] text-[rgba(76,175,98,0.22)] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] to-transparent" />
                  <span className="relative z-10">{member.initials}</span>
                </div>

                {/* Info */}
                <div className="px-5.5 py-4.5 pb-6">
                  <h4 className="text-[15px] font-medium text-[var(--white)] mb-1">
                    {member.name}
                  </h4>
                  <p className="font-mono text-[10px] tracking-[0.12em] text-[var(--green-lt)] uppercase mb-2">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-white/[0.32]">
                    {member.department}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
