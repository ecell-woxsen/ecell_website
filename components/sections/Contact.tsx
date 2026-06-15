"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", type: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          type: formData.type,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatusMessage("Thank you! We'll get back to you shortly.");
      setFormData({ name: "", email: "", type: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatusMessage("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-base bg-[#020817] text-white py-[110px]" id="contact">
      <div className="section-container">
        <div className="grid grid-cols-2 gap-20 items-start max-lg:grid-cols-1 max-lg:gap-12">
          <RevealOnScroll>
            <SectionHeader label="Get in Touch" title="Let's Talk" />
            <p className="text-[15px] text-white/45 font-light leading-[1.85] mb-8">
              Have an idea worth building? Want to collaborate, sponsor, or simply
              connect? We&apos;re all ears. Drop us a line — or walk into the
              E-Cell office.
            </p>
            <div className="flex flex-col gap-3.5">
              {[
                {
                  icon: (
                    <svg className="w-4.5 h-4.5 text-[var(--green-lt)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: "Email",
                  value: siteConfig.email
                },
                {
                  icon: (
                    <svg className="w-4.5 h-4.5 text-[var(--green-lt)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: "Phone",
                  value: siteConfig.phone
                },
                {
                  icon: (
                    <svg className="w-4.5 h-4.5 text-[var(--green-lt)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: "Address",
                  value: siteConfig.address
                },
              ].map((info) => (
                <div key={info.label} className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 border border-[var(--border-g)] rounded-lg flex items-center justify-center shrink-0">
                    {info.icon}
                  </div>
                  <div className="text-[13px] text-white/50 leading-[1.6]">
                    <strong className="text-white font-medium block">{info.label}</strong>
                    {info.value}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={1}>
            <div className="classic-form-box backdrop-blur-md !mt-0">
              <h3 className="font-['Bebas_Neue',sans-serif] text-[32px] text-white tracking-[0.02em] mb-3 leading-none text-center">
                Send Us a Message
              </h3>
              <p className="text-[13px] text-white/50 font-light leading-[1.7] mb-8 text-center">
                Tell us about your idea, project, or how you want to get involved.
              </p>
              <form onSubmit={handleSubmit} className="text-left">
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 mb-2">
                  <div className="form-field-group !mb-0">
                    <label>Your Name *</label>
                    <input
                      type="text" placeholder="John Doe" required
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isSubmitting}
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="form-field-group !mb-0">
                    <label>Email Address *</label>
                    <input
                      type="email" placeholder="john@example.com" required
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isSubmitting}
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <div className="form-field-group mt-4">
                  <label>Select Enquiry Type *</label>
                  <select
                    className="form-input"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    disabled={isSubmitting}
                    required
                    suppressHydrationWarning
                  >
                    <option value="">Select enquiry type</option>
                    <option value="idea">Submit an Idea</option>
                    <option value="collab">Collaboration</option>
                    <option value="sponsor">Sponsorship</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-field-group">
                  <label>Your Message *</label>
                  <textarea
                    placeholder="How can we help?" required
                    className="form-input h-28 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                    suppressHydrationWarning
                  />
                </div>

                {statusMessage && (
                  <p className={`mb-6 font-mono text-[11px] tracking-[0.12em] uppercase p-3 rounded-[4px] border ${statusMessage.includes("Failed") ? "bg-red-400/10 text-red-400/80 border-red-400/20" : "bg-[var(--green-lt)]/10 text-[var(--green-lt)] border-[var(--green-lt)]/20"}`}>
                    {statusMessage}
                  </p>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="min-w-0 w-full justify-center rounded-[4px] py-4"
                  >
                    {isSubmitting ? "Sending..." : "Send Message →"}
                  </Button>
                </div>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

