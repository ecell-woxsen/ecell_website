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
    <section className="section-base bg-[var(--paper)] text-[var(--ink)] py-[110px]" id="contact">
      <div className="section-container">
        <div className="grid grid-cols-2 gap-20 items-start max-lg:grid-cols-1 max-lg:gap-12">
          <RevealOnScroll>
            <SectionHeader label="Get in Touch" title="Let's Talk" lightMode />
            <p className="text-[15px] text-[rgba(8,13,28,0.48)] font-light leading-[1.85] mb-8">
              Have an idea worth building? Want to collaborate, sponsor, or simply
              connect? We&apos;re all ears. Drop us a line — or walk into the
              E-Cell office.
            </p>
            <div className="flex flex-col gap-3.5">
              {[
                { icon: "📧", label: "Email", value: siteConfig.email },
                { icon: "📞", label: "Phone", value: siteConfig.phone },
                { icon: "📍", label: "Address", value: siteConfig.address },
              ].map((info) => (
                <div key={info.label} className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 border border-[rgba(8,13,28,0.12)] rounded-lg flex items-center justify-center text-[15px] shrink-0">
                    {info.icon}
                  </div>
                  <div className="text-[13px] text-[rgba(8,13,28,0.55)] leading-[1.6]">
                    <strong className="text-[var(--ink)] font-medium block">{info.label}</strong>
                    {info.value}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={2}>
            <div className="card-pad bg-[var(--paper2)] border border-[rgba(8,13,28,0.1)] rounded-2xl text-center">
              <h3 className="font-['Bebas_Neue',sans-serif] text-4xl text-[var(--ink)] mb-2.5 tracking-[0.03em]">
                Send Us a Message
              </h3>
              <p className="text-[13px] text-[rgba(8,13,28,0.46)] font-light leading-[1.7] mb-6.5">
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
                  className="w-full bg-[var(--navy)] text-white py-3.5 font-mono text-[11px] tracking-[0.12em] uppercase border-none rounded-lg transition-colors duration-200 hover:bg-[var(--navy-mid)] mt-2 cursor-pointer"
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
