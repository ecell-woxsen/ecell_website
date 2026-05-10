export interface Affiliation {
  id: string;
  name: string;
  logo?: string;
}

export const affiliations: Affiliation[] = [
  { id: "wadhwani", name: "Wadhwani Foundation" },
  { id: "nasscom", name: "NASSCOM" },
  { id: "startup-india", name: "Startup India" },
  { id: "tie", name: "TiE Hyderabad" },
  { id: "aws", name: "AWS EdStart" },
  { id: "microsoft", name: "Microsoft for Startups" },
  { id: "google", name: "Google for Startups" },
  { id: "razorpay", name: "Razorpay Rize" },
  { id: "yc", name: "YC Startup School" },
  { id: "headstart", name: "Headstart Network" },
];
