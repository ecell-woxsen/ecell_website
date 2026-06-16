import { InitiativeDetail } from "./types";

export const speakerCircuit: InitiativeDetail = {
  id: "speaker-circuit",
  number: "03",
  title: "Speaker Circuit",
  tagline:
    "Intimate, unfiltered conversations with founders, VCs, and operators.",
  description:
    "Intimate, unfiltered conversations with founders, VCs, and operators who've been through the fire.",
  overview:
    "Speaker Circuit brings high-caliber startup operators, venture capitalists, and industry veterans directly to campus. Instead of generic public lectures, we host highly interactive, small-group panel discussions and fireside chats where builders can ask raw, real questions and get honest, unvarnished advice.",
  stats: [
    { label: "Speakers", value: "30+ Hosted" },
    { label: "Attendees", value: "1500+ Builders" },
    { label: "Formats", value: "Fireside & Panel" },
    { label: "Frequency", value: "Monthly" },
  ],
  features: [
    {
      title: "Unfiltered Q&A",
      description:
        "No PR answers. We ask hard questions about burn rates, co-founder disputes, downrounds, and pivots.",
    },
    {
      title: "Small-Group Roundtables",
      description:
        "Selected student founders participate in closed-door, 15-person roundtables with visiting speakers.",
    },
    {
      title: "Direct Networking",
      description:
        "Speed networking sessions at the end of each event to exchange contacts and pitch ideas directly to speakers.",
    },
    {
      title: "Virtual Masterclasses",
      description:
        "Deep technical, growth, or fundraising masterclasses led by global experts and operators.",
    },
  ],
  timeline: [
    {
      phase: "Outreach & Selection",
      title: "Booking Speakers",
      description:
        "Identify and reach out to founders, operators, and VCs working on cutting-edge industries that match student interests.",
    },
    {
      phase: "Audience Curation",
      title: "Registrations & Questions",
      description:
        "Open registrations to the student body and curate specific questions from active student founders to guide the panel.",
    },
    {
      phase: "The Event",
      title: "Fireside & Networking",
      description:
        "A 60-minute panel/fireside session focused on real struggles, followed by an exclusive 30-minute networking mixer.",
    },
    {
      phase: "Follow-up",
      title: "Insights & Video Release",
      description:
        "Distribute key takeaways, transcripts, and event recordings to the community mailing list.",
    },
  ],
  eligibility: [
    "Public sessions are open to all Woxsen University students, faculty, and alumni.",
    "Closed-door roundtables are reserved for active student founders and LaunchPad cohorts.",
    "Registration is mandatory due to limited capacity for physical networking mixers.",
  ],
  faqs: [
    {
      question: "Are these sessions recorded?",
      answer:
        "Yes, public fireside chats and panels are recorded and shared on our youtube/resources page. However, closed-door roundtables are strictly off-the-record to ensure unfiltered honesty.",
    },
    {
      question: "How can I suggest or request a specific speaker?",
      answer:
        "You can email us or submit a suggestion via our community channels. Let us know who they are, what they do, and why they would be a great fit for Woxsen builders.",
    },
    {
      question: "Do I have to pitch my startup during these events?",
      answer:
        "No, it's not a pitching competition! The networking mixer is a space to chat, ask for advice, build relationships, and get feedback on what you're working on.",
    },
  ],
  ctaText: "Check upcoming events",
  ctaHref: "/events",
};
