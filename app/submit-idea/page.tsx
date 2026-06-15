"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";

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
  name: string;
  email: string;
  phone: string;
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
      <div className="mb-8">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="33" stroke="rgba(76,175,98,0.3)" strokeWidth="1.5" className="success-circle" />
          <path d="M22 36l10 10 18-18" stroke="#4caf62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="success-check" />
        </svg>
      </div>

      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-4 opacity-70">
        Idea Received
      </p>
      <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(40px,6vw,72px)] leading-[0.95] text-white mb-5">
        We Got It, <span className="text-[var(--green-lt)]">{name.split(" ")[0]}.</span>
      </h2>
      <p className="text-[15px] text-white/45 font-light leading-[1.85] max-w-[460px] mb-12">
        Your idea is in our hands. A member of the E-Cell core team will reach out within 3–5 business days.
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-[680px] max-sm:grid-cols-1 mb-10">
        {[
          { n: "01", title: "Review", desc: "We read every submission personally." },
          { n: "02", title: "Connect", desc: "A team lead reaches out to schedule a call." },
          { n: "03", title: "Support", desc: "You get matched with mentors, resources, and a plan." },
        ].map((step) => (
          <div key={step.n} className="classic-form-box !p-6 text-left !my-0">
            <span className="font-['Bebas_Neue',sans-serif] text-[28px] text-[var(--green-lt)] opacity-50 block mb-2 leading-none">
              {step.n}
            </span>
            <h4 className="text-[14px] font-medium text-white mb-1.5">{step.title}</h4>
            <p className="text-[12px] text-white/35 font-light leading-[1.6]">{step.desc}</p>
          </div>
        ))}
      </div>

      <Button href="/" variant="ghost" className="min-w-0 px-0 text-white/30 hover:text-white border-none">
        ← Back to Home
      </Button>
    </div>
  );
}

// ─── MODULAR FORM COMPONENTS ───

function Step1({ formData, update, onNext, canProceed }: any) {
  return (
    <div className="space-y-2 animate-scale-in">
      <h2 className="font-['Bebas_Neue',sans-serif] text-[32px] text-white tracking-[0.02em] mb-8 leading-none">
        Personal Details
      </h2>
      
      <div className="form-field-group">
        <label>Full Name *</label>
        <input
          type="text"
          placeholder="Aryan Mehta"
          className="form-input"
          value={formData.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>

      <div className="form-field-group">
        <label>Email Address *</label>
        <input
          type="email"
          placeholder="aryan@woxsen.edu.in"
          className="form-input"
          value={formData.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>

      <div className="form-field-group">
        <label>Phone Number <span className="text-white/20 normal-case tracking-normal font-sans">(optional)</span></label>
        <input
          type="tel"
          placeholder="+91 98765 43210"
          className="form-input"
          value={formData.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>

      <div className="pt-6">
        <Button onClick={onNext} disabled={!canProceed} variant="primary" className="min-w-0 w-full justify-center rounded-[4px] py-4">
          Next: Your Idea →
        </Button>
      </div>
    </div>
  );
}

function Step2({ formData, update, onNext, onPrev, canProceed }: any) {
  return (
    <div className="space-y-2 animate-scale-in">
      <h2 className="font-['Bebas_Neue',sans-serif] text-[32px] text-white tracking-[0.02em] mb-8 leading-none">
        Idea Details
      </h2>

      <div className="form-field-group">
        <label>Idea / Venture Name *</label>
        <input
          type="text"
          placeholder="e.g. SkillStack, GreenRoot..."
          className="form-input"
          value={formData.ideaTitle}
          onChange={(e) => update("ideaTitle", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 mb-6">
        <div className="form-field-group !mb-0">
          <label>Domain *</label>
          <select className="form-input" value={formData.domain} onChange={(e) => update("domain", e.target.value)}>
            <option value="">Select domain</option>
            {domains.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
        <div className="form-field-group !mb-0">
          <label>Team Size</label>
          <select className="form-input" value={formData.teamSize} onChange={(e) => update("teamSize", e.target.value)}>
            <option value="">Just me (solo)</option>
            <option value="2">2 people</option>
            <option value="3-4">3–4 people</option>
            <option value="5+">5+ people</option>
          </select>
        </div>
      </div>

      <div className="form-field-group">
        <label>Current Stage *</label>
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          {stages.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => update("stage", s.value)}
              className={`text-left px-4 py-3 rounded-[4px] border transition-all duration-200 cursor-pointer ${
                formData.stage === s.value
                  ? "border-[var(--green-lt)] bg-[rgba(76,175,98,0.08)]"
                  : "border-white/[0.08] bg-white/[0.01] hover:border-white/20"
              }`}
            >
              <p className={`text-[13px] font-medium mb-1 ${formData.stage === s.value ? "text-[var(--green-lt)]" : "text-white/80"}`}>
                {s.label}
              </p>
              <p className="text-[11px] text-white/40 font-light">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="form-field-group">
        <label>Describe Your Idea * <span className="text-white/20 normal-case tracking-normal font-sans">(min 30 chars)</span></label>
        <textarea
          placeholder="What problem are you solving? Who's the customer? What's the insight?"
          className="form-input h-32 resize-none"
          value={formData.description}
          onChange={(e) => update("description", e.target.value)}
        />
        <p className={`mt-2 font-mono text-[10px] tracking-wide ${formData.description.length >= 30 ? "text-[var(--green-lt)]/80" : "text-white/30"}`}>
          {formData.description.length} / 30+ chars
        </p>
      </div>

      <div className="form-field-group">
        <label>Website / Deck Link <span className="text-white/20 normal-case tracking-normal font-sans">(optional)</span></label>
        <input
          type="url"
          placeholder="https://..."
          className="form-input"
          value={formData.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button onClick={onPrev} variant="ghost" className="min-w-0 px-6 border border-white/[0.1] rounded-[4px]">
          ← Back
        </Button>
        <Button onClick={onNext} disabled={!canProceed} variant="primary" className="min-w-0 flex-1 justify-center rounded-[4px] py-4">
          Review →
        </Button>
      </div>
    </div>
  );
}

function Step3({ formData, onPrev, onSubmit, submitting, error }: any) {
  return (
    <div className="animate-scale-in">
      <h2 className="font-['Bebas_Neue',sans-serif] text-[32px] text-white tracking-[0.02em] mb-8 leading-none">
        Review & Submit
      </h2>

      <div className="classic-form-box !p-6 mb-8 bg-black/20 !mt-0">
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
          <div key={item.label} className="flex gap-4 py-3.5 border-b border-white/[0.04] last:border-b-0">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/40 w-24 shrink-0 pt-0.5">
              {item.label}
            </span>
            <span className="text-[13px] text-white/70 font-light leading-[1.6]">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <p className="mb-6 text-red-400/80 font-mono text-[11px] tracking-[0.12em] uppercase bg-red-400/10 p-3 rounded-[4px] border border-red-400/20">
          {error}
        </p>
      )}

      <div className="flex gap-4">
        <Button onClick={onPrev} variant="ghost" className="min-w-0 px-6 border border-white/[0.1] rounded-[4px]">
          ← Edit
        </Button>
        <Button onClick={onSubmit} disabled={submitting} variant="primary" className="min-w-0 flex-1 justify-center rounded-[4px] py-4">
          {submitting ? "Submitting..." : "Submit My Idea →"}
        </Button>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───

export default function SubmitIdeaPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", ideaTitle: "", domain: "", stage: "", teamSize: "", description: "", website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitIdea = useMutation(api.ideas.submitIdea);

  const update = (field: keyof FormData, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  const canProceedStep1 = formData.name.trim() && formData.email.trim() && formData.email.includes("@");
  const canProceedStep2 = formData.ideaTitle.trim() && formData.domain && formData.stage && formData.description.trim().length >= 30;

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
      <div className="min-h-screen bg-[#020817] px-8 flex items-center justify-center pt-20 pb-12">
        <div className="section-container">
          <SuccessScreen name={formData.name} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] mesh-bg-submit pt-36 pb-24 px-8 flex items-center">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,107,46,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(30,107,46,0.035)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-[1fr_500px] gap-20 items-center max-lg:grid-cols-1 max-lg:gap-16">
          
          {/* Left: Hero Text */}
          <div className="sticky top-32">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-6 flex items-center gap-3.5 opacity-80 animate-fade-up">
              <span className="w-8 h-px bg-[var(--green-lt)] opacity-50" />
              Submit Your Idea
            </p>

            <h1 className="font-['Bebas_Neue',sans-serif] text-[clamp(64px,7vw,110px)] leading-[0.9] tracking-[-0.02em] text-white mb-8 animate-fade-up delay-1">
              Got an Idea?
              <br />
              <span className="text-[var(--green-lt)]">We'll Back It.</span>
            </h1>

            <p className="max-w-[480px] text-[16px] leading-[1.9] text-white/50 font-light animate-fade-up delay-2 mb-10">
              Whether it's a napkin sketch or a working MVP — if you've got the grit, E-Cell has the network, mentors, and micro-grants to get you off the ground.
            </p>
          </div>

          {/* Right: Form */}
          <RevealOnScroll delay={1}>
            <div className="classic-form-box backdrop-blur-md">
              {/* Step indicator */}
              <div className="flex items-center mb-10 border-b border-white/[0.06] pb-8">
                <div className="step-indicator gap-0 flex items-center">
                  {[1, 2, 3].map((s, i) => (
                    <div key={s} className="flex items-center">
                      <div className={`step-dot !w-8 !h-8 !text-[10px] ${step === s ? "active" : step > s ? "done" : "border-white/10 text-white/20"}`}>
                        {step > s ? (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          s
                        )}
                      </div>
                      {i < 2 && <div className={`step-line !w-12 mx-2 ${step > s ? "done bg-[var(--green-lt)]" : "bg-white/[0.05]"}`} />}
                    </div>
                  ))}
                </div>
              </div>

              {step === 1 && <Step1 formData={formData} update={update} onNext={() => setStep(2)} canProceed={canProceedStep1} />}
              {step === 2 && <Step2 formData={formData} update={update} onNext={() => setStep(3)} onPrev={() => setStep(1)} canProceed={canProceedStep2} />}
              {step === 3 && <Step3 formData={formData} onPrev={() => setStep(2)} onSubmit={handleSubmit} submitting={submitting} error={error} />}
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </div>
  );
}

