import { brochure, img } from "./images";

/**
 * Service lines from the redesign workbook (section 2 and 3), with the services listed on
 * the current website folded into each scope.
 *
 * TODO(verify): management must confirm each service is currently offered, and approve
 * the wording, before launch. Set `confirmed: true` once approved.
 */
export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  image: string;
  icon: "pig" | "valve" | "plant" | "flask" | "signal" | "crate" | "wrench";
  onHome: boolean;
  scope: { heading: string; items: string[] }[];
  technology: string[];
  applications: string[];
  relatedProject?: string;
  cta: "discussion" | "quotation";
  confirmed: boolean;
};

export const services: Service[] = [
  {
    slug: "pipeline-integrity-pigging",
    title: "Pipeline Integrity & Pigging",
    short:
      "Pipeline inspection, cleaning and pigging solutions supporting pipeline integrity and operational reliability.",
    intro:
      "Wax, scale, debris and water reduce throughput and hide the corrosion that leads to failures. Serviceberry plans and runs operational and intelligent pigging programmes that keep lines clean, measurable and inspectable, with clear reporting after every run.",
    image: img.pigging,
    icon: "pig",
    onHome: true,
    scope: [
      {
        heading: "Operational & maintenance pigging",
        items: [
          "Cleaning, dewaxing and debris removal programmes",
          "Batching, dewatering and product separation",
          "Pig selection, sizing and run planning",
          "Launcher and receiver operation",
        ],
      },
      {
        heading: "Inspection pigging",
        items: [
          "Caliper and geometry inspection",
          "Intelligent pigging coordination with specialist tool providers",
          "Gauge plate runs ahead of inspection",
          "Run reports and data hand-over",
        ],
      },
    ],
    technology: [
      "Foam, mandrel, brush and gauge pigs",
      "Caliper / geometry tools",
      "Pig tracking and signalling",
      "Specialist intelligent pigging partners",
    ],
    applications: ["Onshore trunk and flow lines", "Offshore export lines", "Gas and multiphase pipelines"],
    relatedProject: "operational-pigging-programme",
    cta: "discussion",
    confirmed: false,
  },
  {
    slug: "pipeline-commissioning-maintenance",
    title: "Pipeline Commissioning & Maintenance",
    short:
      "Technical services supporting pipeline preparation, commissioning, testing and maintenance.",
    intro:
      "New and repaired pipelines must be proven clean, strong and dry before they carry product. Serviceberry prepares, tests and commissions pipelines and facilities, and supports routine maintenance afterwards.",
    image: img.commissioning,
    icon: "wrench",
    onHome: true,
    scope: [
      {
        heading: "Pre-commissioning",
        items: ["Flushing and cleaning", "Gauging", "Hydrostatic testing", "Dewatering and drying"],
      },
      {
        heading: "Commissioning & maintenance",
        items: [
          "Facility maintenance and commissioning support",
          "Nitrogen purging and leak testing support",
          "Planned maintenance programmes",
        ],
      },
    ],
    technology: ["Test pumps and recorders", "Pigging spreads", "Calibrated instrumentation"],
    applications: ["New pipeline construction", "Repaired or re-routed lines", "Process facilities"],
    relatedProject: "hydrotest-and-commissioning",
    cta: "quotation",
    confirmed: false,
  },
  {
    slug: "asset-process-systems-integrity",
    title: "Asset & Process Systems Integrity",
    short:
      "Inspection, maintenance and specialist solutions for process systems and operating assets.",
    intro:
      "Process systems degrade quietly until they fail loudly. Serviceberry provides inspection, maintenance and specialist integrity solutions that keep operating assets safe, compliant and productive.",
    image: img.assetIntegrity,
    icon: "plant",
    onHome: true,
    scope: [
      {
        heading: "Integrity",
        items: ["Inspection support", "Integrity assessments with specialist partners", "Defect follow-up"],
      },
      {
        heading: "Maintenance",
        items: ["Mechanical maintenance", "Shutdown and turnaround support", "Process equipment cleaning"],
      },
    ],
    technology: ["Specialist inspection partners", "Maintenance crews and tooling"],
    applications: ["Flow stations", "Gas plants", "Production facilities", "Industrial plants"],
    cta: "discussion",
    confirmed: false,
  },
  {
    slug: "production-specialty-chemicals",
    title: "Production & Specialty Chemicals",
    short: "Chemical solutions supporting production operations, treatment and asset performance.",
    intro:
      "The right chemistry protects pipelines and equipment and keeps production flowing. Serviceberry supplies production and specialty chemicals, including the Alpha Descaler range, with technical support on dosing and application.",
    image: img.chemicals,
    icon: "flask",
    onHome: true,
    scope: [
      {
        heading: "Chemical supply",
        items: ["Descalers (Alpha Descaler)", "Corrosion and scale treatment", "Cleaning chemicals"],
      },
      {
        heading: "Application support",
        items: ["Dosing recommendations", "Chemical injection packages", "Performance follow-up"],
      },
    ],
    technology: ["Chemical injection skids", "Partner chemical formulations"],
    applications: ["Production systems", "Water treatment", "Heat exchangers and process equipment"],
    relatedProject: "descaling-campaign",
    cta: "quotation",
    confirmed: false,
  },
  {
    slug: "remote-monitoring-cathodic-protection",
    title: "Remote Monitoring & Cathodic Protection",
    short:
      "Technology-enabled monitoring and protection solutions for pipeline and asset integrity.",
    intro:
      "Long pipelines cannot be watched in person. Serviceberry works with specialist technology partners to bring remote monitoring and cathodic protection solutions that show asset condition in near real time.",
    image: img.monitoring,
    icon: "signal",
    onHome: true,
    scope: [
      {
        heading: "Remote monitoring",
        items: ["Remote monitoring units", "Data access and alarms", "Installation support"],
      },
      {
        heading: "Cathodic protection",
        items: ["CP monitoring", "Survey support", "Maintenance of CP systems"],
      },
    ],
    technology: ["Partner remote monitoring technology", "CP monitoring equipment"],
    applications: ["Buried pipelines", "Storage tanks", "Well heads and remote sites"],
    cta: "discussion",
    confirmed: false,
  },
  {
    slug: "equipment-technical-procurement",
    title: "Equipment & Technical Procurement",
    short: "Equipment supply, sourcing and technical support for oil and gas requirements.",
    intro:
      "Projects stall when the right equipment is not on site. Serviceberry sources equipment from trusted manufacturers and markets selected equipment for sale, with technical support from enquiry to delivery.",
    image: img.procurement,
    icon: "crate",
    onHome: true,
    scope: [
      {
        heading: "Sourcing",
        items: ["Pumps, engines and compressors", "Valves and fittings", "Process equipment and instrumentation"],
      },
      {
        heading: "Support",
        items: ["Technical specification checks", "Logistics coordination", "After-sales support"],
      },
    ],
    technology: ["Manufacturer and supplier network"],
    applications: ["Projects", "Operations and maintenance", "Replacement and spares"],
    cta: "quotation",
    confirmed: false,
  },
  {
    slug: "valve-maintenance-hot-tapping",
    title: "Valve Maintenance, Hot Tapping & Cold Cutting",
    short: "Valve repair and maintenance, with hot tapping and cold cutting for live and dead lines.",
    intro:
      "Valves that cannot seal or move put people and production at risk. Serviceberry repairs and maintains valves and supports hot tapping and cold cutting so tie-ins and repairs can go ahead safely.",
    image: img.valves,
    icon: "valve",
    onHome: false,
    scope: [
      {
        heading: "Valves",
        items: ["Valve repair and maintenance", "Greasing and flushing", "Function testing"],
      },
      {
        heading: "Line intervention",
        items: ["Hot tapping support", "Cold cutting", "Tie-in support"],
      },
    ],
    technology: ["Valve service kits", "Cold cutting tools", "Hot tap equipment (with partners)"],
    applications: ["Pipelines", "Manifolds", "Process facilities"],
    cta: "quotation",
    confirmed: false,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/**
 * Extra photos for each service page, in order: one per scope chapter, then one for the
 * technology band, then the rest for "where it is used". Brochure photos first.
 */
export const serviceGallery: Record<string, string[]> = {
  "pipeline-integrity-pigging": [brochure.crewPigging, brochure.crewIntelligentPig, brochure.pigOnDeck, brochure.yellowPipeline, img.pipeGrass, brochure.coverPipes],
  "pipeline-commissioning-maintenance": [brochure.pipework, img.weldSparks, brochure.coverPipes, brochure.plantDusk, img.pipeBlue, img.structureLadders],
  "asset-process-systems-integrity": [brochure.plantTowers, brochure.valveWorkshop, brochure.rovSurvey, img.structureLadders, img.nightPlant3, brochure.manifoldBlue],
  "production-specialty-chemicals": [brochure.descalerBeforeAfter, brochure.waxBeaker, img.drumsDark, brochure.scaledElbow, img.oilpump, brochure.plantDusk],
  "remote-monitoring-cathodic-protection": [brochure.watchdogUnit, brochure.elecsysNetwork, img.monitoring, brochure.yellowPipeline, img.pipeGrass, img.rigOcean],
  "equipment-technical-procurement": [brochure.hdpeShop, img.machineWhite, img.factoryMachinery, img.tanksSnow, brochure.hdpePipes, img.valveGauge],
  "valve-maintenance-hot-tapping": [brochure.valveHand, brochure.manifoldBlue, img.valveActuator, img.valvesPipes, img.valveSky, brochure.valveWorkshop],
};
