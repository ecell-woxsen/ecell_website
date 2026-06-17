"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { EventItem } from "@/data/events";
import Button from "@/components/ui/Button";

// ── localStorage helpers ──

const PROFILE_KEY = "ecell_profile";

interface StoredProfile {
  email: string;
  name: string;
  phone: string;
  school: string;
  course: string;
  year: string;
}

function getStoredProfile(): StoredProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredProfile;
  } catch {
    return null;
  }
}

function setStoredProfile(profile: StoredProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // silently fail
  }
}

// ── Types ──

type ModalStep = "email" | "form" | "review" | "submitting" | "success" | "already-registered";

interface FormData {
  email: string;
  name: string;
  phone: string;
  school: string;
  course: string;
  year: string;
}

const emptyForm: FormData = { email: "", name: "", phone: "", school: "", course: "", year: "" };

// ── Validation helpers ──

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[+]?[\d\s()-]{7,15}$/.test(phone.trim());
}

// ── Main Modal Component ──

interface EventRegistrationModalProps {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventRegistrationModal({
  event,
  isOpen,
  onClose,
}: EventRegistrationModalProps) {
  const [step, setStep] = useState<ModalStep>("email");
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isReturning, setIsReturning] = useState(false);
  const [error, setError] = useState("");
  const [emailLookupDone, setEmailLookupDone] = useState(false);
  const [lookupEmail, setLookupEmail] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Convex hooks
  const profile = useQuery(
    api.registration.getProfileByEmail,
    lookupEmail ? { email: lookupEmail } : "skip"
  );
  const existingRegistration = useQuery(
    api.registration.checkRegistration,
    lookupEmail && event.id
      ? { email: lookupEmail, eventId: event.id }
      : "skip"
  );
  const registerMutation = useMutation(api.registration.registerForEvent);

  // Pre-fill email from localStorage on open
  useEffect(() => {
    if (isOpen) {
      const stored = getStoredProfile();
      if (stored?.email) {
        setFormData((prev) => ({ ...prev, email: stored.email }));
      }
      setStep("email");
      setError("");
      setEmailLookupDone(false);
      setLookupEmail("");
      setIsReturning(false);
    }
  }, [isOpen]);

  // Handle profile lookup result
  useEffect(() => {
    if (!emailLookupDone || lookupEmail === "") return;

    // Wait for query results
    if (profile === undefined || existingRegistration === undefined) return;

    // Already registered?
    if (existingRegistration !== null) {
      setStep("already-registered");
      return;
    }

    if (profile) {
      // Returning user — pre-fill from DB
      setFormData({
        email: profile.email,
        name: profile.name,
        phone: profile.phone,
        school: profile.school ?? "",
        course: profile.course ?? "",
        year: profile.year ?? "",
      });
      setIsReturning(true);
      setStep("review");
    } else {
      // New user — keep email, maybe pre-fill from localStorage
      const stored = getStoredProfile();
      if (stored && stored.email.toLowerCase() === lookupEmail.toLowerCase()) {
        setFormData({
          email: lookupEmail,
          name: stored.name || "",
          phone: stored.phone || "",
          school: stored.school || "",
          course: stored.course || "",
          year: stored.year || "",
        });
      } else {
        setFormData((prev) => ({ ...prev, email: lookupEmail }));
      }
      setIsReturning(false);
      setStep("form");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, existingRegistration, emailLookupDone, lookupEmail]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const update = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setError("");
    },
    []
  );

  // ── Step handlers ──

  const handleEmailContinue = () => {
    const email = formData.email.trim().toLowerCase();
    if (!email || !isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLookupEmail(email);
    setEmailLookupDone(true);
  };

  const handleFormContinue = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formData.phone.trim() || !isValidPhone(formData.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!formData.school.trim()) {
      setError("Please enter your school (e.g. SOT, SOB, SOAD).");
      return;
    }
    setError("");
    setStep("review");
  };

  const handleSubmit = async () => {
    setStep("submitting");
    setError("");
    try {
      const result = await registerMutation({
        email: formData.email.trim().toLowerCase(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        school: formData.school.trim(),
        course: formData.course.trim() || undefined,
        year: formData.year.trim() || undefined,
        eventId: event.id,
        eventTitle: event.title,
      });

      // Save to localStorage
      setStoredProfile({
        email: result.profile.email,
        name: result.profile.name,
        phone: result.profile.phone,
        school: result.profile.school,
        course: result.profile.course ?? "",
        year: result.profile.year ?? "",
      });

      setStep("success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      if (message.includes("already registered")) {
        setStep("already-registered");
      } else {
        setError(message);
        setStep("review");
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const resetAndClose = () => {
    setFormData(emptyForm);
    setStep("email");
    setError("");
    setEmailLookupDone(false);
    setLookupEmail("");
    setIsReturning(false);
    onClose();
  };

  if (!isOpen) return null;

  // Determine if the email lookup is in-progress (queries loading)
  const isLookingUp =
    emailLookupDone &&
    lookupEmail !== "" &&
    (profile === undefined || existingRegistration === undefined) &&
    step === "email";

  return (
    <div
      className="reg-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Register for ${event.title}`}
    >
      <div ref={modalRef} className="reg-modal-container">
        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="reg-modal-close"
          aria-label="Close registration"
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Event header */}
        <div className="reg-modal-header">
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[var(--green-lt)] mb-2 opacity-70">
            {event.tag} · {event.date}
          </p>
          <h3 className="font-['Bebas_Neue',sans-serif] text-[28px] sm:text-[34px] leading-[1] text-white tracking-[0.02em]">
            {event.title}
          </h3>
        </div>

        {/* Step indicator */}
        {step !== "success" && step !== "already-registered" && (
          <div className="flex items-center gap-0 mb-8">
            {(["email", "form", "review"] as const).map((s, i) => {
              const stepMap: Record<string, number> = { email: 0, form: 1, review: 2, submitting: 2 };
              const currentIdx = stepMap[step] ?? 0;
              const isDone = i < currentIdx;
              const isActive = i === currentIdx;

              return (
                <div key={s} className="flex items-center">
                  <div
                    className={`step-dot !w-7 !h-7 !text-[9px] ${
                      isDone ? "done" : isActive ? "active" : "border-white/10 text-white/20"
                    }`}
                  >
                    {isDone ? (
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < 2 && (
                    <div
                      className={`step-line !w-8 sm:!w-12 mx-1.5 ${
                        isDone ? "done bg-[var(--green-lt)]" : "bg-white/[0.05]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
            <span className="ml-auto font-mono text-[9px] tracking-[0.1em] uppercase text-white/25 hidden sm:block">
              {step === "email"
                ? "Email"
                : step === "form"
                ? "Details"
                : step === "submitting"
                ? "Registering..."
                : "Review"}
            </span>
          </div>
        )}

        {/* ── Email Step ── */}
        {(step === "email" || isLookingUp) && (
          <div className="animate-scale-in">
            <h4 className="font-['Bebas_Neue',sans-serif] text-[24px] text-white tracking-[0.02em] mb-2 leading-none">
              Get Started
            </h4>
            <p className="text-[13px] text-white/40 font-light leading-[1.7] mb-6">
              Enter your email to begin. Returning? We&apos;ll remember you.
            </p>

            <div className="form-field-group !mb-5">
              <label>Email Address *</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="form-input"
                value={formData.email}
                onChange={(e) => update("email", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEmailContinue();
                }}
                disabled={isLookingUp}
                autoFocus
                id="reg-email-input"
              />
            </div>

            {error && <ErrorMessage message={error} />}

            <Button
              onClick={handleEmailContinue}
              variant="primary"
              className="min-w-0 w-full justify-center rounded-[4px] py-4 !mt-2"
              disabled={isLookingUp || !formData.email.trim()}
              id="reg-email-continue"
            >
              {isLookingUp ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner /> Checking...
                </span>
              ) : (
                "Continue →"
              )}
            </Button>
          </div>
        )}

        {/* ── Full Form Step (new user) ── */}
        {step === "form" && (
          <div className="animate-scale-in">
            <h4 className="font-['Bebas_Neue',sans-serif] text-[24px] text-white tracking-[0.02em] mb-2 leading-none">
              Your Details
            </h4>
            <p className="text-[13px] text-white/40 font-light leading-[1.7] mb-6">
              First time here — we just need a few details.
            </p>

            <div className="form-field-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="Aryan Mehta"
                className="form-input"
                value={formData.name}
                onChange={(e) => update("name", e.target.value)}
                autoFocus
                id="reg-name-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 mb-1">
              <div className="form-field-group !mb-0">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  id="reg-phone-input"
                />
              </div>
              <div className="form-field-group !mb-0">
                <label>Batch <span className="text-white/20 normal-case tracking-normal font-sans">(e.g. 25-29)</span></label>
                <input
                  type="text"
                  placeholder="25-29"
                  className="form-input"
                  value={formData.year}
                  onChange={(e) => update("year", e.target.value)}
                  id="reg-year-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 mt-4 mb-1">
              <div className="form-field-group !mb-0">
                <label>School *</label>
                <input
                  type="text"
                  placeholder="SOT, SOB, SOAD..."
                  className="form-input"
                  value={formData.school}
                  onChange={(e) => update("school", e.target.value)}
                  id="reg-school-input"
                />
              </div>
              <div className="form-field-group !mb-0">
                <label>Course <span className="text-white/20 normal-case tracking-normal font-sans">(optional)</span></label>
                <input
                  type="text"
                  placeholder="CSE, MBA, AIML..."
                  className="form-input"
                  value={formData.course}
                  onChange={(e) => update("course", e.target.value)}
                  id="reg-course-input"
                />
              </div>
            </div>

            {error && <ErrorMessage message={error} />}

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  setStep("email");
                  setEmailLookupDone(false);
                  setLookupEmail("");
                  setError("");
                }}
                variant="ghost"
                className="min-w-0 px-5 border border-white/[0.1] rounded-[4px]"
              >
                ←
              </Button>
              <Button
                onClick={handleFormContinue}
                variant="primary"
                className="min-w-0 flex-1 justify-center rounded-[4px] py-4"
                id="reg-form-continue"
              >
                Review →
              </Button>
            </div>
          </div>
        )}

        {/* ── Review Step ── */}
        {(step === "review" || step === "submitting") && (
          <div className="animate-scale-in">
            <h4 className="font-['Bebas_Neue',sans-serif] text-[24px] text-white tracking-[0.02em] mb-2 leading-none">
              {isReturning ? "Welcome Back!" : "Review & Confirm"}
            </h4>
            <p className="text-[13px] text-white/40 font-light leading-[1.7] mb-6">
              {isReturning
                ? "Confirm your details below, or edit if anything's changed."
                : "Double-check everything looks good."}
            </p>

            <div className="reg-review-card">
              {[
                { label: "Name", value: formData.name },
                { label: "Email", value: formData.email },
                { label: "Phone", value: formData.phone },
                { label: "School", value: formData.school },
                ...(formData.course ? [{ label: "Course", value: formData.course }] : []),
                ...(formData.year ? [{ label: "Batch", value: formData.year }] : []),
              ].map((item) => (
                <div key={item.label} className="reg-review-row">
                  <span className="reg-review-label">{item.label}</span>
                  <span className="reg-review-value">{item.value}</span>
                </div>
              ))}
            </div>

            {error && <ErrorMessage message={error} />}

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  if (isReturning) {
                    // Go to form to edit
                    setIsReturning(false);
                    setStep("form");
                  } else {
                    setStep("form");
                  }
                  setError("");
                }}
                variant="ghost"
                className="min-w-0 px-5 border border-white/[0.1] rounded-[4px]"
              >
                ✎ Edit
              </Button>
              <Button
                onClick={handleSubmit}
                variant="primary"
                className="min-w-0 flex-1 justify-center rounded-[4px] py-4"
                disabled={step === "submitting"}
                id="reg-confirm-btn"
              >
                {step === "submitting" ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner /> Registering...
                  </span>
                ) : (
                  "Confirm Registration →"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* ── Success Step ── */}
        {step === "success" && (
          <div className="animate-scale-in text-center py-4">
            <div className="mb-6">
              <svg width="64" height="64" viewBox="0 0 72 72" fill="none" className="mx-auto">
                <circle cx="36" cy="36" r="33" stroke="rgba(76,175,98,0.3)" strokeWidth="1.5" className="success-circle" />
                <path d="M22 36l10 10 18-18" stroke="#4caf62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="success-check" />
              </svg>
            </div>

            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--green-lt)] mb-3 opacity-70">
              Registration Complete
            </p>
            <h4 className="font-['Bebas_Neue',sans-serif] text-[32px] sm:text-[40px] leading-[0.95] text-white mb-4">
              You&apos;re In,{" "}
              <span className="text-[var(--green-lt)]">
                {formData.name.split(" ")[0]}!
              </span>
            </h4>
            <p className="text-[13px] text-white/45 font-light leading-[1.8] mb-8 max-w-[360px] mx-auto">
              You&apos;re registered for <strong className="text-white/70">{event.title}</strong>.
              We&apos;ll keep you posted with event details.
            </p>

            <Button
              onClick={resetAndClose}
              variant="primary"
              className="min-w-0 px-10 justify-center rounded-[4px]"
              id="reg-done-btn"
            >
              Done ✓
            </Button>
          </div>
        )}

        {/* ── Already Registered Step ── */}
        {step === "already-registered" && (
          <div className="animate-scale-in text-center py-4">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full border border-[rgba(96,200,240,0.3)] flex items-center justify-center mx-auto">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60C8F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
            </div>

            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#60C8F0] mb-3 opacity-70">
              Already Registered
            </p>
            <h4 className="font-['Bebas_Neue',sans-serif] text-[28px] sm:text-[34px] leading-[0.95] text-white mb-4">
              You&apos;re Good!
            </h4>
            <p className="text-[13px] text-white/45 font-light leading-[1.8] mb-8 max-w-[340px] mx-auto">
              You&apos;re already registered for <strong className="text-white/70">{event.title}</strong>.
              No action needed — we&apos;ve got your spot saved.
            </p>

            <Button
              onClick={resetAndClose}
              variant="outline"
              className="min-w-0 px-10 justify-center rounded-[4px]"
              id="reg-close-btn"
            >
              Got it →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ──

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="mb-4 font-mono text-[10px] tracking-[0.1em] uppercase bg-red-400/10 text-red-400/80 border border-red-400/20 p-3 rounded-[4px]">
      {message}
    </p>
  );
}

function LoadingSpinner() {
  return (
    <svg className="reg-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="31.4 31.4" />
    </svg>
  );
}
