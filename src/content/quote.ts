import { equipmentForSale, sourcingCategories } from "./equipment";
import { services } from "./services";

/**
 * What can be requested, shared by the quote page and the "Start your quote" panels.
 * `type` is the enquiry type the contact API expects.
 */
export const quoteNeeds = [
  { id: "services", type: "Services", title: "A service", body: "Pigging, commissioning, integrity, chemicals, monitoring, valves.", pickLabel: "Which services?", picks: services.map((s) => s.title) },
  { id: "source", type: "Equipment Sourcing", title: "Equipment sourced or rented", body: "Tell us the duty; we find, check and deliver it.", pickLabel: "What kind of equipment?", picks: sourcingCategories.map((c) => c.title) },
  { id: "sale", type: "Equipment for Sale", title: "Equipment we have", body: "Packages and skids available through Serviceberry.", pickLabel: "Which items?", picks: equipmentForSale.map((e) => e.title) },
  { id: "project", type: "Project Collaboration", title: "A project partner", body: "Subcontract scopes, bids and technology partnerships.", pickLabel: "What kind of collaboration?", picks: ["EPC subcontract scope", "Bid or tender support", "Technology partnership", "Long-term service contract"] },
  { id: "academy", type: "Academy", title: "Training", body: "Technical, professional and business courses for your team.", pickLabel: "Which tracks?", picks: ["Technical", "Professional", "Business"] },
  { id: "other", type: "Other", title: "Something else", body: "A question, documents, or anything not listed.", pickLabel: "", picks: [] as string[] },
];

export type QuoteNeed = (typeof quoteNeeds)[number];

export const quoteWhens = ["As soon as possible", "Within 2 weeks", "Within 1–3 months", "Planning or budgeting"];
export const quoteReaches = ["Email", "Phone call", "WhatsApp"] as const;

/** Words for the outlined band under the quote panels. */
export const quoteBand = ["Pigging", "Commissioning", "Integrity", "Descaling", "Cathodic protection", "Hot tapping", "Equipment"];
