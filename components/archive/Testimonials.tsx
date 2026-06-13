"use client";

import { useState, useEffect, useRef } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeader from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 250);
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
        setAnimating(false);
      }, 250);
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const t = testimonials[active];

  return (
    <section className="section-base bg-[#020817] relative overflow-hidden" id="testimonials">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(26,47,94,0.18),transparent_65%)] pointer-events-none" />

      <div className="section-container relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionHeader label="Founder Stories" title="Built Here. Scaled There." />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={2}>
          <div className="max-w-[820px] mx-auto">
            {/* Quote card */}
            <div
              className="testimonial-card"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(12px)" : "translateY(0)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
              }}
            >
              <p className="text-[17px] text-white/70 font-light leading-[1.9] mb-8 relative z-10">
                {t.quote}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgba(76,175,98,0.12)] border border-[rgba(76,175,98,0.25)] flex items-center justify-center font-['Bebas_Neue',sans-serif] text-[16px] text-[var(--green-lt)] shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white">{t.name}</p>
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--green-lt)] opacity-70">
                    {t.venture} · {t.batch}
                  </p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-3 mt-10 py-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    goTo(i);
                    startInterval();
                  }}
                  className={`btn-base transition-all duration-300 rounded-full cursor-pointer border-none px-1 py-2 ${
                    i === active
                      ? "w-6 h-1.5 bg-[var(--green-lt)]"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
