import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Socials } from "@/components/ui/Socials";
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

// The words in the band along the bottom of the footer.
const band = ["Serviceberry", "Pigging", "Commissioning", "Integrity", "Chemicals", "Monitoring", "Equipment"];

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] font-semibold text-ink">{children}</p>;
}

/**
 * Light footer: the logo, then four link columns, socials and the Academy link,
 * the legal line, and a slow band of large faint words cut off at the bottom. One hairline between each band; two text tones.
 */
export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-paper text-ink">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line py-10">
          <Logo full />
          <p className="text-[15px] text-steel">{site.tagline}, from Port Harcourt.</p>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Heading>Services</Heading>
            <ul className="mt-4 space-y-2.5 text-[15px] text-steel">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="transition-colors hover:text-brand">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Heading>Company</Heading>
            <ul className="mt-4 space-y-2.5 text-[15px] text-steel">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-brand">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Heading>Visit</Heading>
            <address className="mt-4 text-[15px] leading-relaxed text-steel not-italic">
              {site.address.lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            <Heading>
              <span className="mt-7 block">Call</span>
            </Heading>
            <ul className="mt-3 space-y-1.5 text-[15px] text-steel">
              {site.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="transition-colors hover:text-brand">{p}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Heading>Follow us</Heading>
            <Socials className="mt-4" tone="light" />
            <a
              href={site.academyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex items-center justify-between gap-4 rounded-[20px] bg-white p-5 ring-1 ring-line transition-shadow hover:shadow-[0_16px_30px_-20px_rgba(0,49,152,0.4)]"
            >
              <span>
                <span className="block text-[15px] font-semibold">Serviceberry Academy</span>
                <span className="mt-0.5 block text-[13.5px] text-steel">Online technical training</span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-deep text-white transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-5" />
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-line py-6 text-[13.5px] text-steel sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Respect. Integrity. Passion.</p>
        </div>
      </div>
      {/* a slow band of words along the bottom, cut through the middle so it adds no scroll of its own */}
      <div aria-hidden className="relative h-[clamp(2.6rem,8.4vw,8.6rem)] overflow-hidden select-none">
        <div className="flex w-max animate-marquee pt-[0.6vw] [--marquee-duration:70s]">
          {[0, 1].map((k) => (
            <p key={k} className="headline flex shrink-0 items-center whitespace-nowrap text-[clamp(4rem,14vw,14.5rem)] leading-[0.8] text-ink/[0.06]">
              {band.map((w) => (
                <span key={w} className="flex items-center">
                  <span className={w === "Serviceberry" ? "text-brand/[0.13]" : undefined}>{w}</span>
                  <span className="mx-[0.28em] inline-block size-[0.14em] rounded-full bg-berry/35" />
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
