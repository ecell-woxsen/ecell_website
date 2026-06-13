"use client";

import { useState } from "react";
import type { EventItem } from "@/data/events";
import { events } from "@/data/events";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  upcoming: {
    bg: "bg-[rgba(76,175,98,0.06)]",
    text: "text-[var(--green-lt)]",
    border: "border-[rgba(76,175,98,0.22)]",
  },
  workshop: {
    bg: "bg-[rgba(96,200,240,0.06)]",
    text: "text-[#60C8F0]",
    border: "border-[rgba(96,200,240,0.22)]",
  },
  competition: {
    bg: "bg-[rgba(255,179,71,0.06)]",
    text: "text-[#FFB347]",
    border: "border-[rgba(255,179,71,0.22)]",
  },
  talk: {
    bg: "bg-[rgba(196,170,255,0.06)]",
    text: "text-[#C4AAFF]",
    border: "border-[rgba(196,170,255,0.22)]",
  },
};

const filters = ["All", "Upcoming", "Workshop", "Competition", "Talk"] as const;
type Filter = (typeof filters)[number];

function EventCard({ ev }: { ev: EventItem }) {
  const colors = tagColors[ev.tagType] || tagColors.upcoming;

  return (
    <div className={`flex flex-col ${ev.featured ? "col-span-2 max-lg:col-span-1" : ""}`}>
      <div
        className={`card-pad group relative flex flex-col justify-between bg-white/[0.02] border border-white/[0.06] hover:border-[var(--green-lt)]/35 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_45px_rgba(30,107,46,0.08)] flex-1 overflow-hidden ${
          ev.featured
            ? "bg-gradient-to-br from-[rgba(26,47,94,0.22)] to-white/[0.02] border-[rgba(26,47,94,0.36)] hover:border-[rgba(76,175,98,0.45)]"
            : ""
        }`}
      >
        {/* Sweep */}
        <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />

        <div>
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 mb-7">
            <div className="flex items-center gap-3">
              <Tag variant="date">{ev.date}</Tag>
              <Tag variant="category" className={`${colors.text} ${colors.bg} ${colors.border}`}>
                {ev.tag}
              </Tag>
            </div>
            {ev.featured && (
              <Tag variant="featured">Featured Event</Tag>
            )}
          </div>

          {/* Title */}
          <h3
            className={`font-['Bebas_Neue',sans-serif] tracking-[0.03em] leading-[1.05] text-white mb-3.5 group-hover:text-[var(--green-lt)] transition-colors duration-300 ${
              ev.featured ? "text-[40px] md:text-[52px]" : "text-[32px]"
            }`}
          >
            {ev.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-2 text-[12px] text-white/40 mb-5 font-mono tracking-wide">
            <svg className="w-3.5 h-3.5 opacity-60 text-[var(--green-lt)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{ev.meta}</span>
          </div>

          <p className="text-white/45 font-light leading-[1.75] mb-8 text-[13.5px]">
            {ev.description}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between group-hover:border-white/[0.08] transition-colors duration-300">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--green-lt)] font-semibold flex items-center gap-2 group-hover:text-white transition-colors duration-300">
            Learn More & RSVP
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[var(--green-lt)] transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = activeFilter === "All"
    ? events
    : events.filter((e) => e.tag.toLowerCase() === activeFilter.toLowerCase());

  return (
    <>
      {/* ── PAGE HERO ── */}
      <div className="page-hero mesh-bg-events">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,47,94,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(26,47,94,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="animate-fade-up delay-1">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-5 flex items-center gap-3.5 opacity-80">
              <span className="w-7 h-px bg-[var(--green-lt)] opacity-50" />
              What&apos;s Happening
            </p>
          </div>

          <h1 className="font-['Bebas_Neue',sans-serif] text-[clamp(64px,9vw,140px)] leading-[0.88] tracking-[-0.02em] text-white mb-7 animate-fade-up delay-2">
            Events &<br />
            <span className="text-[var(--green-lt)]">Programs.</span>
          </h1>

          <p className="max-w-[540px] text-[15px] leading-[1.9] text-white/45 font-light animate-fade-up delay-3">
            From 54-hour startup sprints to intimate VC fireside chats — curated experiences for every stage of your founder journey.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />
      </div>

      {/* ── EVENTS GRID ── */}
      <section className="section-base bg-[#020817]">
        <div className="section-container">
          {/* Filter tabs */}
          <RevealOnScroll>
            <div className="flex items-center gap-2.5 mb-14 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`filter-tab ${activeFilter === f ? "active" : ""}`}
                  id={`filter-${f.toLowerCase()}`}
                >
                  {f}
                </button>
              ))}
              <span className="font-mono text-[10px] tracking-[0.12em] text-white/25 uppercase ml-auto">
                {filtered.length} event{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </RevealOnScroll>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
              {filtered.map((ev) => (
                <EventCard key={ev.id} ev={ev} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/30">
                No events in this category yet
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── PAST EVENTS ── */}
      <section className="section-base bg-[#020817] pt-0">
        <div className="section-container">
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(30,107,46,0.25)] to-transparent mb-20" />

          <RevealOnScroll>
            <SectionHeader label="Archive" title="Past Events" />
            <p className="text-[15px] text-white/40 font-light max-w-[480px] leading-[1.85] mb-14 -mt-2">
              Every event is a lesson. Here&apos;s a glimpse at what we&apos;ve built so far.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {[
              { title: "Founders' Weekend 3.0", date: "Dec 2024", tag: "Hackathon" },
              { title: "Startup Expo 2024", date: "Oct 2024", tag: "Exhibition" },
              { title: "VC Panel: Deep Tech", date: "Sep 2024", tag: "Talk" },
              { title: "Brand Building Workshop", date: "Aug 2024", tag: "Workshop" },
              { title: "E-Cell Induction Night", date: "Jul 2024", tag: "Event" },
              { title: "Pitch Battle Season 3", date: "Jun 2024", tag: "Competition" },
            ].map((pe, i) => (
              <RevealOnScroll key={pe.title} delay={Math.min((i % 3) + 1, 3) as 1 | 2 | 3}>
                <div className="card-pad bg-white/[0.01] border border-white/[0.04] rounded-xl hover:border-white/[0.08] transition-all duration-300 opacity-60 hover:opacity-100">
                  <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/30 mb-3">
                    {pe.date} · {pe.tag}
                  </p>
                  <h4 className="text-[15px] font-medium text-white/70">{pe.title}</h4>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-base bg-[#020817] pt-0 pb-[100px]">
        <div className="section-container">
          <RevealOnScroll>
            <div className="card-pad bg-[rgba(30,107,46,0.05)] border border-[rgba(30,107,46,0.18)] rounded-2xl text-center max-w-[720px] mx-auto">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-4 opacity-70">
                Don&apos;t miss out
              </p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(36px,5vw,64px)] leading-[0.95] text-white mb-5">
                Want to host an event with us?
              </h2>
              <p className="text-[14px] text-white/40 font-light leading-[1.85] mb-8 max-w-[460px] mx-auto">
                Partner with E-Cell to run workshops, panels, or hackathons. We bring the community — you bring the expertise.
              </p>
              <Button href="/#contact" variant="primary">Reach Out →</Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
