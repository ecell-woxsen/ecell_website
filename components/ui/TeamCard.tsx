import Link from "next/link";
import { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
  variant?: "leadership" | "core";
}

export default function TeamCard({ member, variant }: TeamCardProps) {
  const isLeadership = variant === "leadership" || member.isLeadership;

  if (isLeadership) {
    return (
      <div className="leadership-card flex-1 flex flex-col overflow-hidden">
        {/* Avatar */}
        <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020817]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,175,98,0.08),transparent_65%)]" />
          <span className="relative z-10 font-['Bebas_Neue',sans-serif] text-[90px] leading-none text-[rgba(76,175,98,0.2)] select-none tracking-wider">
            {member.initials}
          </span>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-[rgba(76,175,98,0.12)] border border-[rgba(76,175,98,0.3)] text-[var(--green-lt)] rounded-full whitespace-nowrap">
              {member.role}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="card-pad flex-1 flex flex-col">
          <h2 className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[0.02em] text-white mb-1 leading-none">
            {member.name}
          </h2>
          <p className="font-mono text-[10px] tracking-[0.12em] text-white/35 uppercase mb-5">
            {member.department}
          </p>
          {member.bio && (
            <p className="text-[14px] text-white/50 font-light leading-[1.8] flex-1">
              {member.bio}
            </p>
          )}
          {member.linkedin && (
            <Link
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--green-lt)] opacity-60 hover:opacity-100 transition-opacity no-underline w-fit"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card flex-1 overflow-hidden flex flex-col">
      <div className="core-team-card-wrapper">
        {/* Compact avatar */}
        <div className="relative w-full aspect-[1/1] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020817]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,175,98,0.05),transparent_65%)]" />
          <span className="relative z-10 font-['Bebas_Neue',sans-serif] text-[56px] leading-none text-[rgba(76,175,98,0.18)] select-none tracking-wider">
            {member.initials}
          </span>
        </div>

        {/* Info */}
        <div className="px-5 py-5 flex-1 flex flex-col">
          <h3 className="text-[15px] font-medium text-white mb-1 leading-tight">
            {member.name}
          </h3>
          <p className="font-mono text-[9px] tracking-[0.12em] text-[var(--green-lt)] uppercase mb-2">
            {member.role}
          </p>
          <p className="text-[11px] text-white/30 mb-3">
            {member.department}
          </p>
          {member.bio && (
            <p className="text-[12px] text-white/40 font-light leading-[1.65] flex-1">
              {member.bio}
            </p>
          )}
          {member.linkedin && (
            <Link
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.14em] uppercase text-[var(--green-lt)] opacity-50 hover:opacity-100 transition-opacity no-underline"
            >
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
