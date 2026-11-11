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
    <div ref={ref} className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <motion.ul style={{ x }} className="flex w-max gap-4">
        {[...items, ...items].map((it, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className={`group relative h-[220px] shrink-0 overflow-hidden rounded-[24px] bg-mist sm:h-[270px] ${i % 3 === 1 ? "w-[260px] sm:w-[300px]" : i % 3 === 2 ? "w-[340px] sm:w-[440px]" : "w-[300px] sm:w-[360px]"}`}
          >
            <Image src={it.src} alt={i < items.length ? it.label : ""} fill sizes="440px" className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/55 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="glass-fade text-lift absolute bottom-3 left-3 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white">{it.label}</span>
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
        <div>
        <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">In the field</p>
        <h2 className="headline mt-4 max-w-[18ch] text-[clamp(2.2rem,4.4vw,3.8rem)]">
          Our crews, <span className="text-brand">on your asset.</span>
        </h2>
        </div>
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
