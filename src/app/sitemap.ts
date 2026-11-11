import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { equipmentForSale } from "@/content/equipment";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/equipment", "/projects", "/partners", "/qhse", "/careers", "/academy", "/request-a-quote", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, priority: 0.7 })),
    ...equipmentForSale.map((e) => ({ url: `${site.url}/equipment/${e.slug}`, priority: 0.6 })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, priority: 0.6 })),
  ];
}
