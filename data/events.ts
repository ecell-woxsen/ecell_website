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
    id: "founders-weekend",
    title: "Founders' Weekend 4.0",
    date: "JUN 14",
    meta: "Jun 14–15, 2025 · Woxsen Campus",
    description:
      "54-hour startup sprint: ideate, prototype, pitch. Top 3 teams receive ₹3L+ in equity-free grants and direct mentorship from YC alumni.",
    tag: "Upcoming",
    tagType: "upcoming",
    featured: true,
  },
  {
    id: "pitch-perfect",
    title: "Pitch Perfect",
    date: "JUN 28",
    meta: "Jun 28, 2025 · Auditorium",
    description:
      "Monthly pitch night where founders get 4 minutes, a harsh buzzer, and brutally honest VC feedback.",
    tag: "Competition",
    tagType: "competition",
  },
  {
    id: "growth-lab",
    title: "Growth Lab",
    date: "JUL 05",
    meta: "Jul 5, 2025 · Online + Campus",
    description:
      "Deep-dive workshops on CAC, retention loops, and unit economics — taught by operators who scaled past Series A.",
    tag: "Workshop",
    tagType: "workshop",
  },
  {
    id: "speaker-circuit",
    title: "Speaker Circuit",
    date: "JUL 12",
    meta: "Jul 12, 2025 · Seminar Hall",
    description:
      "Intimate fireside chats with founders who've built, broken, and rebuilt — unfiltered.",
    tag: "Talk",
    tagType: "talk",
  },
  {
    id: "hack-the-campus",
    title: "Hack the Campus",
    date: "JUL 26",
    meta: "Jul 26–27, 2025 · Innovation Hub",
    description:
      "Solve real campus problems with code. Best hacks get implemented university-wide and win the E-Cell Builders Badge.",
    tag: "Competition",
    tagType: "competition",
  },
];

export const marqueeItems = [
  "Founders' Weekend 4.0",
  "Pitch Perfect",
  "Growth Lab",
  "Speaker Circuit",
  "Hack the Campus",
  "Startup Bootcamp",
  "Investor Connect",
  "Product Sprint",
];
