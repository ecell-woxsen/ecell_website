import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import { leadershipMembers } from "@/data/team";

export default function Team() {
  return (
    <section className="section-base bg-[#020817] relative overflow-hidden" id="team">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(30,107,46,0.06),transparent_60%)] pointer-events-none" />

      <div className="section-container relative z-10">
        <RevealOnScroll>
          <div className="flex justify-between items-end mb-16 max-lg:flex-col max-lg:items-start max-lg:gap-5">
            <div>
              <SectionHeader label="The People" title="Leadership" />
              <p className="text-[15px] text-white/40 font-light max-w-[420px] leading-[1.85] -mt-2">
                The three people who set the vision, hold the culture, and make the hard calls.
              </p>
            </div>
            <Button href="/team" variant="outline">
              Meet Full Team →
            </Button>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1 max-md:grid-cols-1">
          {leadershipMembers.map((member, i) => (
            <RevealOnScroll key={member.id} delay={Math.min(i + 1, 3) as 1 | 2 | 3} className="flex flex-col">
              <div className="leadership-card flex-1 flex flex-col overflow-hidden">
                {/* Avatar area */}
                <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020817]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,175,98,0.07),transparent_60%)]" />

                  {/* Large initials */}
                  <span className="relative z-10 font-['Bebas_Neue',sans-serif] text-[80px] leading-none text-[rgba(76,175,98,0.18)] select-none tracking-wider">
                    {member.initials}
                  </span>

                  {/* Role badge */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-[rgba(76,175,98,0.12)] border border-[rgba(76,175,98,0.3)] text-[var(--green-lt)] rounded-full whitespace-nowrap">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="card-pad flex-1 flex flex-col">
                  <h3 className="font-['Bebas_Neue',sans-serif] text-[26px] tracking-[0.02em] text-white mb-1 leading-none">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[10px] tracking-[0.12em] text-white/35 uppercase mb-4">
                    {member.department}
                  </p>
                  {member.bio && (
                    <p className="text-[13px] text-white/45 font-light leading-[1.75] flex-1">
                      {member.bio}
                    </p>
                  )}
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--green-lt)] opacity-60 hover:opacity-100 transition-opacity no-underline"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </Link>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
