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

export const teamMembers: TeamMember[] = [];
export const leadershipMembers: TeamMember[] = [];
export const coreTeamMembers: TeamMember[] = [];
