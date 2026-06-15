export interface EventItem {
  id: string;
  title: string;
  date: string;
  meta: string;
  description: string;
  tag: string;
  tagType: "upcoming" | "workshop" | "competition" | "talk";
  featured?: boolean;
}

export const events: EventItem[] = [
  {
    id: "failures-to-fixes",
    title: "Failures to Fixes",
    date: "TBA",
    meta: "Campus Series",
    description: "A candid storytelling series where students, founders, or alumni share failures and how they recovered.",
    tag: "Talk Series",
    tagType: "talk",
    featured: true,
  },
  {
    id: "million-dollar-idea-board",
    title: "Million Dollar Idea Board",
    date: "Ongoing",
    meta: "High-Footfall Areas",
    description: "Large boards in the cafeteria, oval, and library entrance where students can anonymously pin ideas. Best ideas showcased online.",
    tag: "Campus Activation",
    tagType: "upcoming",
  },
  {
    id: "shark-tank-parody",
    title: "Shark Tank Parody",
    date: "TBA",
    meta: "Instagram & YouTube",
    description: "Parody videos mimicking Shark Tank with professors and senior students as 'sharks'. High engagement and viral potential.",
    tag: "Content Series",
    tagType: "talk",
  },
  {
    id: "pitch-competition",
    title: "Cross-Dept Pitch Competition",
    date: "TBA",
    meta: "Auditorium",
    description: "Structured pitch competition targeting BBA and other department students to bridge departments and build a wider entrepreneurship community.",
    tag: "Competition",
    tagType: "competition",
    featured: true,
  },
  {
    id: "design-rebrand-challenge",
    title: "Design Rebrand Challenge",
    date: "TBA",
    meta: "In Collab with Design Club",
    description: "Students brand or rebrand a startup from scratch (logos, colour palettes, visual identity) for cross-pollination between design and entrepreneurship.",
    tag: "Workshop",
    tagType: "workshop",
  },
  {
    id: "pitch-me-this-pen",
    title: "Pitch Me This Pen",
    date: "TBA",
    meta: "Open to All",
    description: "Participants pitch random everyday objects as absurd startup ideas. Judged on creativity, humour, and confidence.",
    tag: "Competition",
    tagType: "competition",
  },
  {
    id: "startup-website-hackathon",
    title: "Build Your Startup's Website",
    date: "TBA",
    meta: "In Collab with Tech Club",
    description: "Students build a website/app prototype for a startup idea focused on UI/UX. Best projects exhibited at E-Cell demo days.",
    tag: "Hackathon",
    tagType: "competition",
  },
  {
    id: "debate-series",
    title: "Startup Debate Series",
    date: "TBA",
    meta: "In Collab with Debate Club",
    description: "Regular debates on business/startup topics like 'Startups vs. Corporate' or 'Is VC funding overrated?' to sharpen critical thinking.",
    tag: "Talk",
    tagType: "talk",
  }
];

export const marqueeItems = [
  "Failures to Fixes",
  "Million Dollar Idea Board",
  "Shark Tank Parody",
  "Pitch Competition",
  "Design Rebrand Challenge",
  "Pitch Me This Pen",
  "Startup Website Hackathon",
  "Startup Debate Series",
];
