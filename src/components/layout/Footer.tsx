import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";
import { services } from "@/content/services";

const company = [
  { label: "About us", href: "/about" },
  { label: "Equipment", href: "/equipment" },
  { label: "Projects", href: "/projects" },
  { label: "Partners", href: "/partners" },
  { label: "QHSE", href: "/qhse" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-brand-deep text-white">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.1fr_2fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/65">
            Engineering, pipeline, asset integrity, chemical and equipment solutions for oil and gas, energy and industry.
          </p>
          <address className="mt-6 text-[15px] leading-relaxed text-white/80 not-italic">
            {site.address.lines.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-berry-light uppercase">Services</p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-white/80">
              {services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-berry-light uppercase">Company</p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-white/80">
              {company.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-berry-light uppercase">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-white/80">
              {site.phones.map((p) => <li key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-white">{p}</a></li>)}
              <li><a href={`mailto:${site.email}`} className="break-all hover:text-white">{site.email}</a></li>
              {site.linkedin && <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">LinkedIn <ArrowUpRight className="size-3.5" /></a></li>}
              <li className="pt-3">
                <a href={site.academyUrl} target="_blank" rel="noopener noreferrer" className="chamfer inline-flex items-center gap-2 bg-white/10 px-4 py-2.5 font-display text-[15px] font-semibold text-white hover:bg-white/20">
                  Serviceberry Academy <ArrowUpRight className="size-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-[13.5px] text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Port Harcourt · Rivers State · Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
