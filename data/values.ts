export interface ValueItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface MiniPillar {
  id: string;
  number: string;
  label: string;
}

export const values: ValueItem[] = [
  {
    id: "build-first",
    icon: "⚡",
    title: "Build First, Plan Later",
    description:
      "We believe in shipping before perfecting. Velocity over precision.",
  },
  {
    id: "fail-forward",
    icon: "🔄",
    title: "Fail Forward",
    description:
      "Every post-mortem is a pre-mortem for the next venture. We celebrate lessons.",
  },
  {
    id: "community-driven",
    icon: "🤝",
    title: "Community > Competition",
    description:
      "A rising tide lifts all boats. We grow by helping others grow.",
  },
  {
    id: "impact-matters",
    icon: "🎯",
    title: "Impact Over Optics",
    description:
      "Substance over flash. Real outcomes, not vanity metrics.",
  },
];

export const miniPillars: MiniPillar[] = [
  { id: "incubate", number: "01", label: "Incubate" },
  { id: "accelerate", number: "02", label: "Accelerate" },
  { id: "invest", number: "03", label: "Invest" },
  { id: "connect", number: "04", label: "Connect" },
];

export const aboutBody = `E-Cell Woxsen is the <strong>entrepreneurship nerve centre</strong> of Woxsen University. We don't just talk about building — we build. Since 2019, we've shipped 24 student startups, hosted 80+ events, and created a 1,200-member community that operates like a real-world accelerator.

Our mission is simple: <strong>lower the activation energy for first-time founders.</strong> Whether you're a coder, designer, marketer, or dreamer — if you have grit and an idea worth pursuing, E-Cell is your launchpad.`;
