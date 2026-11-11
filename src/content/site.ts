/**
 * Company-wide facts. Everything here appears in the header, footer, contact page and
 * metadata, so it is the one place to update contact details.
 *
 * Address is the NEW address from the redesign workbook. The old Eneka Road address
 * must not appear anywhere on the site.
 */
export const site = {
  name: "Serviceberry Global Limited",
  short: "Serviceberry",
  url: "https://www.serviceberryglobal.com",
  tagline: "Specialised process and pipeline services",
  description:
    "Serviceberry Global Limited delivers engineering, asset integrity, pipeline, process and equipment solutions to the oil and gas and industrial sectors in Nigeria and beyond.",
  academyUrl: "https://academy.serviceberryglobal.com",
  address: {
    lines: ["Plot 7B, Road 7B, Victory Estate", "Elelenwo, Port Harcourt", "Rivers State, Nigeria"],
    oneLine: "Plot 7B, Road 7B, Victory Estate, Elelenwo, Port Harcourt, Rivers State",
    // TODO(verify): Serviceberry must confirm the map pin before launch.
    mapQuery: "Victory Estate, Elelenwo, Port Harcourt, Rivers State, Nigeria",
  },
  phones: ["+234 702 500 2228", "+234 815 613 5559"],
  email: "info@serviceberryglobal.com",
  // TODO(verify): add the company LinkedIn URL and WhatsApp number when confirmed.
  linkedin: "" as string,
  whatsapp: "" as string,
  /**
   * Hero video. Drop a Higgsfield render at public/media/hero.mp4 (see HIGGSFIELD.md)
   * and set this to "/media/hero.mp4". Until then the hero uses the poster photo with motion.
   */
  heroVideo: null as string | null,
} as const;

/**
 * Social profiles, shown in the footer and the menu.
 * TODO(verify): no public Serviceberry pages could be found (Nov 2026), so each link opens a
 * search for the company on that network. Replace each `href` with the company page.
 */
export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/search/results/companies/?keywords=Serviceberry%20Global%20Limited" },
  { name: "Instagram", href: "https://www.instagram.com/explore/search/keyword/?q=serviceberry%20global" },
  { name: "Facebook", href: "https://www.facebook.com/search/pages/?q=Serviceberry%20Global%20Limited" },
] as const;

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: { label: string; href: string; description?: string }[];
};

export const nav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Equipment", href: "/equipment" },
  { label: "Projects", href: "/projects" },
  { label: "Partners", href: "/partners" },
  { label: "QHSE", href: "/qhse" },
  { label: "Careers", href: "/careers" },
  { label: "Academy", href: "/academy" },
];

export const values = [
  { title: "Value creation", body: "Every scope is planned around what it saves or protects for the client." },
  { title: "Assiduity", body: "Careful, persistent work on the details that keep assets running." },
  { title: "Respect", body: "For people, communities, clients and the environment we work in." },
  { title: "Proficiency", body: "Multi-skilled professionals and the right equipment for the job." },
  { title: "Innovation", body: "Specialist technologies brought in through strong partnerships." },
  { title: "Integrity", body: "Transparent scopes, honest reporting and documented roles." },
];

export const vision =
  "To deliver cost-effective solutions and services with priority on safety, service quality and growth.";
export const mission =
  "To become a leading global service provider in the oil, gas and energy sector through innovative technology, multi-skilled professionals and robust equipment capacity.";

export const clientReasons = [
  { title: "Creating value", body: "Practical solutions that improve reliability and cut downtime." },
  { title: "Tailored solutions", body: "Scopes built for your asset, not a one-size template." },
  { title: "Teamwork", body: "Our crews, your operators and specialist partners as one team." },
  { title: "Safety first", body: "Permit-to-work discipline and zero-harm thinking on every job." },
  { title: "Transparency & trust", body: "Clear roles, clear reporting, no surprises." },
  { title: "Due diligence", body: "Verified equipment, verified methods, verified people." },
];

export const enquiryTypes = [
  "Services",
  "Equipment for Sale",
  "Equipment Sourcing",
  "Project Collaboration",
  "Academy",
  "Other",
] as const;
