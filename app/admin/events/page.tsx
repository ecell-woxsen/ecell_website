"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import EventFormDrawer from "@/components/admin/EventFormDrawer";

export default function AdminEventsPage() {
  const events = useQuery(api.events.list);
  const registrations = useQuery(api.admin.getAllRegistrations);
  const deleteEvent = useMutation(api.events.remove);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  if (events === undefined || registrations === undefined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="font-mono text-[11px] tracking-[0.2em] text-white/30 uppercase">
          Loading events console...
        </div>
      </div>
    );
  }

  // Count registrations per event
  const getRegCount = (eventId: string) => {
    return registrations.filter((r) => r.eventId === eventId).length;
  };

  const handleEditClick = (event: any) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedEvent(null);
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = async (event: any) => {
    if (confirm(`Are you sure you want to delete the event "${event.title}"? This will permanently delete the event record.`)) {
      try {
        await deleteEvent({ id: event._id });
      } catch (err: any) {
        alert(err.message || "Failed to delete event.");
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-2">
            CMS Portal
          </p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-4xl tracking-wider text-white">
            Program Management
          </h1>
        </div>
        <button
          onClick={handleCreateClick}
          className="px-5 py-2.5 bg-[var(--green)] hover:bg-[var(--green-mid)] text-white font-mono text-[10px] tracking-wider uppercase rounded-xl transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(76,175,98,0.25)]"
        >
          + Add New Event
        </button>
      </div>

      {/* Events Table */}
      <div className="bg-[#050b18]/40 border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">Event Title</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">Date</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">Slug</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 text-center">Registrations</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 text-center">Status</th>
                <th className="p-4.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-[13.5px] font-sans">
              {events.length > 0 ? (
                events.map((ev) => (
                  <tr key={ev._id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4.5">
                      <div className="font-medium text-white">{ev.title}</div>
                      <div className="text-[11px] text-white/40 mt-0.5">{ev.tag}</div>
                    </td>
                    <td className="p-4.5 text-white/70">{ev.date}</td>
                    <td className="p-4.5 font-mono text-[11px] text-white/50">{ev.slug}</td>
                    <td className="p-4.5 text-center font-mono font-medium text-white/90">
                      {getRegCount(ev.slug)}
                    </td>
                    <td className="p-4.5">
                      <div className="flex items-center justify-center gap-2">
                        {ev.featured && (
                          <span className="px-2 py-0.5 bg-[rgba(196,170,255,0.08)] border border-[rgba(196,170,255,0.22)] text-[10px] font-mono tracking-wider uppercase text-[#C4AAFF] rounded-md">
                            Featured
                          </span>
                        )}
                        <span className={`px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-md ${
                          ev.registrationOpen
                            ? "bg-[rgba(76,175,98,0.08)] border border-[rgba(76,175,98,0.22)] text-[var(--green-lt)]"
                            : "bg-white/[0.04] border border-white/[0.08] text-white/30"
                        }`}>
                          {ev.registrationOpen ? "Open" : "Closed"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4.5 text-right space-x-2">
                      <Link
                        href={`/admin/events/${ev.slug}/registrations`}
                        className="inline-block px-3.5 py-1.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white/80 hover:text-white font-mono text-[10px] uppercase rounded-lg transition-all"
                      >
                        Registrations
                      </Link>
                      <button
                        onClick={() => handleEditClick(ev)}
                        className="px-3.5 py-1.5 bg-[#080d1c] hover:bg-[var(--green)]/15 border border-white/[0.08] hover:border-[var(--green-lt)]/30 text-white/80 hover:text-[var(--green-lt)] font-mono text-[10px] uppercase rounded-lg transition-all cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(ev)}
                        className="px-3.5 py-1.5 bg-[#080d1c] hover:bg-red-950/20 border border-white/[0.08] hover:border-red-500/30 text-white/60 hover:text-red-400 font-mono text-[10px] uppercase rounded-lg transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-white/20 font-mono uppercase tracking-wider">
                    No events registered in CMS.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Drawer */}
      <EventFormDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedEvent(null);
        }}
        eventToEdit={selectedEvent}
      />
    </div>
  );
}
