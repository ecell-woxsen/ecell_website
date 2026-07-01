"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdminDashboard() {
  const stats = useQuery(api.admin.getDashboardStats);

  if (stats === undefined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="font-mono text-[11px] tracking-[0.2em] text-white/30 uppercase">
          Loading metrics...
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Total Registrations", value: stats.counts.registrations, color: "from-[rgba(76,175,98,0.25)] to-transparent" },
    { label: "Active Programs", value: stats.counts.events, color: "from-[rgba(96,200,240,0.25)] to-transparent" },
    { label: "Core Members", value: stats.counts.team, color: "from-[rgba(196,170,255,0.25)] to-transparent" },
    { label: "Ideas Submitted", value: stats.counts.ideas, color: "from-[rgba(255,179,71,0.25)] to-transparent" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-2">
          Management Console
        </p>
        <h1 className="font-['Bebas_Neue',sans-serif] text-4xl tracking-wider text-white">
          Overview Dashboard
        </h1>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {cards.map((c, i) => (
          <div
            key={i}
            className="p-6 bg-white/[0.01] border border-white/[0.06] rounded-2xl relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-20 pointer-events-none`} />
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 mb-3 relative z-10">
              {c.label}
            </p>
            <p className="text-4xl font-light text-white relative z-10">
              {c.value}
            </p>
          </div>
        ))}
      </div>

      {/* Columns: Recent Activity */}
      <div className="grid grid-cols-2 gap-6 max-xl:grid-cols-1">
        {/* Registrations */}
        <div className="bg-[#050b18]/40 border border-white/[0.06] rounded-2xl p-6 flex flex-col">
          <h3 className="font-['Bebas_Neue',sans-serif] text-xl tracking-wider text-white mb-5">
            Recent Registrations
          </h3>
          <div className="flex-1 space-y-4">
            {stats.recent.registrations.length > 0 ? (
              stats.recent.registrations.map((r: any) => (
                <div
                  key={r._id}
                  className="p-4 bg-white/[0.01] border border-white/[0.04] hover:border-white/[0.08] rounded-xl flex items-center justify-between gap-4 transition-colors"
                >
                  <div>
                    <h4 className="text-[13.5px] font-medium text-white">{r.name}</h4>
                    <p className="text-[11px] text-white/40 truncate max-w-[220px] font-light">
                      {r.email} · {r.phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono tracking-wider uppercase text-[var(--green-lt)] rounded-full">
                      {r.eventTitle}
                    </span>
                    <p className="text-[9px] font-mono text-white/30 mt-1.5">
                      {new Date(r.registeredAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[12px] font-mono text-white/20 py-8 text-center uppercase tracking-wider">
                No recent registrations
              </p>
            )}
          </div>
        </div>

        {/* Ideas */}
        <div className="bg-[#050b18]/40 border border-white/[0.06] rounded-2xl p-6 flex flex-col">
          <h3 className="font-['Bebas_Neue',sans-serif] text-xl tracking-wider text-white mb-5">
            Recent Idea Submissions
          </h3>
          <div className="flex-1 space-y-4">
            {stats.recent.ideas.length > 0 ? (
              stats.recent.ideas.map((idea: any) => (
                <div
                  key={idea._id}
                  className="p-4 bg-white/[0.01] border border-white/[0.04] hover:border-white/[0.08] rounded-xl flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[13.5px] font-medium text-white truncate">{idea.ideaTitle}</h4>
                    <p className="text-[11px] text-white/40 truncate font-light">
                      Submitted by {idea.name} ({idea.email})
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono tracking-wider uppercase text-[#60C8F0] rounded-full">
                      {idea.domain}
                    </span>
                    <p className="text-[9px] font-mono text-white/30 mt-1.5">
                      {new Date(idea.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[12px] font-mono text-white/20 py-8 text-center uppercase tracking-wider">
                No recent ideas
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
