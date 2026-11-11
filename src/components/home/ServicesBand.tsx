"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { brochure } from "@/content/images";

const ease = [0.16, 1, 0.3, 1] as const;

// Small photos from the brochure, scattered up both sides. x/y are % of the section.
const floaters = [
  { src: brochure.crewPigging, x: "6%", y: "14%", w: 150, h: 180, r: -6, depth: 70, delay: "0s" },
  { src: brochure.plantDusk, x: "13%", y: "62%", w: 120, h: 120, r: 4, depth: 40, delay: "1.4s" },
  { src: brochure.descalerBeforeAfter, x: "2%", y: "46%", w: 96, h: 72, r: -3, depth: 100, delay: "2.6s" },
  { src: brochure.pigOnDeck, x: "82%", y: "10%", w: 128, h: 150, r: 5, depth: 55, delay: "0.8s" },
  { src: brochure.hdpePipes, x: "88%", y: "52%", w: 140, h: 104, r: -4, depth: 85, delay: "2s" },
  { src: brochure.watchdogUnit, x: "79%", y: "72%", w: 92, h: 100, r: 3, depth: 30, delay: "3.2s" },
];

function Floater({ f, progress }: { f: (typeof floaters)[number]; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], reduce ? [0, 0] : [f.depth, -f.depth]);
  return (
    <motion.div style={{ y, left: f.x, top: f.y, width: f.w, height: f.h }} className="absolute">
      <div
        className="anim-float relative h-full w-full overflow-hidden rounded-[18px] shadow-[0_24px_40px_-24px_rgba(10,22,48,0.55)] ring-4 ring-white"
        style={{ rotate: `${f.r}deg`, animationDelay: f.delay }}
      >
        <Image src={f.src} alt="" fill sizes="160px" className="object-cover" />
      </div>
    </motion.div>
  );
}

/**
 * Under the hero: a short, centred introduction in the brochure's own words, with small
 * photos from the field floating up both sides (large screens). The second headline line
 * brightens as it scrolls into view.
 */
export function ServicesBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lift = useTransform(scrollYProgress, [0.15, 0.45], reduce ? [1, 1] : [0.25, 1]);

  return (
    <section ref={ref} aria-label="About Serviceberry" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
        {floaters.map((f) => (
          <Floater key={f.src} f={f} progress={scrollYProgress} />
        ))}
      </div>

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto max-w-[900px] text-center"
        >
          <h2 className="headline text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.04]">
            Experienced professionals.
            <br />
            <motion.span style={{ opacity: lift }} className="text-brand">
              Required results.
            </motion.span>
          </h2>
          <p className="mx-auto mt-7 max-w-[620px] text-[17px] leading-[1.75] text-steel">
            Serviceberry Global is a Port Harcourt-based provider of process and pipeline services to the oil, gas, energy
            and construction industries. We bring <b className="font-semibold text-ink">operational and intelligent pigging</b>,{" "}
            <b className="font-semibold text-ink">commissioning</b>, <b className="font-semibold text-ink">chemical cleaning and supply</b> and{" "}
            <b className="font-semibold text-ink">cathodic protection monitoring</b> under one team, with properly engineered work and a clear
            report on every job.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/services" variant="brand">Explore our services</Button>
            <Button href="/about" variant="line">About us</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
