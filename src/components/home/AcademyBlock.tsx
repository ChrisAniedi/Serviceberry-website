"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Briefcase, GraduationCap, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { img } from "@/content/images";
import { site } from "@/content/site";

const tracks = [
  { icon: Wrench, t: "Technical", d: "Pipelines, process systems and maintenance" },
  { icon: GraduationCap, t: "Professional", d: "Safety culture, projects and careers" },
  { icon: Briefcase, t: "Business", d: "Commercial and management skills" },
];

/** Academy on a calm light ground: text and tracks left, a framed photo right. Main button leaves for the LMS. */
export function AcademyBlock({ id = "kp-6" }: { id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  return (
    <section ref={ref} id={id} className="scroll-mt-20 overflow-hidden bg-mist py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">Serviceberry Academy</p>
            <h2 className="headline mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)] text-ink">
              Building technical competence. <span className="text-brand">Developing industry professionals.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-steel">
              Professional, business and technical learning on Serviceberry Academy, our online learning platform.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {tracks.map((t, i) => (
              <Reveal key={t.t} delay={i * 0.07}>
                <li className="group h-full rounded-[22px] bg-white p-5 ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_20px_40px_-24px_rgba(10,42,87,0.35)]">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand transition-transform duration-500 group-hover:-rotate-6">
                    <t.icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <p className="headline mt-5 text-[21px] text-ink">{t.t}</p>
                  <p className="mt-1.5 text-[14px] leading-snug text-steel">{t.d}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-9 flex flex-wrap gap-3">
            <Button href={site.academyUrl} external>Visit Serviceberry Academy</Button>
            <Button href="/academy" variant="line">About the Academy</Button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-ink lg:aspect-[5/6]">
            <motion.div className="absolute inset-[-9%_0]" style={{ y }}>
              <Image src={img.workerHardhat} alt="Engineer in a hard hat" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>
          <a
            href={site.academyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group absolute right-5 bottom-5 left-5 flex items-center justify-between gap-3 rounded-[22px] bg-white/15 px-5 py-4 text-white ring-1 ring-white/30 backdrop-blur-xl sm:right-auto"
          >
            <span>
              <span className="block text-[12px] font-medium text-white/80">Learn online</span>
              <span className="block text-[15px] font-medium">academy.serviceberryglobal.com</span>
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="size-5" />
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
