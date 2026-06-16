export interface InitiativeFeature {
  title: string;
  description: string;
}

export interface TimelineStep {
  phase: string;
  title: string;
  description: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InitiativeDetail {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  overview: string;
  stats: StatItem[];
  features: InitiativeFeature[];
  timeline: TimelineStep[];
  eligibility: string[];
  faqs: FAQItem[];
  ctaText: string;
  ctaHref: string;
}
