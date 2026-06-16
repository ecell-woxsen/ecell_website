import { InitiativeDetail } from "./types";

export const launchpad: InitiativeDetail = {
  id: "launchpad",
  number: "01",
  title: "LaunchPad",
  tagline: "Pre-incubation program: 8-week sprint from napkin sketch to MVP.",
  description:
    "Pre-incubation program: 8-week sprint from napkin sketch to MVP. Structured curriculum + weekly mentor check-ins.",
  overview:
    "LaunchPad is E-Cell Woxsen's flagship pre-incubation program designed to help student builders turn raw ideas into viable minimum viable products (MVPs). Over 8 weeks, selected cohorts go through a rigorous, hands-on journey featuring masterclasses, milestone tracking, and intensive 1-on-1 mentorship.",
  stats: [
    { label: "Duration", value: "8 Weeks" },
    { label: "Cohort Size", value: "10 Startups" },
    { label: "Mentors", value: "15+ Operators" },
    { label: "Focus", value: "Ideation & MVP" },
  ],
  features: [
    {
      title: "Ideation & Validation",
      description:
        "Refine your problem statement, validate the market size, and profile target customers with data.",
    },
    {
      title: "MVP Architecture",
      description:
        "Get guidance on tech stack selection, low-code/no-code prototyping, and agile development planning.",
    },
    {
      title: "Mentorship Sprints",
      description:
        "Weekly 1-on-1 sessions with industry experts, software engineers, and successful founders.",
    },
    {
      title: "Demo Day",
      description:
        "Pitch to angel investors, startup incubators, and E-Cell's community fund committee for next-stage support.",
    },
  ],
  timeline: [
    {
      phase: "Phase 1 (Weeks 1-2)",
      title: "Problem Discovery & Customer Development",
      description:
        "Conduct user interviews, run surveys, and build buyer personas to validate that the problem actually exists.",
    },
    {
      phase: "Phase 2 (Weeks 3-4)",
      title: "Solution Design & Prototyping",
      description:
        "Design user flows, sketch wireframes, and choose your tech stack. Build high-fidelity interactive mockups.",
    },
    {
      phase: "Phase 3 (Weeks 5-6)",
      title: "MVP Development & User Testing",
      description:
        "Code your core features or assemble no-code tools. Deploy the first build and test it with a cohort of beta users.",
    },
    {
      phase: "Phase 4 (Weeks 7-8)",
      title: "Pitch Refinement & Demo Day",
      description:
        "Craft your pitch deck, practice storytelling, refine financial projections, and present to active investors at Demo Day.",
    },
  ],
  eligibility: [
    "At least one co-founder must be a student at Woxsen University.",
    "The startup idea must be at the pre-seed / early prototype stage.",
    "The core team must commit at least 15 hours per week to program activities.",
  ],
  faqs: [
    {
      question: "Do I need to have a co-founder to apply?",
      answer:
        "No, solo founders are welcome! However, we strongly encourage finding complementary team members (e.g., a technical co-founder if you are business-focused) during or before the program.",
    },
    {
      question: "Is there any fee or equity required to participate?",
      answer:
        "No. LaunchPad is entirely free, equity-free, and supported by E-Cell and Woxsen University's startup ecosystem.",
    },
    {
      question: "What happens after the program ends?",
      answer:
        "Graduating teams are fast-tracked for incubation at Woxsen's main incubator (Woxsen Trade Tower) and are eligible to pitch directly for the E-Cell Community Fund.",
    },
  ],
  ctaText: "Apply for next cohort",
  ctaHref: "/submit-idea",
};
