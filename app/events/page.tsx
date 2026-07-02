"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { EventItem } from "@/data/events";
import { events } from "@/data/events";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import EventCard from "@/components/ui/EventCard";

const filters = ["All", "Upcoming", "Workshop", "Competition", "Talk"] as const;
type Filter = (typeof filters)[number];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const filtered = (
    activeFilter === "All"
      ? [...events]
      : events.filter((e) => e.tag.toLowerCase() === activeFilter.toLowerCase())
  ).sort((a, b) => a.priority - b.priority);

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

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />
      </div>

      {/* ── EVENTS GRID ── */}
      <section className="section-base bg-[#020817]">
        <div className="section-container">
          {/* Filter tabs */}
          <RevealOnScroll>
            <div
              className={`flex items-center gap-2.5 mb-14 flex-wrap transition-transform duration-500 ${
                hoveredCardId ? "-translate-y-2" : ""
              }`}
            >
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
                <EventCard
                  key={ev.id}
                  ev={ev}
                  onHoverChange={(isHovered) => {
                    setHoveredCardId((prev) =>
                      isHovered ? ev.id : prev === ev.id ? null : prev
                    );
                  }}
                />
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
          <RevealOnScroll className="w-full flex justify-center">
            <div className="card-pad w-full bg-[rgba(30,107,46,0.05)] border border-[rgba(30,107,46,0.18)] rounded-2xl text-center max-w-[720px] mx-auto">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-4 opacity-70">
                Don&apos;t miss out
              </p>
              <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(36px,5vw,64px)] leading-[0.95] text-white mb-5">
                Want to host an event with us?
              </h2>
              <p className="text-center text-[14px] text-white/40 font-light leading-[1.85] mb-8 max-w-[860px] mx-auto">
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
