export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  initials: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "mohnish-singh-patwal",
    name: "Mohnish Singh Patwal",
    role: "President",
    department: "MBA · Class of 2029",
    initials: "MSP",
  },
  {
    id: "shivaa-kiran",
    name: "Ramuni Shivaa Kiran",
    role: "Vice President",
    department: "BBA Class of 2028",
    initials: "RSK",
  },
  {
    id: "harshith-c",
    name: "Harshith Chakravarthy",
    role: "Advisor",
    department: "BBA · Class of 2028",
    initials: "HC",
  },
  {
    id: "shaik-imad",
    name: "Shaik Imaduddin",
    role: "Head of Tech",
    department: "B.Tech · Class of 2029",
    initials: "SI",
  },
  {
    id: "mk",
    name: "Mihir Kalway",
    role: "Head of Operations and Ideation",
    department: "B.Tech · Class of 2029",
    initials: "MK",
  },
  {
    id: "sreeya",
    name: "Sreeya Chatterjee",
    role: "Head of Outreach and Partnerships",
    department: "BE · Class of 2027",
    initials: "SC",
  },
  {
    id: "meera-jain",
    name: "Meera Jain",
    role: "Head of PR",
    department: "BA.LLB · Class of 2028",
    initials: "MJ",
  },
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    role: "Operations Lead",
    department: "BBA · Class of 2027",
    initials: "VS",
  },
];
