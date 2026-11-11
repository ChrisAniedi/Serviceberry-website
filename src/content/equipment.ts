import { img } from "./images";

/**
 * Equipment for sale. The workbook's PUBLISHING CONTROL applies: these four are candidates
 * only. Each item stays `verified: false` (and shows an "Illustrative" tag) until
 * ownership / authority to advertise, availability, condition and specifications are confirmed.
 * Replace every "[Confirm]" with verified information.
 */
export type EquipmentStatus = "Available" | "Under offer" | "Sold" | "Sourcing on request";

export type EquipmentItem = {
  slug: string;
  title: string;
  category: string;
  status: EquipmentStatus;
  condition: string;
  manufacturer: string;
  year: string;
  location: string;
  specs: { label: string; value: string }[];
  accessories: string[];
  photos: string[];
  documents: { label: string; href: string }[];
  summary: string;
  verified: boolean;
};

// TODO(verify): "On request" marks a value still to be confirmed and filled in.
const C = "On request";

export const equipmentForSale: EquipmentItem[] = [
  {
    slug: "high-pressure-chemical-injection-pump-package",
    title: "High-Pressure Chemical Injection Pump Package",
    category: "Chemical injection",
    status: "Available",
    condition: C,
    manufacturer: C,
    year: C,
    location: "Port Harcourt, Nigeria",
    summary:
      "Skid-mounted chemical injection pump building for continuous high-pressure dosing in production systems.",
    specs: [
      { label: "Pump / driver", value: C },
      { label: "Discharge pressure", value: C },
      { label: "Flow rate", value: C },
      { label: "Dimensions", value: C },
    ],
    accessories: [C],
    photos: [img.machineWhite, img.valveGauge, img.factoryMachinery],
    documents: [],
    verified: false,
  },
  {
    slug: "coalescing-chiller-skid",
    title: "Coalescing Chiller Skid",
    category: "Process equipment",
    status: "Available",
    condition: C,
    manufacturer: C,
    year: C,
    location: "Port Harcourt, Nigeria",
    summary: "Packaged chiller and coalescer skid for gas conditioning and liquid separation duties.",
    specs: [
      { label: "Capacity", value: C },
      { label: "Design pressure", value: C },
      { label: "Power", value: C },
      { label: "Dimensions", value: C },
    ],
    accessories: [C],
    photos: [img.structureLadders, img.valvesPipes, img.pipeBlue],
    documents: [],
    verified: false,
  },
  {
    slug: "propak-refrigeration-skids",
    title: "PROPAK Refrigeration Skids",
    category: "Process equipment",
    status: "Available",
    condition: C,
    manufacturer: "PROPAK",
    year: C,
    location: "Port Harcourt, Nigeria",
    summary: "Refrigeration skids for gas processing and dew-point control.",
    specs: [
      { label: "Model", value: C },
      { label: "Refrigeration duty", value: C },
      { label: "Driver", value: C },
      { label: "Dimensions", value: C },
    ],
    accessories: [C],
    photos: [img.tanksSnow, img.valveActuator, img.nightPlant3],
    documents: [],
    verified: false,
  },
  {
    slug: "viking-pumps",
    title: "Viking Pumps",
    category: "Pumps",
    status: "Available",
    condition: C,
    manufacturer: "Viking Pump",
    year: C,
    location: "Port Harcourt, Nigeria",
    summary: "Positive displacement pumps for viscous fluids, chemicals and transfer duties.",
    specs: [
      { label: "Model", value: C },
      { label: "Capacity", value: C },
      { label: "Pressure", value: C },
      { label: "Quantity available", value: C },
    ],
    accessories: [C],
    photos: [img.factoryMachinery, img.valvesRusty, img.machineWhite],
    documents: [],
    verified: false,
  },
];

/** Categories Serviceberry can source. TODO(verify): keep only categories it can genuinely source. */
export const sourcingCategories = [
  { title: "Pumps", body: "Centrifugal, positive displacement and high-pressure pumps." },
  { title: "Engines", body: "Diesel and gas engines for drivers and power." },
  { title: "Compressors", body: "Air and gas compressors for process and utility service." },
  { title: "Valves & fittings", body: "Ball, gate, check and control valves, flanges and fittings." },
  { title: "Chemical injection packages", body: "Skids, pumps, tanks and controls." },
  { title: "Pigging equipment", body: "Pigs, launchers, receivers, signallers and spares." },
  { title: "Process equipment", body: "Separators, heat exchangers, skids and vessels." },
  { title: "Instrumentation", body: "Gauges, transmitters, flow meters and analysers." },
];

export const getEquipment = (slug: string) => equipmentForSale.find((e) => e.slug === slug);
