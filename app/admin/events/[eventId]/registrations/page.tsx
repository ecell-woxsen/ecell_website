"use client";

import { useState, use, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default function EventRegistrationsPage({ params }: PageProps) {
  const { eventId } = use(params);

  const event = useQuery(api.events.getBySlug, { slug: eventId });
  const registrations = useQuery(api.admin.getRegistrationsForEvent, { eventId });

  const [searchTerm, setSearchTerm] = useState("");

  if (event === undefined || registrations === undefined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="font-mono text-[11px] tracking-[0.2em] text-white/30 uppercase">
          Loading student roster...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="font-mono text-[12px] tracking-[0.2em] text-white/30 uppercase">
          Event not found
        </p>
        <Link href="/admin/events" className="text-[11px] font-mono text-[var(--green-lt)] uppercase">
          Back to Events List
        </Link>
      </div>
    );
  }

  const filtered = registrations.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      (r.course && r.course.toLowerCase().includes(term)) ||
      (r.school && r.school.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back link */}
      <div>
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-[10px] font-mono text-white/40 hover:text-white uppercase tracking-widest transition-colors"
        >
          ← Back to CMS
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-2">
            Event Registrations
          </p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-4xl tracking-wider text-white">
            {event.title}
          </h1>
          <p className="text-[12px] text-white/40 mt-1 font-light">
            Roster for program slug: <span className="font-mono text-white/60">{eventId}</span>
          </p>
        </div>

        {/* Excel Export Button */}
        <a
          href={`/api/admin/export?eventId=${eventId}`}
          className="px-5 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white font-mono text-[10px] tracking-wider uppercase rounded-xl transition-all inline-flex items-center gap-2 hover:border-[var(--green-lt)]/35"
        >
          <svg className="w-3.5 h-3.5 text-[var(--green-lt)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Excel Sheet
        </a>
      </div>

      {/* Search & Counts */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-[#050b18]/30 border border-white/[0.04] p-4 rounded-xl">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by student name, email, department..."
          className="w-full max-w-[360px] px-4 py-2 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
        />
        <div className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
          Showing <span className="text-white font-bold">{filtered.length}</span> of {registrations.length} registrations
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-[#050b18]/40 border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">Student Detail</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">Contact Info</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">School / College</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">Course & Year</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 text-right">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-[13px] font-sans">
              {filtered.length > 0 ? (
                filtered.map((r) => (
                  <tr key={r._id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4.5">
                      <div className="font-medium text-white">{r.name}</div>
                    </td>
                    <td className="p-4.5">
                      <div className="text-white/80">{r.email}</div>
                      <div className="text-white/40 font-mono text-[11px] mt-0.5">{r.phone}</div>
                    </td>
                    <td className="p-4.5 text-white/70">{r.school || "—"}</td>
                    <td className="p-4.5">
                      <div className="text-white/85">{r.course || "—"}</div>
                      {r.year && <div className="text-white/40 text-[11px] mt-0.5">Year: {r.year}</div>}
                    </td>
                    <td className="p-4.5 text-right font-mono text-[11px] text-white/40">
                      {new Date(r.registeredAt).toLocaleDateString()} {new Date(r.registeredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-white/20 font-mono uppercase tracking-wider">
                    No registrations found matching description.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
