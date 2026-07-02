"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import EventRegistrationModal from "@/components/ui/EventRegistrationModal";
import { events, type EventItem } from "@/data/events";

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

// Show only the 3 highest priority events as preview on the homepage
const previewEvents = [...events].sort((a, b) => a.priority - b.priority).slice(0, 3);

export default function Events() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [registerEvent, setRegisterEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.classList.add("events-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .events-grid .event-card {
          opacity: 0;
          transform: translateY(18px);
        }
        .events-grid.events-visible .event-card {
          animation: eventCardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .events-grid.events-visible .event-card:nth-child(1) { animation-delay: 0.00s; }
        .events-grid.events-visible .event-card:nth-child(2) { animation-delay: 0.07s; }
        .events-grid.events-visible .event-card:nth-child(3) { animation-delay: 0.14s; }

        @keyframes eventCardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="section-base bg-[#020817] relative overflow-hidden" id="events">
        <div className="section-container relative z-10">
          <RevealOnScroll>
            <div className="flex justify-between items-end mb-16 max-lg:flex-col max-lg:items-start max-lg:gap-6">
              <div>
                <SectionHeader label="What's Happening" title="Events & Programs" />
                <p className="text-[15px] text-white/40 font-light max-w-[380px] leading-[1.85] -mt-2">
                  From 54-hour sprints to intimate fireside chats — always something worth showing up for.
                </p>
              </div>
              <Button href="/events" variant="outline">
                View All Events →
              </Button>
            </div>
          </RevealOnScroll>

          <div ref={gridRef} className="events-grid grid grid-cols-3 gap-5 max-lg:grid-cols-1">
            {previewEvents.map((ev) => {
              const colors = tagColors[ev.tagType] || tagColors.upcoming;
              const isOtherHovered = Boolean(hovered && hovered !== ev.id);

              return (
                <div
                  key={ev.id}
                  className="event-card flex flex-col"
                  onMouseEnter={() => setHovered(ev.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className={`card-pad group relative flex flex-col justify-between bg-white/[0.02] backdrop-blur-md border border-white/[0.08] hover:border-[var(--green-lt)]/40 rounded-2xl text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(30,107,46,0.12)] flex-1 overflow-hidden ${
                      isOtherHovered ? "translate-y-1.5 scale-[0.98] opacity-75 hover:opacity-100 hover:scale-100 hover:translate-y-0" : ""
                    } ${
                      ev.featured
                        ? "bg-gradient-to-br from-[rgba(26,47,94,0.25)] to-white/[0.03] border-[rgba(26,47,94,0.4)] hover:border-[rgba(76,175,98,0.5)]"
                        : ""
                    }`}
                  >
                    {/* Hover Reflection Sweep Effect */}
                    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />

                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center gap-3 mb-7">
                        <Tag variant="date">{ev.date}</Tag>
                        <Tag variant="category" className={`${colors.text} ${colors.bg} ${colors.border}`}>
                          {ev.tag}
                        </Tag>
                        {ev.featured && (
                          <Tag variant="featured">Featured</Tag>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-['Bebas_Neue',sans-serif] text-[30px] tracking-[0.03em] leading-[1.05] text-white mb-3 group-hover:text-[var(--green-lt)] transition-colors duration-300">
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

                      {/* Description */}
                      <p className="text-white/45 font-light leading-[1.75] mb-8 text-[13px]">
                        {ev.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-5 border-t border-white/[0.04] flex items-center justify-between group-hover:border-white/[0.08] transition-colors duration-300">
                      <button
                        onClick={() => setRegisterEvent(ev)}
                        className="reg-card-btn"
                        type="button"
                        id={`home-register-${ev.id}`}
                      >
                        Register Now
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
                      </button>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[var(--green-lt)] transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration modal shared across all cards */}
      {registerEvent && (
        <EventRegistrationModal
          event={registerEvent}
          isOpen={!!registerEvent}
          onClose={() => setRegisterEvent(null)}
        />
      )}
    </>
  );
}
