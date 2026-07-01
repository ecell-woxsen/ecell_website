import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import TeamCard from "@/components/ui/TeamCard";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meet the Team — E-Cell Woxsen",
  description:
    "The builders behind E-Cell Woxsen. Meet our leadership, core team, and the people driving entrepreneurship at Woxsen University.",
};

export default async function TeamPage() {
  const dbMembers = await fetchQuery(api.team.listActive);
  
  const members = dbMembers.map((m) => ({
    id: m._id, // map database ID to component expects
    name: m.name,
    role: m.role,
    department: m.department,
    initials: m.initials,
    image: m.image,
    bio: m.bio,
    linkedin: m.linkedin,
    isLeadership: m.isLeadership,
  }));

  const leadershipMembers = members.filter((m) => m.isLeadership);
  const coreTeamMembers = members.filter((m) => !m.isLeadership);

  return (
    <>

      {/* ── PAGE HERO ── */}
      <div className="page-hero mesh-bg-team">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,107,46,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(30,107,46,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="animate-fade-up delay-1">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-5 flex items-center gap-3.5 opacity-80">
              <span className="w-7 h-px bg-[var(--green-lt)] opacity-50" />
              The People
            </p>
          </div>

          <h1 className="font-['Bebas_Neue',sans-serif] text-[clamp(64px,9vw,140px)] leading-[0.88] tracking-[-0.02em] text-white mb-7 animate-fade-up delay-2">
            Meet the
            <br />
            <span className="text-[var(--green-lt)]">Builders.</span>
          </h1>

          <p className="max-w-[520px] text-[15px] leading-[1.9] text-white/45 font-light animate-fade-up delay-3">
            A tight-knit team of student founders, operators, and creatives — obsessed with building things that matter.
          </p>

          {/* Right Side Logo */}
          <Link 
            href="/"
            className="absolute top-1/2 -translate-y-1/2 right-4 animate-fade-in delay-2 max-lg:hidden block cursor-pointer"
          >
            <Image
              src="/ecell-logo.png"
              alt="E-Cell Woxsen Logo"
              width={280}
              height={280}
              className="w-[280px] h-[280px] object-contain opacity-95 hover:opacity-100 transition-all duration-500 hover:scale-105"
              priority
            />
          </Link>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />
      </div>

      {/* ── LEADERSHIP ── */}
      <section className="section-base bg-[#020817]">
        <div className="section-container">
          <RevealOnScroll>
            <SectionHeader label="At the Helm" title="Leadership" />
            <p className="text-[15px] text-white/40 font-light max-w-[500px] leading-[1.85] mb-16 -mt-2">
              The three people who set the vision, hold the culture, and make the hard calls every day.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
            {leadershipMembers.map((member, i) => (
              <RevealOnScroll key={member.id} delay={Math.min(i + 1, 3) as 1 | 2 | 3} className="flex flex-col">
                <TeamCard member={member} variant="leadership" />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE TEAM ── */}
      <section className="section-base bg-[#020817] pt-0">
        <div className="section-container">
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(30,107,46,0.25)] to-transparent mb-20" />

          <RevealOnScroll>
            <SectionHeader label="Core Team" title="The Engine Room" />
            <p className="text-[15px] text-white/40 font-light max-w-[480px] leading-[1.85] mb-14 -mt-2">
              The specialists who make every event, campaign, and partnership happen.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {coreTeamMembers.map((member, i) => (
              <RevealOnScroll key={member.id} delay={Math.min((i % 4) + 1, 4) as 1 | 2 | 3 | 4} className="flex flex-col">
                <TeamCard member={member} variant="core" />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="section-base bg-[#020817] pt-0 pb-[120px]">
        <div className="section-container">
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(30,107,46,0.25)] to-transparent mb-20" />

          <RevealOnScroll className="w-full flex flex-col items-center justify-center">
            <div className="text-center max-w-[640px] mx-auto">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-4 opacity-70">
                We&apos;re Growing
              </p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(40px,6vw,80px)] leading-[0.95] text-white mb-6">
                Want to Join the{" "}
                <span className="text-[var(--green-lt)]">Team?</span>
              </h2>
              <p className="text-[15px] text-white/40 font-light leading-[1.85] mb-10">
                We&apos;re always looking for passionate builders to join our core team. No experience required — just drive.
              </p>
              <div className="flex gap-4 justify-center max-sm:flex-col max-sm:items-center">
                <Button href="/submit-idea" variant="primary">Apply Now →</Button>
                <Button href="/#contact" variant="outline">Get in Touch</Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
