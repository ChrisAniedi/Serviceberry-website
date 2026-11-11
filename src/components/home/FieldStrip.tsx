"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { brochure } from "@/content/images";

const rowA = [
  { src: brochure.crewPigging, label: "Pigging crew on deck" },
  { src: brochure.pigOnDeck, label: "Intelligent pig, ready to launch" },
  { src: brochure.coverPipes, label: "Process pipework" },
  { src: brochure.hdpeShop, label: "HDPE-lined spools" },
  { src: brochure.plantDusk, label: "Commissioning at dusk" },
  { src: brochure.scaledElbow, label: "Scale we remove" },
];
const rowB = [
  { src: brochure.rovSurvey, label: "Subsea survey by ROV" },
  { src: brochure.manifoldBlue, label: "Valve manifold" },
  { src: brochure.crewIntelligentPig, label: "Preparing an inspection run" },
  { src: brochure.yellowPipeline, label: "Above-ground line" },
  { src: brochure.pipework, label: "Plant piping" },
  { src: brochure.elecsysNetwork, label: "Remote CP network" },
];

function Row({ items, from, to }: { items: typeof rowA; from: string; to: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [from, to]);
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.ul style={{ x }} className="flex w-max gap-4">
        {[...items, ...items].map((it, i) => (
          <li key={i} aria-hidden={i >= items.length} className="group relative h-[220px] w-[300px] shrink-0 overflow-hidden rounded-[22px] bg-mist sm:h-[260px] sm:w-[360px]">
            <Image src={it.src} alt={i < items.length ? it.label : ""} fill sizes="360px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1.5 text-[13px] font-medium text-ink backdrop-blur-md">{it.label}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

/** Two rows of Serviceberry's own field photos that slide in opposite directions as you scroll. */
export function FieldStrip() {
  return (
    <section aria-label="In the field" className="overflow-hidden bg-white py-24 sm:py-28">
      <div className="container-x mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className="headline max-w-[18ch] text-[clamp(2.2rem,4.4vw,3.8rem)]">
          In the field, <span className="text-brand">on your asset.</span>
        </h2>
        <p className="max-w-md text-[16px] leading-relaxed text-steel">
          Our local equipment and experienced team, working alongside dedicated technology partners.
        </p>
      </div>
      <div className="space-y-4">
        <Row items={rowA} from="0%" to="-30%" />
        <Row items={rowB} from="-30%" to="0%" />
      </div>
    </section>
  );
}
