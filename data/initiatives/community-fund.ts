import { InitiativeDetail } from "./types";

export const communityFund: InitiativeDetail = {
  id: "community-fund",
  number: "04",
  title: "Community Fund",
  tagline: "Micro-grants for student ventures — ₹50K–2L. No equity, no strings.",
  description:
    "Micro-grants for student ventures — ₹50K–2L. No equity, no strings. Just build and prove traction.",
  overview:
    "The Community Fund is a zero-equity, zero-interest micro-grant program designed to help student builders get their first bit of runway. Whether it is server costs, API access, basic marketing, or legal setup, we provide quick, non-dilutive capital to help you build fast and prove early traction without worrying about debt or equity loss.",
  stats: [
    { label: "Grant Range", value: "₹50K - ₹2L" },
    { label: "Equity Taken", value: "0% (Equity-Free)" },
    { label: "Annual Pool", value: "₹10L Total" },
    { label: "Decision Time", value: "< 14 Days" },
  ],
  features: [
    {
      title: "Non-Dilutive Capital",
      description:
        "We take no shares, no board seats, and no personal guarantees. This is purely community-supported capital.",
    },
    {
      title: "Lightning Fast Approvals",
      description:
        "From application submission to final board decision in under 14 days, minimizing distraction for active builders.",
    },
    {
      title: "Builder Software Credits",
      description:
        "Selected startups receive additional credits for AWS, OpenAI, GitHub, and other tools worth up to ₹5L.",
    },
    {
      title: "Milestone Checkpoints",
      description:
        "Bi-weekly brief check-ins to help grantees deploy capital efficiently and connect with next-stage seed VCs.",
    },
  ],
  timeline: [
    {
      phase: "Stage 1",
      title: "Application Submission",
      description:
        "Submit a quick pitch deck, budget breakdown showing exactly how the grant will be spent, and a demo/prototype link.",
    },
    {
      phase: "Stage 2",
      title: "Screening & Review",
      description:
        "E-Cell's investment committee reviews submissions for viability, execution capability, and budget legitimacy.",
    },
    {
      phase: "Stage 3",
      title: "10-Min Pitch Battle",
      description:
        "Shortlisted teams give a 10-minute online presentation followed by 10 minutes of Q&A with E-Cell directors and mentors.",
    },
    {
      phase: "Stage 4",
      title: "Disbursement & Support",
      description:
        "Approved funds are transferred directly, and founders are onboarded into our milestone tracking and network.",
    },
  ],
  eligibility: [
    "Startup must be co-founded by at least one active Woxsen University student.",
    "Must have a working prototype, MVP, or early customer traction (no napkin-only ideas).",
    "Must submit a transparent, line-item budget showing direct development/acquisition expenses.",
  ],
  faqs: [
    {
      question: "Do I have to pay this money back or give up shares?",
      answer:
        "No. It is a grant, not a loan or an equity investment. You do not pay it back, and you retain 100% ownership. However, you must commit to reporting your progress monthly.",
    },
    {
      question: "What expenses are eligible for the grant?",
      answer:
        "Hosting servers, SaaS subscriptions, third-party API keys, product development, legal incorporation, hardware components, and early user acquisition ads. Founder salaries or general living expenses are NOT covered.",
    },
    {
      question: "Can I apply if my startup is not registered yet?",
      answer:
        "Yes! You can apply as an unregistered team. If selected, part of the grant can be allocated to cover your entity registration costs.",
    },
  ],
  ctaText: "Pitch your idea",
  ctaHref: "/submit-idea",
};
