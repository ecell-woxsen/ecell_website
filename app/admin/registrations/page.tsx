"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function AdminAllRegistrationsPage() {
  const registrations = useQuery(api.admin.getAllRegistrations);
  const [searchTerm, setSearchTerm] = useState("");

  if (registrations === undefined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="font-mono text-[11px] tracking-[0.2em] text-white/30 uppercase">
          Loading master registration logs...
        </div>
      </div>
    );
  }

  const filtered = registrations.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.eventTitle.toLowerCase().includes(term) ||
      (r.course && r.course.toLowerCase().includes(term)) ||
      (r.school && r.school.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-2">
            Operations Portal
          </p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-4xl tracking-wider text-white">
            Master Registrations
          </h1>
          <p className="text-[12px] text-white/40 mt-1 font-light">
            Aggregated registrant list across all active programs
          </p>
        </div>

        {/* Excel Export Button */}
        <a
          href="/api/admin/export"
          className="px-5 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white font-mono text-[10px] tracking-wider uppercase rounded-xl transition-all inline-flex items-center gap-2 hover:border-[var(--green-lt)]/35"
        >
          <svg className="w-3.5 h-3.5 text-[var(--green-lt)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Master Workbook
        </a>
      </div>

      {/* Search & Counts */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-[#050b18]/30 border border-white/[0.04] p-4 rounded-xl">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by student name, email, event title, course..."
          className="w-full max-w-[360px] px-4 py-2 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
        />
        <div className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
          Showing <span className="text-white font-bold">{filtered.length}</span> of {registrations.length} total registrations
        </div>
      </div>

      {/* Master Table */}
      <div className="bg-[#050b18]/40 border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">Student Name</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">Registered Program</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">Contact details</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">School / Course</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 text-right">Registered At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-[13px] font-sans">
              {filtered.length > 0 ? (
                filtered.map((r) => (
                  <tr key={r._id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4.5 font-medium text-white">{r.name}</td>
                    <td className="p-4.5">
                      <span className="inline-block px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono tracking-wider uppercase text-[var(--green-lt)] rounded-full">
                        {r.eventTitle}
                      </span>
                    </td>
                    <td className="p-4.5">
                      <div className="text-white/80">{r.email}</div>
                      <div className="text-white/40 font-mono text-[11px] mt-0.5">{r.phone}</div>
                    </td>
                    <td className="p-4.5">
                      <div className="text-white/70 truncate max-w-[200px]" title={r.school}>
                        {r.school || "—"}
                      </div>
                      <div className="text-white/45 text-[11.5px] mt-0.5 truncate max-w-[200px]" title={r.course}>
                        {r.course} {r.year ? `(Year: ${r.year})` : ""}
                      </div>
                    </td>
                    <td className="p-4.5 text-right font-mono text-[11px] text-white/40">
                      {new Date(r.registeredAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-white/20 font-mono uppercase tracking-wider">
                    No registrations found.
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
