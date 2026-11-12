"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Cog, Cylinder, Droplet, Factory, FlaskConical, Gauge, Wind, Wrench } from "lucide-react";
import { sourcingCategories } from "@/content/equipment";
import { brochure, img } from "@/content/images";

const ease = [0.16, 1, 0.3, 1] as const;

// In the order of `sourcingCategories`.
const art = [
  { icon: Droplet, image: img.machineWhite },
  { icon: Cog, image: img.factoryMachinery },
  { icon: Wind, image: img.procurement },
  { icon: Wrench, image: img.valvesRusty },
  { icon: FlaskConical, image: img.drumsDark },
  { icon: Cylinder, image: brochure.pigOnDeck },
  { icon: Factory, image: img.structureLadders },
  { icon: Gauge, image: img.valveGauge },
];

/** What we source, as photo tiles; each opens a sourcing enquiry for that category. */
export function SourcingTiles() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {sourcingCategories.map((c, i) => {
        const a = art[i % art.length];
        return (
          <motion.div key={c.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -40px 0px" }} transition={{ duration: 0.8, delay: (i % 4) * 0.06, ease }}>
            <Link
              href={`/request-a-quote?type=Equipment%20Sourcing&subject=${encodeURIComponent(c.title)}`}
              className="group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[26px] bg-ink p-5 text-white"
            >
              <Image src={a.image} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="-z-10 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.07]" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070b16]/90 via-[#070b16]/25 to-transparent transition-colors duration-500 group-hover:from-brand-deep/95" />
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-md transition-[rotate,background-color] duration-500 group-hover:-rotate-6 group-hover:bg-white group-hover:text-brand">
                  <a.icon className="size-5" strokeWidth={1.7} />
                </span>
                <span className="font-display text-[13px] font-semibold text-white/70 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <p className="headline text-[24px] leading-[1.05]">{c.title}</p>
                <p className="mt-2 text-[14.5px] leading-snug text-white/75">{c.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-light opacity-0 transition-[opacity,translate] duration-500 group-hover:opacity-100 max-lg:opacity-100">
                  Source this <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
