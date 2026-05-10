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
    id: "arjun-mehta",
    name: "Arjun Mehta",
    role: "President",
    department: "BBA · Class of 2026",
    initials: "AM",
  },
  {
    id: "sneha-krishnan",
    name: "Sneha Krishnan",
    role: "Vice President",
    department: "B.Tech CSE · Class of 2026",
    initials: "SK",
  },
  {
    id: "rohan-verma",
    name: "Rohan Verma",
    role: "Head of Events",
    department: "BBA · Class of 2027",
    initials: "RV",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Design Lead",
    department: "B.Des · Class of 2027",
    initials: "PS",
  },
  {
    id: "ananya-reddy",
    name: "Ananya Reddy",
    role: "Head of Marketing",
    department: "BBA · Class of 2027",
    initials: "AR",
  },
  {
    id: "karthik-iyer",
    name: "Karthik Iyer",
    role: "Tech Lead",
    department: "B.Tech CSE · Class of 2027",
    initials: "KI",
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
