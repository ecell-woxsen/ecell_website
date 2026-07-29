"use client";

import React from "react";

interface Step {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}

const processSteps: Step[] = [
  {
    id: "idea",
    label: "Idea",
    subtitle: "Spark",
    icon: (
      <svg
        className="w-10 h-10 sm:w-14 sm:h-14 text-[var(--green-lt)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    id: "build",
    label: "Build",
    subtitle: "Prototype",
    icon: (
      <svg
        className="w-10 h-10 sm:w-14 sm:h-14 text-[var(--green-lt)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "test",
    label: "Test",
    subtitle: "Validate",
    icon: (
      <svg
        className="w-10 h-10 sm:w-14 sm:h-14 text-[var(--green-lt)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    id: "launch",
    label: "Launch",
    subtitle: "Scale",
    icon: (
      <svg
        className="w-10 h-10 sm:w-14 sm:h-14 text-[var(--green-lt)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.24a6 6 0 00-4.72 4.72m4.72-4.72L3 21l3.75-3.75"
        />
      </svg>
    ),
  },
];

export default function WindyProcessFlow() {
  return (
    <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-12 select-none overflow-visible">
      {/* Single Tangly, windy, non-linear dotted SVG line connecting the 4 icons */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <svg
          className="w-full h-72 sm:h-96 overflow-visible"
          viewBox="0 0 1000 240"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="windyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4caf62" stopOpacity="0.4" />
              <stop offset="33%" stopColor="#22c55e" stopOpacity="0.85" />
              <stop offset="66%" stopColor="#10b981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4caf62" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Single tangly, windy, non-linear dotted connecting line */}
          <path
            d="M 120 120 C 180 20, 230 220, 290 50 C 325 -20, 345 200, 370 120 C 430 230, 490 20, 545 190 C 580 250, 605 30, 630 120 C 690 20, 750 220, 805 50 C 840 -20, 860 200, 880 120"
            fill="none"
            stroke="url(#windyGradient)"
            strokeWidth="4"
            strokeDasharray="8 12"
            strokeLinecap="round"
            className="animate-[dash_30s_linear_infinite]"
          />
        </svg>
      </div>

      {/* 4 Large Round Circular Icons spread horizontally */}
      <div className="relative z-10 grid grid-cols-4 gap-4 items-center justify-items-center">
        {processSteps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center cursor-default"
          >
            {/* Round Circular Icon */}
            <div className="relative">
              {/* Outer Glow ring */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[var(--green-lt)]/30 to-emerald-500/20 blur-md" />

              {/* Large Circular Badge */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-2 border-[var(--border-g)] bg-[#020a06]/85 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(30,107,46,0.2)]">
                {step.icon}
              </div>
            </div>

            {/* Labels */}
            <div className="mt-4 text-center">
              <div className="font-['Bebas_Neue',sans-serif] text-2xl sm:text-3xl md:text-4xl tracking-widest text-white leading-tight">
                {step.label}
              </div>
              <div className="font-mono text-xs sm:text-sm tracking-[0.22em] uppercase text-white/50">
                {step.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
