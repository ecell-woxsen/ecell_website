export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  initials: string;
  image?: string;
  bio?: string;
  linkedin?: string;
  isLeadership?: boolean;
  category: "Presidency" | "Tech" | "Operations" | "Outreach" | "PR";
}

export const teamMembers: TeamMember[] = [
  {
    id: "mohnish-singh-patwal",
    name: "Mohnish Singh Patwal",
    role: "President",
    department: "MBA · Class of 2029",
    initials: "MSP",
    bio: "Leads E-Cell's vision and strategic direction. Previously co-founded a D2C brand reaching ₹12L ARR in 8 months.",
    linkedin: "https://linkedin.com",
    isLeadership: true,
    category: "Presidency",
  },

  {
    id: "harshith-c",
    name: "Harshith Chakravarthy",
    role: "Advisor",
    department: "BBA · Class of 2028",
    initials: "HC",
    bio: "Strategic advisor guiding E-Cell's long-term roadmap. Brings experience from two successful campus ventures.",
    linkedin: "https://linkedin.com",
    isLeadership: true,
    category: "Presidency",
  },
  {
    id: "shaik-imad",
    name: "Shaik Imaduddin",
    role: "Head of Tech",
    department: "B.Tech · Class of 2029",
    initials: "SI",
    bio: "Builds the digital infrastructure that powers E-Cell — from the website to internal tools.",
    linkedin: "https://linkedin.com",
    category: "Tech",
  },
  {
    id: "mk",
    name: "Mihir Kalway",
    role: "Head of Operations & Ideation",
    department: "B.Tech · Class of 2029",
    initials: "MK",
    bio: "Orchestrates every E-Cell event and initiative from concept to execution.",
    linkedin: "https://linkedin.com",
    category: "Operations",
  },
  {
    id: "reetika-malempati",
    name: "Reetika Malempati",
    role: "Head of Outreach & Partnerships",
    department: "BE · Class of 2027",
    initials: "RM",
    bio: "Forges partnerships with VCs, accelerators, and industry leaders across India.",
    linkedin: "https://linkedin.com",
    category: "Outreach",
  },
  {
    id: "meera-jain",
    name: "Meera Jain",
    role: "Head of PR",
    department: "BA.LLB · Class of 2028",
    initials: "MJ",
    bio: "Shapes E-Cell's story — from press coverage to social media campaigns.",
    linkedin: "https://linkedin.com",
    category: "PR",
  },
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    role: "Operations Lead",
    department: "BBA · Class of 2027",
    initials: "VS",
    bio: "The backbone of day-to-day operations, ensuring every program runs smoothly.",
    linkedin: "https://linkedin.com",
    category: "Operations",
  },
];

export const leadershipMembers = teamMembers.filter((m) => m.isLeadership);
export const coreTeamMembers = teamMembers.filter((m) => !m.isLeadership);
