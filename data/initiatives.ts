export interface Initiative {
  id: string;
  number: string;
  icon: string;
  title: string;
  description: string;
}

export const initiatives: Initiative[] = [
  {
    id: "launchpad",
    number: "01",
    icon: "🚀",
    title: "LaunchPad",
    description:
      "Pre-incubation program: 8-week sprint from napkin sketch to MVP. Structured curriculum + weekly mentor check-ins.",
  },
  {
    id: "founder-lab",
    number: "02",
    icon: "🔬",
    title: "Founder Lab",
    description:
      "Deep research vertical — we study failures, map markets, and publish founder-first playbooks that actually help.",
  },
  {
    id: "speaker-circuit",
    number: "03",
    icon: "🎤",
    title: "Speaker Circuit",
    description:
      "Intimate, unfiltered conversations with founders, VCs, and operators who've been through the fire.",
  },
  {
    id: "community-fund",
    number: "04",
    icon: "💰",
    title: "Community Fund",
    description:
      "Micro-grants for student ventures — ₹50K–2L. No equity, no strings. Just build and prove traction.",
  },
];
