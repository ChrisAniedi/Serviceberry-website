"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { brochure } from "@/content/images";

const statement =
  "We plan, run and report the work that keeps your lines *clean, inspectable and flowing:* pigging, commissioning, chemical cleaning, integrity surveys and remote monitoring, with our own crews and specialist partners.";

// The service list from the front of the Serviceberry brochure.
const tags = [
  { label: "Operational pigging", href: "/services/pipeline-integrity-pigging" },
  { label: "Intelligent pigging", href: "/services/pipeline-integrity-pigging" },
  { label: "Integrity assessment, piggable and unpiggable", href: "/services/asset-process-systems-integrity" },
  { label: "Commissioning and pumping", href: "/services/pipeline-commissioning-maintenance" },
  { label: "Descaling and dewaxing", href: "/services/production-specialty-chemicals" },
  { label: "Flow assurance chemicals", href: "/services/production-specialty-chemicals" },
  { label: "HDPE-lined seawater pipe", href: "/request-a-quote?type=Services&subject=HDPE-lined%20seawater%20pipe" },
  { label: "CP remote monitoring", href: "/services/remote-monitoring-cathodic-protection" },
];

function Word({ word, range, progress, accent }: { word: string; range: [number, number]; progress: MotionValue<number>; accent: boolean }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block ${accent ? "text-brand" : ""}`}>
      {word}&nbsp;
    </motion.span>
  );
}

/**
 * The line under the hero: one statement whose words brighten from faint to solid as it
 * scrolls through the screen, then the brochure's service list fading in as tags.
 */
export function ServicesBand() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: drift } = useScroll({ target: section, offset: ["start end", "end start"] });
  const upA = useTransform(drift, [0, 1], reduce ? [0, 0] : [60, -60]);
  const upB = useTransform(drift, [0, 1], reduce ? [0, 0] : [120, -100]);

  let accent = false;
  const words = statement.split(" ").map((raw) => {
    const startsAccent = raw.startsWith("*");
    const endsAccent = raw.endsWith("*") || raw.endsWith("*:");
    if (startsAccent) accent = true;
    const w = { text: raw.replace(/\*/g, ""), accent };
    if (endsAccent) accent = false;
    return w;
  });

  return (
    <section ref={section} aria-label="What we do" className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center">
        <div>
        <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">What we do</p>
        <p ref={ref} className="headline mt-6 max-w-[30ch] text-[clamp(1.9rem,3.6vw,3.3rem)] leading-[1.14] tracking-[-0.03em] text-ink">
          <span className="sr-only">{statement.replace(/\*/g, "")}</span>
          <span aria-hidden>
            {words.map((w, i) => (
              <Word key={i} word={w.text} accent={w.accent} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 3) / words.length)]} />
            ))}
          </span>
        </p>

        <ul className="mt-12 flex max-w-5xl flex-wrap gap-2">
          {tags.map((t, i) => (
            <motion.li
              key={t.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={t.href} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-mist px-4 text-[14.5px] text-ink ring-1 ring-line transition-colors hover:bg-brand hover:text-white hover:ring-brand">
                <span className="size-1.5 rounded-full bg-berry" /> {t.label}
              </Link>
            </motion.li>
          ))}
        </ul>
        </div>

        {/* Serviceberry's own crews, from the brochure */}
        <div aria-hidden className="relative hidden h-[520px] lg:block">
          <motion.div style={{ y: upA }} className="absolute top-0 right-0 h-[340px] w-[300px] -rotate-2 overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(10,22,48,0.5)]">
            <Image src={brochure.crewPigging} alt="" fill sizes="300px" className="object-cover" />
          </motion.div>
          <motion.div style={{ y: upB }} className="absolute bottom-0 left-0 h-[250px] w-[330px] rotate-2 overflow-hidden rounded-[28px] ring-8 ring-white shadow-[0_30px_60px_-30px_rgba(10,22,48,0.5)]">
            <Image src={brochure.crewIntelligentPig} alt="" fill sizes="330px" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1.5 text-[12.5px] font-medium text-ink backdrop-blur-md">Our crew on an inspection run</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
