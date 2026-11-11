import { img } from "./images";

/**
 * Case studies (workbook section 5). For now these describe how Serviceberry delivers each
 * type of job, in the present tense, with no client names, figures or dates, so they make no
 * claim about a specific past project. TODO(verify): replace each with a
 * real, client-approved case study (dates, location, exact role, verified outcome) and set
 * `verified: true`. Until then they show a "To verify" tag in development.
 */
export type Role =
  | "Direct contractor"
  | "Subcontractor"
  | "Local representative"
  | "Technical partner"
  | "Personnel experience";

export type Project = {
  slug: string;
  title: string;
  type: string;
  location: string;
  role: string;
  scope: string[];
  outcome: string;
  image: string;
  service: string;
  caseStudy: {
    overview: string;
    client: string;
    challenge: string;
    scope: string;
    execution: string;
    outcome: string;
    roleClarification: string;
  };
  verified: boolean;
};

export const projects: Project[] = [
  {
    slug: "operational-pigging-programme",
    title: "Operational pigging programmes",
    type: "Pipeline integrity",
    location: "Onshore & offshore lines",
    role: "Service contractor",
    scope: ["Pig selection & sizing", "Cleaning runs", "Run reporting"],
    outcome: "Cleaner lines and a documented run history.",
    image: img.pigging,
    service: "pipeline-integrity-pigging",
    caseStudy: {
      overview:
        "A planned programme of cleaning runs on a producing pipeline, scheduled around operations so throughput is protected while the line is cleaned.",
      client: "Upstream operators and pipeline owners.",
      challenge: "Wax, scale and debris reduce throughput and keep a line from being inspection-ready.",
      scope: "Line review, pig selection and sizing, launcher and receiver operation, and a report after every run.",
      execution:
        "Progressive cleaning with foam and then brush pigs, gauge plate runs ahead of inspection, and debris measured at the receiver.",
      outcome: "A clean, gauged line ready for inspection, with every run recorded.",
      roleClarification: "Serviceberry plans and runs the pigging operations; specialist tool providers join for intelligent pigging.",
    },
    verified: false,
  },
  {
    slug: "hydrotest-and-commissioning",
    title: "Pipeline hydrotest & commissioning",
    type: "Commissioning",
    location: "New and repaired lines",
    role: "Service contractor",
    scope: ["Flushing & gauging", "Hydrostatic testing", "Dewatering & drying"],
    outcome: "A line proven clean, strong and dry before start-up.",
    image: img.commissioning,
    service: "pipeline-commissioning-maintenance",
    caseStudy: {
      overview: "Pre-commissioning of a new or repaired pipeline section ahead of hand-over to operations.",
      client: "Pipeline projects and EPC contractors.",
      challenge: "The line must be proven clean, leak-free and dry, often to a tight start-up date.",
      scope: "Flushing, gauging, hydrostatic testing, dewatering and drying, with test records.",
      execution: "Fill and flush with pigs, gauge plate run, pressure test with calibrated recorders, then dewatering pigs.",
      outcome: "Test records handed over and the line released for commissioning.",
      roleClarification: "Serviceberry delivers the testing scope; construction is usually by others.",
    },
    verified: false,
  },
  {
    slug: "descaling-campaign",
    title: "Process system descaling",
    type: "Chemical solutions",
    location: "Production facilities",
    role: "Chemical supplier",
    scope: ["Alpha Descaler supply", "Dosing support", "Performance follow-up"],
    outcome: "Scale removed and performance restored.",
    image: img.chemicals,
    service: "production-specialty-chemicals",
    caseStudy: {
      overview: "Chemical descaling of process equipment where scale is cutting efficiency.",
      client: "Production and process facility operators.",
      challenge: "Scale in exchangers and lines reduces flow and heat transfer.",
      scope: "Supply of Alpha Descaler, dosing recommendations and follow-up checks.",
      execution: "Circulation cleaning with controlled dosing, neutralisation and safe disposal.",
      outcome: "Equipment returned to service with scale removed.",
      roleClarification: "Serviceberry supplies the chemicals and technical support.",
    },
    verified: false,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
