"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: StatItem[] = [
  { value: "24+", numericValue: 24, suffix: "+", label: "Startups Launched" },
  { value: "80+", numericValue: 80, suffix: "+", label: "Events Delivered" },
  { value: "1.2K", numericValue: 1200, suffix: "", label: "Community Members" },
  { value: "₹18L+", numericValue: 18, suffix: "L+", label: "Grants Disbursed", prefix: "₹" },
  { value: "40+", numericValue: 40, suffix: "+", label: "Mentor Network" },
];

function useCountUp(target: number, duration: number = 1500, active: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

function StatCard({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.numericValue, 1400, active);

  const displayValue = () => {
    if (!active) return "—";
    // For 1.2K (numericValue = 1200), show progressive K format
    if (stat.numericValue >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    // For all others, animate the number with prefix/suffix around it
    return `${stat.prefix ?? ""}${count}${stat.suffix}`;
  };

  return (
    <div className="stat-hover text-center px-8 border-r border-white/[0.07] last:border-r-0 max-lg:border-r-0 max-lg:border-b max-lg:last:border-b-0 max-lg:py-8 group cursor-default">
      <div
        className="impact-stat-num mb-2 transition-all duration-300 group-hover:drop-shadow-[0_0_24px_rgba(76,175,98,0.45)]"
      >
        {displayValue()}
      </div>
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35 group-hover:text-white/55 transition-colors duration-300">
        {stat.label}
      </div>
    </div>
  );
}

export default function ImpactBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-[#030a10] border-y border-[rgba(30,107,46,0.12)]"
    >
      {/* Animated accent line at top */}
      <div className="impact-accent-line w-full" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_100%_at_50%_50%,rgba(30,107,46,0.07),transparent_70%)] pointer-events-none" />

      <div className="section-container relative z-10 py-16">
        <div className="grid grid-cols-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>

      {/* Animated accent line at bottom */}
      <div className="impact-accent-line w-full" />
    </div>
  );
}
