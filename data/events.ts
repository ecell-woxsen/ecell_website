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

export const events: EventItem[] = [];
export const marqueeItems: string[] = [];
