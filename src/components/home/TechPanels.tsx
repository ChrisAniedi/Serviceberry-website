"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { brochure, img } from "@/content/images";

const ease = [0.16, 1, 0.3, 1] as const;

// From the Serviceberry brochure (Sept 2025). TODO(verify): partner names and claims are as
// the brochure states them; management to confirm before launch.
const tech = [
  {
    key: "MTM-G",
    name: "Non-contact integrity survey",
    body: "Magnetic Gradient Tomography reads mechanical stress along non-piggable and hard-to-inspect lines, onshore or subsea by ROV. No shutdown, no excavation, no launcher or receiver needed.",
    points: ["Non-piggable lines", "Subsea by ROV", "No interruption to flow"],
    image: brochure.rovSurvey,
    href: "/services/pipeline-integrity-pigging",
  },
  {
    key: "Elecsys Connect",
    name: "Cathodic protection, watched remotely",
    body: "Remote monitoring units on rectifiers, test stations and critical bonds report to one web and mobile dashboard, with alerts, so fewer field trips are needed to check a long line.",
    points: ["Rectifiers and test stations", "Alerts and reports", "Web and mobile"],
    image: brochure.watchdogUnit,
    href: "/services/remote-monitoring-cathodic-protection",
  },
  {
    key: "Alpha Descaler",
    name: "Descaling without acid",
    body: "A non-toxic, non-corrosive and biodegradable replacement for acid that dissolves scale, rust and water-formed deposits, and rinses off with water. Supplied in Nigeria with Tech Sales Co.",
    points: ["Pipelines and wells", "Heat exchangers and boilers", "Rinses with water"],
    image: brochure.descalerBeforeAfter,
    href: "/services/production-specialty-chemicals",
  },
  {
    key: "Purasolve PWD",
    name: "Wax and asphaltene, dissolved",
    body: "A plant-based, non-flammable solvent that thins paraffin and asphaltene deposits, a safer substitute for benzene, xylene and toluene treatments.",
    points: ["Bio-based", "Non-flammable", "Safe to transport"],
    image: brochure.waxBeaker,
    href: "/services/production-specialty-chemicals",
  },
  {
    key: "HDPE-lined pipe",
    name: "Seawater piping that stops leaking",
    body: "With IRWIN Group we replace corroded carbon-steel seawater pipes with HDPE-lined pipe, prefabricated from 3D measurements taken while the system is still running.",
    points: ["Measured in service", "Made to fit first time", "Resists corrosion and fouling"],
    image: brochure.hdpePipes,
    href: "/request-a-quote?type=Services&subject=HDPE-lined%20seawater%20pipe",
  },
];

/**
 * Specialist technologies as expanding panels: the open one shows its photo and story,
 * the rest stand as slim labelled columns. Hover, focus or click opens one. Stacks on phones.
 */
export function TechPanels() {
  const [open, setOpen] = useState(0);

  return (
    <section data-nav="dark" className="relative isolate overflow-hidden bg-ink text-white">
      {/* a faint photo behind, kept quiet so the panels stay the focus */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image src={img.rigOcean} alt="" fill sizes="100vw" className="object-cover opacity-[0.14] grayscale" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a1630_0%,rgba(10,22,48,0.55)_35%,rgba(10,22,48,0.7)_70%,#0a1630_100%)]" />
      </div>
      <div className="py-24 sm:py-32">
      <div className="container-x w-full">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand-light uppercase">Technologies we bring</p>
            <h2 className="headline mt-4 max-w-[16ch] text-[clamp(2.2rem,4.4vw,3.8rem)]">
              Specialist tools for the <span className="text-brand-light">hard parts of the job.</span>
            </h2>
          </div>
          <p className="max-w-md text-[16px] leading-relaxed text-white/65">
            Inspection, monitoring and chemistry from technology partners, delivered and supported by our crews in Nigeria.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 lg:h-[560px] lg:flex-row">
          {tech.map((t, i) => {
            const on = open === i;
            return (
              <div
                key={t.key}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                className={`group relative min-h-[420px] overflow-hidden rounded-[28px] bg-white/5 ring-1 ring-white/10 transition-[flex-grow] duration-700 ease-out-expo lg:min-h-0 ${on ? "lg:flex-[5]" : "lg:flex-[1]"}`}
              >
                <Image
                  src={t.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className={`object-cover transition-[opacity,transform,filter] duration-1000 ease-out-expo ${on ? "scale-100 opacity-100" : "scale-110 opacity-100 lg:opacity-35 lg:grayscale"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />

                {/* closed label (large screens) */}
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-expanded={on}
                  aria-label={`${t.key}: ${t.name}`}
                  className={`absolute inset-0 hidden flex-col items-center justify-between py-7 transition-opacity duration-500 lg:flex ${on ? "pointer-events-none opacity-0" : "opacity-100"}`}
                >
                  <span className="font-display text-[13px] font-semibold text-white/60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="headline text-[24px] whitespace-nowrap [writing-mode:vertical-rl] rotate-180">{t.key}</span>
                  <span className="grid size-10 place-items-center rounded-full ring-1 ring-white/30">+</span>
                </button>

                {/* open content */}
                <AnimatePresence>
                  {on && (
                    <motion.div
                      key="body"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.7, delay: 0.2, ease }}
                      className="absolute inset-x-3 bottom-3 glass-fade text-lift rounded-[22px] p-6 lg:max-w-[560px] lg:p-7"
                    >
                      <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-brand-light uppercase">{t.key}</p>
                      <h3 className="headline mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.05]">{t.name}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/80">{t.body}</p>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        <ul className="flex flex-wrap gap-2">
                          {t.points.map((p) => (
                            <li key={p} className="rounded-full bg-white/10 px-3 py-1.5 text-[13px] ring-1 ring-white/15">{p}</li>
                          ))}
                        </ul>
                        <Link href={t.href} className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-white hover:text-brand-light">
                          Learn more <ArrowUpRight className="size-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* phones: always open */}
                {!on && (
                  <div className="absolute inset-x-3 bottom-3 glass-fade text-lift rounded-[22px] p-6 lg:hidden">
                    <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-brand-light uppercase">{t.key}</p>
                    <h3 className="headline mt-2 text-[1.6rem] leading-[1.05]">{t.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/80">{t.body}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
            </div>
      </div>
    </section>
  );
}
