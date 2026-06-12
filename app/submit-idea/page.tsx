"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

type Stage = "idea" | "prototype" | "mvp" | "revenue";
type Domain =
  | "edtech"
  | "fintech"
  | "healthtech"
  | "agritech"
  | "d2c"
  | "saas"
  | "deeptech"
  | "social"
  | "other";

interface FormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  // Step 2
  ideaTitle: string;
  domain: Domain | "";
  stage: Stage | "";
  teamSize: string;
  description: string;
  website: string;
}

const domains: { value: Domain; label: string }[] = [
  { value: "edtech", label: "EdTech" },
  { value: "fintech", label: "FinTech" },
  { value: "healthtech", label: "HealthTech" },
  { value: "agritech", label: "AgriTech" },
  { value: "d2c", label: "D2C / E-Commerce" },
  { value: "saas", label: "SaaS / B2B" },
  { value: "deeptech", label: "Deep Tech / AI" },
  { value: "social", label: "Social Impact" },
  { value: "other", label: "Other" },
];

const stages: { value: Stage; label: string; desc: string }[] = [
  { value: "idea", label: "Idea Stage", desc: "I have a concept, no product yet" },
  { value: "prototype", label: "Prototype", desc: "I have something to show" },
  { value: "mvp", label: "MVP", desc: "People are using it" },
  { value: "revenue", label: "Revenue", desc: "We're generating income" },
];

function SuccessScreen({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-up">
      {/* Animated checkmark */}
      <div className="mb-8">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle
            cx="36"
            cy="36"
            r="33"
            stroke="rgba(76,175,98,0.3)"
            strokeWidth="1.5"
            className="success-circle"
          />
          <path
            d="M22 36l10 10 18-18"
            stroke="#4caf62"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="success-check"
          />
        </svg>
      </div>

      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-4 opacity-70">
        Idea Received
      </p>
      <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(40px,6vw,72px)] leading-[0.95] text-white mb-5">
        We Got It,{" "}
        <span className="text-[var(--green-lt)]">{name.split(" ")[0]}.</span>
      </h2>
      <p className="text-[15px] text-white/45 font-light leading-[1.85] max-w-[460px] mb-12">
        Your idea is in our hands. A member of the E-Cell core team will reach out within 3–5 business days.
      </p>

      {/* What happens next */}
      <div className="grid grid-cols-3 gap-4 max-w-[680px] max-sm:grid-cols-1">
        {[
          { n: "01", title: "Review", desc: "We read every submission personally." },
          { n: "02", title: "Connect", desc: "A team lead reaches out to schedule a call." },
          { n: "03", title: "Support", desc: "You get matched with mentors, resources, and a plan." },
        ].map((step) => (
          <div
            key={step.n}
            className="card-pad bg-white/[0.02] border border-white/[0.05] rounded-xl text-left"
          >
            <span className="font-['Bebas_Neue',sans-serif] text-[28px] text-[var(--green-lt)] opacity-50 block mb-2 leading-none">
              {step.n}
            </span>
            <h4 className="text-[14px] font-medium text-white mb-1.5">{step.title}</h4>
            <p className="text-[12px] text-white/35 font-light leading-[1.6]">{step.desc}</p>
          </div>
        ))}
      </div>

      <a
        href="/"
        className="mt-12 font-mono text-[10px] tracking-[0.16em] uppercase text-white/30 hover:text-white transition-colors duration-200 no-underline"
      >
        ← Back to Home
      </a>
    </div>
  );
}

export default function SubmitIdeaPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    ideaTitle: "",
    domain: "",
    stage: "",
    teamSize: "",
    description: "",
    website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitIdea = useMutation(api.ideas.submitIdea);

  const update = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const canProceedStep1 =
    formData.name.trim() && formData.email.trim() && formData.email.includes("@");

  const canProceedStep2 =
    formData.ideaTitle.trim() &&
    formData.domain &&
    formData.stage &&
    formData.description.trim().length >= 30;

  const handleSubmit = async () => {
    if (!canProceedStep2) return;
    setSubmitting(true);
    setError("");
    try {
      await submitIdea({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        ideaTitle: formData.ideaTitle.trim(),
        domain: formData.domain,
        stage: formData.stage,
        description: formData.description.trim(),
        teamSize: formData.teamSize || undefined,
        website: formData.website.trim() || undefined,
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#020817] pt-28 pb-20 px-8">
        <div className="section-container">
          <SuccessScreen name={formData.name} />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── PAGE HERO ── */}
      <div className="page-hero mesh-bg-submit">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,107,46,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(30,107,46,0.035)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="section-container relative z-10">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-5 flex items-center gap-3.5 opacity-80 animate-fade-up delay-1">
            <span className="w-7 h-px bg-[var(--green-lt)] opacity-50" />
            Submit Your Idea
          </p>

          <h1 className="font-['Bebas_Neue',sans-serif] text-[clamp(58px,8vw,128px)] leading-[0.88] tracking-[-0.02em] text-white mb-7 animate-fade-up delay-2">
            Got an Idea?
            <br />
            <span className="text-[var(--green-lt)]">We&apos;ll Back It.</span>
          </h1>

          <p className="max-w-[500px] text-[15px] leading-[1.9] text-white/45 font-light animate-fade-up delay-3">
            Whether it&apos;s a napkin sketch or a working MVP — if you&apos;ve got the grit, E-Cell has the network, mentors, and micro-grants to get you off the ground.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />
      </div>

      {/* ── FORM ── */}
      <section className="section-base bg-[#020817]">
        <div className="section-container">
          <div className="grid grid-cols-[1fr_420px] gap-16 items-start max-lg:grid-cols-1 max-lg:gap-12">
            {/* Left: Form */}
            <div>
              {/* Step indicator */}
              <div className="flex items-center mb-12">
                <div className="step-indicator gap-0 flex items-center">
                  {[1, 2, 3].map((s, i) => (
                    <div key={s} className="flex items-center">
                      <div
                        className={`step-dot ${
                          step === s ? "active" : step > s ? "done" : ""
                        }`}
                      >
                        {step > s ? (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          s
                        )}
                      </div>
                      {i < 2 && <div className={`step-line ${step > s ? "done" : ""}`} />}
                    </div>
                  ))}
                </div>
                <div className="ml-6">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--green-lt)] opacity-70">
                    Step {step} of 3
                  </p>
                  <p className="text-[14px] text-white/60 font-light">
                    {step === 1 && "About You"}
                    {step === 2 && "Your Idea"}
                    {step === 3 && "Review & Submit"}
                  </p>
                </div>
              </div>

              {/* ─── STEP 1 ─── */}
              {step === 1 && (
                <div className="space-y-4 animate-scale-in">
                  <h2 className="font-['Bebas_Neue',sans-serif] text-[36px] text-white tracking-[0.02em] mb-8 leading-none">
                    First, tell us about yourself.
                  </h2>

                  <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                    <div>
                      <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Aryan Mehta"
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => update("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="aryan@woxsen.edu.in"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 mb-2">
                      Phone Number{" "}
                      <span className="text-white/20 normal-case tracking-normal font-sans">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep1}
                      className="bg-[var(--green)] hover:bg-[var(--green-mid)] disabled:opacity-30 disabled:cursor-not-allowed text-white px-8 py-3.5 font-mono text-[11px] tracking-[0.12em] uppercase border-none rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                      Next: Your Idea →
                    </button>
                  </div>
                </div>
              )}

              {/* ─── STEP 2 ─── */}
              {step === 2 && (
                <div className="space-y-5 animate-scale-in">
                  <h2 className="font-['Bebas_Neue',sans-serif] text-[36px] text-white tracking-[0.02em] mb-8 leading-none">
                    Tell us about the idea.
                  </h2>

                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 mb-2">
                      Idea / Venture Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SkillStack, GreenRoot..."
                      className="form-input"
                      value={formData.ideaTitle}
                      onChange={(e) => update("ideaTitle", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                    <div>
                      <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 mb-2">
                        Domain *
                      </label>
                      <select
                        className="form-input"
                        value={formData.domain}
                        onChange={(e) => update("domain", e.target.value)}
                      >
                        <option value="">Select domain</option>
                        {domains.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 mb-2">
                        Team Size
                      </label>
                      <select
                        className="form-input"
                        value={formData.teamSize}
                        onChange={(e) => update("teamSize", e.target.value)}
                      >
                        <option value="">Just me (solo)</option>
                        <option value="2">2 people</option>
                        <option value="3-4">3–4 people</option>
                        <option value="5+">5+ people</option>
                      </select>
                    </div>
                  </div>

                  {/* Stage selector */}
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 mb-3">
                      Current Stage *
                    </label>
                    <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
                      {stages.map((s) => (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => update("stage", s.value)}
                          className={`text-left px-4 py-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                            formData.stage === s.value
                              ? "border-[var(--green-lt)] bg-[rgba(76,175,98,0.08)] "
                              : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"
                          }`}
                          id={`stage-${s.value}`}
                        >
                          <p className={`text-[13px] font-medium mb-0.5 ${formData.stage === s.value ? "text-[var(--green-lt)]" : "text-white/70"}`}>
                            {s.label}
                          </p>
                          <p className="text-[11px] text-white/30 font-light">{s.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 mb-2">
                      Describe Your Idea *{" "}
                      <span className="text-white/20 normal-case tracking-normal font-sans">(min 30 chars)</span>
                    </label>
                    <textarea
                      placeholder="What problem are you solving? Who's the customer? What's the insight? (Be concise — we love crisp thinking)"
                      className="form-input h-36 resize-none"
                      value={formData.description}
                      onChange={(e) => update("description", e.target.value)}
                    />
                    <p className={`mt-1.5 font-mono text-[9px] tracking-wide ${formData.description.length >= 30 ? "text-[var(--green-lt)]/60" : "text-white/20"}`}>
                      {formData.description.length} / 30+ chars
                    </p>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 mb-2">
                      Website / Deck Link{" "}
                      <span className="text-white/20 normal-case tracking-normal font-sans">(optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      className="form-input"
                      value={formData.website}
                      onChange={(e) => update("website", e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="text-white/40 hover:text-white px-5 py-3.5 font-mono text-[11px] tracking-[0.12em] uppercase border border-white/[0.08] hover:border-white/20 rounded-lg transition-all duration-200 cursor-pointer bg-transparent"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!canProceedStep2}
                      className="bg-[var(--green)] hover:bg-[var(--green-mid)] disabled:opacity-30 disabled:cursor-not-allowed text-white px-8 py-3.5 font-mono text-[11px] tracking-[0.12em] uppercase border-none rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                      Review →
                    </button>
                  </div>
                </div>
              )}

              {/* ─── STEP 3 ─── */}
              {step === 3 && (
                <div className="animate-scale-in">
                  <h2 className="font-['Bebas_Neue',sans-serif] text-[36px] text-white tracking-[0.02em] mb-8 leading-none">
                    Review & Submit.
                  </h2>

                  <div className="space-y-3 mb-8">
                    {[
                      { label: "Name", value: formData.name },
                      { label: "Email", value: formData.email },
                      { label: "Idea", value: formData.ideaTitle },
                      { label: "Domain", value: domains.find((d) => d.value === formData.domain)?.label ?? formData.domain },
                      { label: "Stage", value: stages.find((s) => s.value === formData.stage)?.label ?? formData.stage },
                      { label: "Description", value: formData.description },
                      ...(formData.phone ? [{ label: "Phone", value: formData.phone }] : []),
                      ...(formData.website ? [{ label: "Website", value: formData.website }] : []),
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex gap-4 py-3.5 border-b border-white/[0.04] last:border-b-0"
                      >
                        <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/30 w-20 shrink-0 pt-0.5">
                          {item.label}
                        </span>
                        <span className="text-[13px] text-white/65 font-light leading-[1.6]">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {error && (
                    <p className="mb-4 text-red-400/70 font-mono text-[10px] tracking-[0.12em] uppercase">
                      {error}
                    </p>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="text-white/40 hover:text-white px-5 py-3.5 font-mono text-[11px] tracking-[0.12em] uppercase border border-white/[0.08] hover:border-white/20 rounded-lg transition-all duration-200 cursor-pointer bg-transparent"
                    >
                      ← Edit
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="bg-[var(--green)] hover:bg-[var(--green-mid)] disabled:opacity-50 text-white px-9 py-3.5 font-mono text-[11px] tracking-[0.12em] uppercase border-none rounded-lg transition-colors duration-200 cursor-pointer"
                      id="submit-idea-button"
                    >
                      {submitting ? "Submitting..." : "Submit My Idea →"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Context */}
            <RevealOnScroll delay={2} className="max-lg:order-first">
              <div className="sticky top-28 space-y-4">
                {/* What we offer */}
                <div className="card-pad bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--green-lt)] mb-5 opacity-70">
                    What You Get
                  </p>
                  <div className="space-y-5">
                    {[
                      {
                        icon: "🎯",
                        title: "1:1 Mentorship",
                        desc: "Matched with a founder or operator who's been there.",
                      },
                      {
                        icon: "💰",
                        title: "Micro-Grants",
                        desc: "₹50K–2L in equity-free grants for qualifying ideas.",
                      },
                      {
                        icon: "🌐",
                        title: "Network Access",
                        desc: "Tap into our 40+ mentor network and VC connections.",
                      },
                      {
                        icon: "🛠",
                        title: "Resources & Tools",
                        desc: "Legal help, cloud credits, workspace access, and more.",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3.5">
                        <span className="text-xl shrink-0">{item.icon}</span>
                        <div>
                          <p className="text-[13px] font-medium text-white mb-1">{item.title}</p>
                          <p className="text-[12px] text-white/40 font-light leading-[1.6]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social proof */}
                <div className="card-pad bg-[rgba(30,107,46,0.05)] border border-[rgba(30,107,46,0.15)] rounded-2xl">
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--green-lt)] mb-4 opacity-70">
                    By the Numbers
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { v: "24+", l: "Startups Backed" },
                      { v: "₹18L+", l: "Grants Given" },
                      { v: "7", l: "Revenue-Positive" },
                      { v: "48h", l: "Response Time" },
                    ].map((s) => (
                      <div key={s.l}>
                        <div className="font-['Bebas_Neue',sans-serif] text-[28px] text-[var(--green-lt)] leading-none mb-1">
                          {s.v}
                        </div>
                        <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/30">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
