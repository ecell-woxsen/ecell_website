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
  },
  {
    id: "shivaa-kiran",
    name: "Ramuni Shivaa Kiran",
    role: "Vice President",
    department: "BBA · Class of 2028",
    initials: "RSK",
    bio: "Drives operations and community building. Passionate about connecting student founders with the right mentors.",
    linkedin: "https://linkedin.com",
    isLeadership: true,
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
  },
  {
    id: "shaik-imad",
    name: "Shaik Imaduddin",
    role: "Head of Tech",
    department: "B.Tech · Class of 2029",
    initials: "SI",
    bio: "Builds the digital infrastructure that powers E-Cell — from the website to internal tools.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mk",
    name: "Mihir Kalway",
    role: "Head of Operations & Ideation",
    department: "B.Tech · Class of 2029",
    initials: "MK",
    bio: "Orchestrates every E-Cell event and initiative from concept to execution.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "sreeya",
    name: "Sreeya Chatterjee",
    role: "Head of Outreach & Partnerships",
    department: "BE · Class of 2027",
    initials: "SC",
    bio: "Forges partnerships with VCs, accelerators, and industry leaders across India.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "meera-jain",
    name: "Meera Jain",
    role: "Head of PR",
    department: "BA.LLB · Class of 2028",
    initials: "MJ",
    bio: "Shapes E-Cell's story — from press coverage to social media campaigns.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    role: "Operations Lead",
    department: "BBA · Class of 2027",
    initials: "VS",
    bio: "The backbone of day-to-day operations, ensuring every program runs smoothly.",
    linkedin: "https://linkedin.com",
  },
];

export const leadershipMembers = teamMembers.filter((m) => m.isLeadership);
export const coreTeamMembers = teamMembers.filter((m) => !m.isLeadership);
