export interface CommunityStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface CommunityStat {
  id: string;
  value: string;
  label: string;
  description: string;
}

export const communitySteps: CommunityStep[] = [
  {
    id: "apply",
    number: "01",
    title: "Apply Online",
    description:
      "Fill a 2-minute form. We care about intent, not GPA.",
  },
  {
    id: "onboard",
    number: "02",
    title: "Get Onboarded",
    description:
      "Join Slack, meet your cohort, pick your vertical.",
  },
  {
    id: "build",
    number: "03",
    title: "Build & Ship",
    description:
      "Launch projects, attend events, access mentors.",
  },
  {
    id: "grow",
    number: "04",
    title: "Grow Your Network",
    description:
      "Connect with 1,200+ builders, investors, and operators.",
  },
];

export const communityStats: CommunityStat[] = [
  {
    id: "members",
    value: "1,200+",
    label: "Active Members",
    description: "Across 6 verticals — from AI to D2C.",
  },
  {
    id: "startups",
    value: "24",
    label: "Startups Launched",
    description: "7 revenue-positive within 6 months.",
  },
  {
    id: "mentors",
    value: "40+",
    label: "Mentor Network",
    description: "Founders, VCs, and industry operators.",
  },
  {
    id: "funding",
    value: "₹18L+",
    label: "Grants Disbursed",
    description: "Zero equity. All merit-based.",
  },
];
