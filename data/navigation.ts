export interface NavLink {
  label: string;
  href: string;
  isCTA?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  /*
   * TO RESTORE EVENTS & INITIATIVES:
   * Uncomment the two lines below to add "Events" and "Initiatives" back to the navbar.
   */
  // { label: "Events", href: "/events" },
  // { label: "Initiatives", href: "/initiatives" },
  { label: "Team", href: "/team" },
  { label: "Community", href: "/community" },
  /*
   * TO RESTORE AFFILIATIONS:
   * Uncomment the line below to add "Affiliations" back to the navbar.
   */
  // { label: "Affiliations", href: "/affiliations" },
  { label: "Submit Idea →", href: "/submit-idea", isCTA: true },
];

export const footerLinks = {
  quickLinks: [
    { label: "About Us", href: "/#about" },
    /*
     * TO RESTORE EVENTS & INITIATIVES:
     * Uncomment the two lines below to add "Events" and "Initiatives" back to the footer.
     */
    // { label: "Events", href: "/events" },
    // { label: "Initiatives", href: "/initiatives" },
    { label: "Team", href: "/team" },
  ],
  resources: [
    { label: "Submit Your Idea", href: "/submit-idea" },
    { label: "Founder Playbook", href: "#" },
    { label: "Pitch Guidelines", href: "#" },
    { label: "Mentor Network", href: "#" },
  ],
  connect: [
    { label: "Contact Us", href: "/#contact" },
    { label: "Community", href: "/community" },
    /*
     * TO RESTORE AFFILIATIONS:
     * Uncomment the line below to add "Affiliations" back to the footer.
     */
    // { label: "Affiliations", href: "/affiliations" },
  ],
};
