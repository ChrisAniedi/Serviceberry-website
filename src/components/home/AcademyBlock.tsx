"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { img } from "@/content/images";
import { site } from "@/content/site";

const tracks = [
  { t: "Technical", d: "Pipelines, process systems, maintenance" },
  { t: "Professional", d: "Safety culture, projects, careers" },
  { t: "Business", d: "Commercial and management skills" },
];

/** Hi-vis Academy block. Main button leaves for academy.serviceberryglobal.com. */
export function AcademyBlock({ id = "kp-6" }: { id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} id={id} className="scroll-mt-20 overflow-hidden bg-berry">
      <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
        <div className="py-24 sm:py-32">
          <Reveal>
            <p className="flex items-center gap-3 font-display text-[12px] font-semibold tracking-[0.12em] text-white/80 uppercase">
              <span className="inline-flex h-6 items-center rounded-full bg-ink px-2.5 text-[12px] text-berry-light">KP 6+000</span> Serviceberry Academy
            </p>
            <h2 className="headline mt-6 text-[clamp(2.35rem,5.04vw,4.54rem)] text-white">Building technical competence.<br />Developing industry professionals.</h2>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/85">
              Explore professional, business and technical learning through Serviceberry Academy, our online learning platform.
            </p>
          </Reveal>
          <ul className="mt-8 border-t border-white/25">
            {tracks.map((t, i) => (
              <Reveal key={t.t} delay={i * 0.06}>
                <li className="flex items-center justify-between gap-4 border-b border-white/25 py-4">
                  <span className="headline text-[25px] text-white">{t.t}</span>
                  <span className="text-right text-[15px] text-white/75">{t.d}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-9 flex flex-wrap gap-3">
            <Button href={site.academyUrl} external variant="white">Visit Serviceberry Academy</Button>
            <Button href="/academy" variant="glass">About the Academy</Button>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative pb-16 lg:bleed-r lg:pb-0">
          <div className="relative aspect-[4/5] h-full overflow-hidden bg-ink lg:aspect-auto lg:min-h-[720px]">
            <motion.div className="absolute inset-[-9%_0]" style={{ y }}>
              <Image src={img.workerHardhat} alt="Engineer in a hard hat" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </motion.div>
          </div>
          <a href={site.academyUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-10 left-5 flex items-center gap-3 rounded-2xl bg-ink/70 px-5 py-4 text-white ring-1 ring-white/20 backdrop-blur-xl shadow-2xl lg:bottom-12 lg:left-[-24px]">
            <span>
              <span className="block font-display text-[11px] font-semibold tracking-[0.12em] text-berry-light uppercase">Learn online</span>
              <span className="block text-[15px]">academy.serviceberryglobal.com</span>
            </span>
            <ArrowUpRight className="size-5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
