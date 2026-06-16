import { InitiativeDetail } from "./types";

export const founderLab: InitiativeDetail = {
  id: "founder-lab",
  number: "02",
  title: "Founder Lab",
  tagline:
    "Deep research vertical — we study failures, map markets, and publish playbooks.",
  description:
    "Deep research vertical — we study failures, map markets, and publish founder-first playbooks that actually help.",
  overview:
    "Founder Lab is E-Cell's dedicated research and publication wing. We believe that startup education shouldn't be theoretical. We study real startup failures, profile emerging market sectors, map regional ecosystems, and compile highly tactical playbooks addressing the concrete hurdles of student-led ventures.",
  stats: [
    { label: "Case Studies", value: "20+ Published" },
    { label: "Market Maps", value: "5 Sectors" },
    { label: "Readership", value: "2000+ Founders" },
    { label: "Formats", value: "PDF & Web" },
  ],
  features: [
    {
      title: "Post-Mortem Analysis",
      description:
        "Deep-dive investigations into why promising student startups failed, drawing objective, reusable lessons.",
    },
    {
      title: "Ecosystem Mapping",
      description:
        "Comprehensive directories of local grants, student-friendly software credits, and co-working spaces.",
    },
    {
      title: "Tactical Playbooks",
      description:
        "Step-by-step guides on entity registration, GST compliance, equity splitting, and early-stage hiring.",
    },
    {
      title: "Expert Peer Reviews",
      description:
        "Guides reviewed and vetted by seasoned startup operators, legal experts, and active angel investors.",
    },
  ],
  timeline: [
    {
      phase: "Research & Collection",
      title: "Information Gathering",
      description:
        "Conduct interviews with failed and successful founders. Gather data on regional markets, tools, and regulatory guidelines.",
    },
    {
      phase: "Drafting",
      title: "Synthesizing Insights",
      description:
        "Draft playbooks with practical checklists, visual decision trees, and links to templates (e.g. founder agreements).",
    },
    {
      phase: "Verification",
      title: "Professional Vetting",
      description:
        "Submit drafts to legal, tech, and financial advisors to ensure advice complies with current regulations and practices.",
    },
    {
      phase: "Distribution",
      title: "Open-Source Release",
      description:
        "Publish guides under Creative Commons so that student founders nationwide can read, download, and share them for free.",
    },
  ],
  eligibility: [
    "Open to Woxsen student researchers, technical writers, and business analysts.",
    "Demonstrable interest in venture capital, business research, or the startup ecosystem.",
    "Strong writing, research, or data analysis skills.",
  ],
  faqs: [
    {
      question: "Where can I read and download these playbooks?",
      answer:
        "All our publications are open-source and will be accessible via our resources section. You can download them as PDFs or read them directly in your browser.",
    },
    {
      question: "Can I submit a case study or contribute to a playbook?",
      answer:
        "Absolutely! We accept contributions from students, founders, and experts. Get in touch with the team to pitch your case study or guide idea.",
    },
    {
      question: "Are these playbooks relevant outside of India?",
      answer:
        "While local tax, regulatory, and incorporation guides are focused on India, our sections on validation, product-market fit, and team building apply globally.",
    },
  ],
  ctaText: "Read our playbooks",
  ctaHref: "#",
};
