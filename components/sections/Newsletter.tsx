"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const subscribe = useMutation(api.newsletter.subscribeNewsletter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const result = await subscribe({ email: email.trim() });
      setStatus(result.alreadySubscribed ? "already" : "success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#020817] py-24" id="newsletter">
      {/* Gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(30,107,46,0.08),transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(76,175,98,0.3)] to-transparent" />

      <div className="section-container relative z-10">
        <RevealOnScroll>
          <div className="max-w-[640px] mx-auto text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-4 opacity-70">
              Stay in the Loop
            </p>
            <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(40px,6vw,72px)] leading-[0.95] text-white mb-4">
              Builder Updates,{" "}
              <span className="text-[var(--green-lt)]">Monthly.</span>
            </h2>
            <p className="text-[15px] text-white/40 font-light leading-[1.85] mb-10">
              Opportunities, event drops, founder spotlights, and resources — delivered once a month. No noise.
            </p>

            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 animate-fade-up">
                <div className="w-12 h-12 rounded-full bg-[rgba(76,175,98,0.12)] border border-[rgba(76,175,98,0.3)] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--green-lt)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[var(--green-lt)] font-mono text-[11px] tracking-[0.16em] uppercase">
                  You&apos;re in! Welcome to the builder loop.
                </p>
              </div>
            ) : status === "already" ? (
              <p className="text-white/50 font-mono text-[11px] tracking-[0.16em] uppercase">
                Already subscribed — you&apos;re good. 👌
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 max-sm:flex-col max-sm:items-stretch">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input flex-1 text-center max-sm:text-left"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[var(--green)] hover:bg-[var(--green-mid)] text-white px-7 py-3 font-mono text-[11px] tracking-[0.12em] uppercase border-none rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Subscribe →"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-3 text-red-400/70 font-mono text-[10px] tracking-[0.12em] uppercase">
                Something went wrong. Try again.
              </p>
            )}

            <p className="mt-4 text-white/20 font-mono text-[9px] tracking-[0.12em] uppercase">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
