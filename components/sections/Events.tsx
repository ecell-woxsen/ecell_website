"use client";

import { useEffect, useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import { events } from "@/data/events";

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

export default function Events() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Single observer on the grid — fires once, then disconnects.
  // All card animations are driven purely by CSS after the class is added.
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
        /* Cards start invisible only when JS is ready — prevents no-JS flash */
        .events-grid .event-card {
          opacity: 0;
          transform: translateY(18px);
          /* No transition yet — avoids flash on mount */
        }

        /* Once section enters view, unleash all cards via CSS */
        .events-grid.events-visible .event-card {
          animation: eventCardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Stagger each card using nth-child — zero JS overhead */
        .events-grid.events-visible .event-card:nth-child(1) { animation-delay: 0.00s; }
        .events-grid.events-visible .event-card:nth-child(2) { animation-delay: 0.07s; }
        .events-grid.events-visible .event-card:nth-child(3) { animation-delay: 0.07s; }
        .events-grid.events-visible .event-card:nth-child(4) { animation-delay: 0.14s; }
        .events-grid.events-visible .event-card:nth-child(5) { animation-delay: 0.14s; }

        @keyframes eventCardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="section-base bg-[var(--ink)] relative overflow-hidden" id="events">
        <div className="section-container relative z-10">
          <RevealOnScroll>
            <div className="flex justify-between items-end mb-16 max-lg:flex-col max-lg:items-start max-lg:gap-6">
              <SectionHeader label="What's Happening" title="Events & Programs" />
              <Button href="#" variant="outline">
                View All Events
              </Button>
            </div>
          </RevealOnScroll>

          <div ref={gridRef} className="events-grid grid grid-cols-2 gap-6 max-lg:grid-cols-1">
            {events.map((ev) => {
              const colors = tagColors[ev.tagType] || tagColors.upcoming;

              return (
                <div
                  key={ev.id}
                  className={`event-card flex flex-col ${ev.featured ? "col-span-2 max-lg:col-span-1" : ""}`}
                >
                  <div
                    className={`card-pad group relative flex flex-col justify-between bg-white/[0.02] border border-white/[0.06] hover:border-[var(--green-lt)]/35 rounded-2xl text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_45px_rgba(30,107,46,0.08)] flex-1 overflow-hidden ${
                      ev.featured
                        ? "bg-gradient-to-br from-[rgba(26,47,94,0.22)] to-white/[0.02] border-[rgba(26,47,94,0.36)] hover:border-[rgba(76,175,98,0.45)]"
                        : ""
                    }`}
                  >
                    {/* Hover Reflection Sweep Effect */}
                    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />

                    <div>
                      {/* Top Bar (Date & Tag) */}
                      <div className="flex items-center justify-between gap-4 mb-7">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase text-white/80 font-medium">
                            {ev.date}
                          </div>
                          <span className={`font-mono text-[9px] tracking-[0.16em] uppercase px-2.5 py-1.5 border rounded-md ${colors.text} ${colors.bg} ${colors.border} font-medium`}>
                            {ev.tag}
                          </span>
                        </div>

                        {ev.featured && (
                          <span className="font-mono text-[8px] tracking-[0.2em] uppercase bg-[var(--green)]/20 text-[var(--green-lt)] border border-[var(--green)]/30 px-2.5 py-1 rounded font-medium">
                            Featured Event
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className={`font-['Bebas_Neue',sans-serif] tracking-[0.03em] leading-[1.05] text-white mb-3.5 group-hover:text-[var(--green-lt)] transition-colors duration-300 ${
                        ev.featured ? "text-[40px] md:text-[48px]" : "text-[32px]"
                      }`}>
                        {ev.title}
                      </h3>

                      {/* Meta info */}
                      <div className="flex items-center gap-2 text-[12px] text-white/40 mb-5 font-mono tracking-wide">
                        <svg className="w-3.5 h-3.5 opacity-60 text-[var(--green-lt)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{ev.meta}</span>
                      </div>

                      {/* Description */}
                      <p className="text-white/45 font-light leading-[1.75] mb-8 text-[13.5px] text-left">
                        {ev.description}
                      </p>
                    </div>

                    {/* Footer Action */}
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
            })}
          </div>
        </div>
      </section>
    </>
  );
}
