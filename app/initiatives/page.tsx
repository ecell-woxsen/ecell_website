"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { initiativesDetails, InitiativeDetail } from "@/data/initiatives";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";

// SVG Icons for each initiative
function getIconForInitiative(id: string, className: string = "w-6 h-6") {
  switch (id) {
    case "launchpad":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.4m5.96 5.97a14.96 14.96 0 01-12.12 6.16 14.96 14.96 0 016.16-12.12m5.96 5.97L9.63 8.4" />
        </svg>
      );
    case "founder-lab":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case "speaker-circuit":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      );
    case "community-fund":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
}

// A dynamic gradient mesh background helper based on selected initiative
function getBackgroundGradient(id: string) {
  switch (id) {
    case "launchpad":
      return "radial-gradient(ellipse 55% 55% at 50% 30%, rgba(30, 107, 46, 0.16) 0%, transparent 60%), radial-gradient(ellipse 35% 45% at 90% 80%, rgba(26, 47, 94, 0.22) 0%, transparent 50%), #020817";
    case "founder-lab":
      return "radial-gradient(ellipse 55% 55% at 50% 30%, rgba(6, 182, 212, 0.14) 0%, transparent 60%), radial-gradient(ellipse 35% 45% at 90% 80%, rgba(26, 47, 94, 0.25) 0%, transparent 50%), #020817";
    case "speaker-circuit":
      return "radial-gradient(ellipse 55% 55% at 50% 30%, rgba(99, 102, 241, 0.14) 0%, transparent 60%), radial-gradient(ellipse 35% 45% at 90% 80%, rgba(76, 175, 98, 0.15) 0%, transparent 50%), #020817";
    case "community-fund":
      return "radial-gradient(ellipse 55% 55% at 50% 30%, rgba(16, 185, 129, 0.14) 0%, transparent 60%), radial-gradient(ellipse 35% 45% at 90% 80%, rgba(26, 47, 94, 0.22) 0%, transparent 50%), #020817";
    default:
      return "#020817";
  }
}

// Dynamic accent color text utility based on active tab
function getAccentColorClass(id: string) {
  switch (id) {
    case "launchpad":
      return "text-[var(--green-lt)] border-[var(--green-lt)]/25";
    case "founder-lab":
      return "text-cyan-400 border-cyan-400/25";
    case "speaker-circuit":
      return "text-indigo-400 border-indigo-400/25";
    case "community-fund":
      return "text-emerald-400 border-emerald-400/25";
    default:
      return "text-[var(--green-lt)]";
  }
}

// Dynamic border highlight utility
function getAccentBorderClass(id: string) {
  switch (id) {
    case "launchpad":
      return "hover:border-[var(--green-lt)]/35 focus-within:border-[var(--green-lt)]/40";
    case "founder-lab":
      return "hover:border-cyan-400/35 focus-within:border-cyan-400/40";
    case "speaker-circuit":
      return "hover:border-indigo-400/35 focus-within:border-indigo-400/40";
    case "community-fund":
      return "hover:border-emerald-400/35 focus-within:border-emerald-400/40";
    default:
      return "hover:border-[var(--green-lt)]/35";
  }
}

// Dynamic active tab color override utility
function getActiveTabColorClass(id: string, activeId: string) {
  if (id !== activeId) return "";
  switch (id) {
    case "launchpad":
      return "!bg-[var(--green)] !border-[var(--green)] hover:!bg-[var(--green-mid)] shadow-[0_0_15px_rgba(76,175,98,0.2)]";
    case "founder-lab":
      return "!bg-cyan-600 !border-cyan-600 hover:!bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]";
    case "speaker-circuit":
      return "!bg-indigo-600 !border-indigo-600 hover:!bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]";
    case "community-fund":
      return "!bg-emerald-600 !border-emerald-600 hover:!bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
    default:
      return "";
  }
}

function InitiativesPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("launchpad");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Read search parameter on mount / change
  useEffect(() => {
    const activeParam = searchParams.get("active");
    if (activeParam && initiativesDetails.some((init) => init.id === activeParam)) {
      setActiveTab(activeParam);
    }
  }, [searchParams]);

  // Update active tab and URL parameters smoothly
  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setOpenFaqIndex(null); // Reset FAQ state on switch
    const newUrl = `${window.location.pathname}?active=${id}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const selectedInitiative =
    initiativesDetails.find((init) => init.id === activeTab) || initiativesDetails[0];

  const accentColor = getAccentColorClass(selectedInitiative.id);
  const accentBorder = getAccentBorderClass(selectedInitiative.id);

  return (
    <div style={{ transition: "background 0.5s ease" }}>
      {/* Dynamic Mesh Background Overlay */}
      <style jsx global>{`
        .initiatives-dynamic-bg {
          background: ${getBackgroundGradient(selectedInitiative.id)};
          transition: background 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* ── PAGE HERO ── */}
      <div className="page-hero initiatives-dynamic-bg pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,47,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(26,47,94,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="animate-fade-up delay-1">
            <p className={`font-mono text-[11px] tracking-[0.3em] uppercase mb-5 flex items-center gap-3.5 opacity-80 ${accentColor}`}>
              <span className="w-7 h-px bg-current opacity-50" />
              E-Cell Ecosystem
            </p>
          </div>

          <div className="flex justify-between items-end gap-12 max-lg:flex-col max-lg:items-start max-lg:gap-8">
            <div className="max-w-[700px]">
              <h1 className="font-['Bebas_Neue',sans-serif] text-[clamp(54px,8vw,120px)] leading-[0.88] tracking-[-0.02em] text-white mb-7 animate-fade-up delay-2">
                Core<br />
                <span className={accentColor}>Initiatives.</span>
              </h1>

              <p className="text-[16px] leading-[1.85] text-white/45 font-light animate-fade-up delay-3">
                Four critical pillars engineered to support student founders at Woxsen University — offering validation, resources, networks, and non-dilutive capital to transform ideas into scaling ventures.
              </p>
            </div>

            {/* Premium floating active stat widget */}
            <div className="animate-scale-in delay-3 max-lg:w-full max-w-[380px] w-full">
              <div className="glass-card card-pad border border-white/[0.06] rounded-2xl relative overflow-hidden backdrop-blur-xl">
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/30 mb-2">Active Focus</p>
                <h3 className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[0.02em] text-white mb-4">
                  {selectedInitiative.title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedInitiative.stats.slice(0, 2).map((st) => (
                    <div key={st.label}>
                      <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/35">{st.label}</p>
                      <p className={`text-[16px] font-semibold mt-1 ${accentColor}`}>{st.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />
      </div>

      {/* ── INTERACTIVE TAB SELECTOR ── */}
      <section className="bg-[#020817] py-6 border-b border-white/[0.04] sticky top-[68px] z-50 backdrop-blur-md bg-[#020817]/80">
        <div className="section-container px-4 sm:px-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center max-w-full">
            {initiativesDetails.map((init) => (
              <Button
                key={init.id}
                onClick={() => handleTabChange(init.id)}
                variant={selectedInitiative.id === init.id ? "primary" : "ghost"}
                className={getActiveTabColorClass(init.id, selectedInitiative.id)}
              >
                {init.title}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* ── INITIATIVE CONTENT DETAIL GRID ── */}
      <section className="section-base bg-[#020817] text-white pt-16">
        <div className="section-container">
          <div className="grid grid-cols-12 gap-12 max-xl:gap-8 max-lg:grid-cols-1">
            
            {/* LEFT COLUMN: Overview, Pillars/Features, Timeline */}
            <div className="col-span-7 max-lg:col-span-1 space-y-16">
              
              {/* Program Overview */}
              <RevealOnScroll>
                <div>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-[40px] tracking-[0.02em] text-white mb-6">
                    About The Initiative
                  </h2>
                  <p className="text-[15px] leading-[1.85] text-white/50 font-light">
                    {selectedInitiative.overview}
                  </p>
                </div>
              </RevealOnScroll>

              {/* Pillars grid */}
              <RevealOnScroll>
                <div>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-[32px] tracking-[0.02em] text-white mb-8">
                    Core Pillars
                  </h2>
                  <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                    {selectedInitiative.features.map((feat, i) => (
                      <div
                        key={i}
                        className={`card-pad bg-white/[0.01] border border-white/[0.04] rounded-2xl transition-all duration-300 hover:-translate-y-1 ${accentBorder}`}
                      >
                        <h3 className="font-semibold text-[15px] text-white/90 mb-3.5 flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full bg-current ${accentColor}`} />
                          {feat.title}
                        </h3>
                        <p className="text-[12px] leading-[1.65] text-white/40 font-light">
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Stepper Timeline */}
              <RevealOnScroll>
                <div>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-[32px] tracking-[0.02em] text-white mb-8">
                    Operational Phases
                  </h2>
                  <div className="relative pl-8 border-l border-white/[0.06] ml-4 space-y-10 py-2">
                    {selectedInitiative.timeline.map((step, i) => (
                      <div key={i} className="relative group">
                        {/* Bullet node */}
                        <span className={`absolute -left-[41px] top-1.5 w-6.5 h-6.5 rounded-full border border-white/10 flex items-center justify-center bg-[#020817] font-mono text-[9px] font-bold z-10 transition-colors duration-300 ${accentColor}`}>
                          {i + 1}
                        </span>

                        <p className={`font-mono text-[9px] tracking-[0.16em] uppercase mb-1.5 ${accentColor}`}>
                          {step.phase}
                        </p>
                        <h4 className="text-[16px] font-semibold text-white/95 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-[13px] leading-[1.7] text-white/40 font-light">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* RIGHT COLUMN: Stats, Eligibility, FAQs, CTA */}
            <div className="col-span-5 max-lg:col-span-1 space-y-8">
              
              {/* Program Statistics Card */}
              <RevealOnScroll>
                <div className="card-pad bg-white/[0.015] border border-white/[0.05] rounded-2xl relative overflow-hidden backdrop-blur-md">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.015] rounded-full blur-xl ${accentColor}`} />
                  <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/30 mb-6 border-b border-white/[0.06] pb-3">
                    Initiative Details
                  </h3>
                  <div className="space-y-5">
                    {selectedInitiative.stats.map((stat, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/[0.03] pb-2 last:border-b-0">
                        <span className="text-white/45 text-[13px] font-light">{stat.label}</span>
                        <span className="font-medium text-white/90 text-[14px]">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Eligibility Criteria */}
              {selectedInitiative.eligibility.length > 0 && (
                <RevealOnScroll>
                  <div className="card-pad bg-white/[0.015] border border-white/[0.05] rounded-2xl backdrop-blur-md">
                    <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/30 mb-5">
                      Eligibility Requirements
                    </h3>
                    <ul className="space-y-4">
                      {selectedInitiative.eligibility.map((el, i) => (
                        <li key={i} className="flex items-start gap-3 text-[13px] leading-[1.6] text-white/50 font-light">
                          <svg className={`w-4 h-4 mt-0.5 shrink-0 ${accentColor}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span>{el}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              )}

              {/* Accordion FAQ section */}
              {selectedInitiative.faqs.length > 0 && (
                <RevealOnScroll>
                  <div className="card-pad bg-white/[0.015] border border-white/[0.05] rounded-2xl backdrop-blur-md">
                    <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/30 mb-6">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                      {selectedInitiative.faqs.map((faq, idx) => {
                        const isOpen = openFaqIndex === idx;
                        return (
                          <div key={idx} className="border-b border-white/[0.04] pb-3.5 last:border-0 last:pb-0">
                            <button
                              onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                              className="w-full flex justify-between items-center text-left py-1 text-white/80 hover:text-white transition-colors duration-200 group cursor-pointer"
                            >
                              <span className="text-[13px] font-medium leading-snug pr-4">
                                {faq.question}
                              </span>
                              <span className={`text-[15px] shrink-0 font-light transition-transform duration-300 ${isOpen ? "rotate-45" : ""} ${accentColor}`}>
                                ＋
                              </span>
                            </button>
                            {isOpen && (
                              <div className="mt-2 text-[12px] leading-[1.7] text-white/40 font-light animate-fade-in">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </RevealOnScroll>
              )}

              {/* Dynamic Action CTA Box */}
              <RevealOnScroll>
                <div className={`card-pad border rounded-2xl relative overflow-hidden backdrop-blur-md text-center bg-white/[0.01] ${accentBorder}`}>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35 mb-3">Ready to participate?</p>
                  <h3 className="font-['Bebas_Neue',sans-serif] text-[32px] tracking-[0.02em] text-white mb-6">
                    {selectedInitiative.title}
                  </h3>
                  <Button
                    href={selectedInitiative.ctaHref}
                    variant={selectedInitiative.id === "founder-lab" ? "outline" : "primary"}
                    className="w-full py-4 text-[11px] tracking-[0.14em]"
                  >
                    {selectedInitiative.ctaText} →
                  </Button>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ── BACK TO HOME BANNER ── */}
      <section className="section-base bg-[#020817] border-t border-white/[0.03] py-20 text-center">
        <div className="section-container">
          <RevealOnScroll>
            <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(36px,5vw,60px)] leading-[0.95] text-white mb-6">
              Need Help With Another Stage?
            </h2>
            <p className="text-[14px] text-white/40 font-light leading-[1.85] mb-8 max-w-[480px] mx-auto">
              Our initiatives span validation to venture funding. Browse other programs or contact E-Cell directly to get custom resources.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button href="/" variant="outline">
                ← Go to Home
              </Button>
              <Button href="/#contact" variant="ghost">
                Contact E-Cell
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}

export default function InitiativesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#020817] flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--green-lt)]" />
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35 mt-4">
            Loading Initiatives...
          </p>
        </div>
      }
    >
      <InitiativesPageContent />
    </Suspense>
  );
}
