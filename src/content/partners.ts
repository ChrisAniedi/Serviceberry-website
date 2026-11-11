/**
 * Partner profiles (workbook section 6). TODO(verify): every relationship, territory and role
 * below is a draft and must match a documented agreement before launch.
 * Logos need permission; until then a text wordmark shows.
 *
 * Never describe a partner as exclusive or as an authorised representative unless documented.
 */
export type Partner = {
  slug: string;
  name: string;
  logo?: string; // path in public/images/partners/ once permission is given
  technology: string;
  relationship: string;
  territory: string;
  role: string;
  website?: string;
  verified: boolean;
};

export const partners: Partner[] = [
  {
    slug: "elecsys",
    name: "Elecsys",
    technology: "Remote monitoring and cathodic protection monitoring technology.",
    relationship: "Technology partner",
    territory: "Nigeria",
    role: "Local support and technical interface",
    verified: false,
  },
  {
    slug: "wipa-chemicals",
    name: "WIPA Chemicals",
    technology: "Production and specialty chemicals.",
    relationship: "Technology partner",
    territory: "Nigeria",
    role: "Local supply and support",
    verified: false,
  },
  {
    slug: "igsat",
    name: "IGSAT",
    technology: "Specialist technology for asset integrity.",
    relationship: "Technology partner",
    territory: "Nigeria",
    role: "Local supply and support",
    verified: false,
  },
];
