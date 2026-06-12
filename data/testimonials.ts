export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  venture: string;
  batch: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "E-Cell didn't just give me resources — they gave me conviction. The LaunchPad program forced me to kill 3 bad ideas before I found the one that actually had legs. Now we're at ₹30L ARR.",
    name: "Aryan Mehta",
    venture: "FinBridge · B2B Payments",
    batch: "MBA 2024",
    initials: "AM",
  },
  {
    id: "2",
    quote:
      "Walking into Pitch Perfect as a nervous sophomore and walking out with my first angel check — that's E-Cell. The community is real, the feedback is brutal, and that's exactly what you need.",
    name: "Priya Nair",
    venture: "GreenRoot · AgriTech",
    batch: "BBA 2023",
    initials: "PN",
  },
  {
    id: "3",
    quote:
      "I came in with a half-baked EdTech idea. E-Cell's mentor network connected me with two operators who'd failed in the same space — that saved us 6 months of mistakes. We're in YC's W25 batch now.",
    name: "Rohan Sharma",
    venture: "SkillStack · EdTech",
    batch: "B.Tech 2024",
    initials: "RS",
  },
  {
    id: "4",
    quote:
      "The Community Fund gave us ₹1.5L with zero equity asked. That first check meant everything — not just the money, but the signal that someone believed in us before we had proof.",
    name: "Kavya Reddy",
    venture: "StyleSphere · D2C Fashion",
    batch: "BBA 2025",
    initials: "KR",
  },
];
