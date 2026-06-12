"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { siteConfig } from "@/data/site";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", type: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate form submission
    alert("Thank you! We'll get back to you shortly.");
    setFormData({ name: "", email: "", type: "", message: "" });
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

          <RevealOnScroll delay={2}>
            <div className="card-pad bg-white/[0.02] border border-white/[0.06] rounded-2xl text-center">
              <h3 className="font-['Bebas_Neue',sans-serif] text-4xl text-white mb-2.5 tracking-[0.03em]">
                Send Us a Message
              </h3>
              <p className="text-[13px] text-white/45 font-light leading-[1.7] mb-6.5">
                Tell us about your idea, project, or how you want to get involved.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3 mb-3 max-sm:grid-cols-1">
                  <input
                    type="text" placeholder="Your Name" required
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="email" placeholder="Email Address" required
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-input"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="">Select enquiry type</option>
                    <option value="idea">Submit an Idea</option>
                    <option value="collab">Collaboration</option>
                    <option value="sponsor">Sponsorship</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <textarea
                    placeholder="Your message..."
                    className="form-input h-24 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[var(--green)] hover:bg-[var(--green-mid)] text-white py-3.5 font-mono text-[11px] tracking-[0.12em] uppercase border-none rounded-lg transition-colors duration-200 mt-2 cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
