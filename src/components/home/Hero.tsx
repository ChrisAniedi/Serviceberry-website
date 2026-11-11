"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { img } from "@/content/images";
import { partners } from "@/content/partners";
import { site } from "@/content/site";
import { HeroArc } from "./HeroArc";
import { HeroScene } from "./HeroScene";
import { HeroCrew } from "./HeroCrew";
import { HeroTrace } from "./HeroTrace";

const ease = [0.16, 1, 0.3, 1] as const;
// headline words, with a running index for the stagger
const lines = [["Pipeline", "integrity,"], ["from", "launch", "to", "receiver."]].map((ln, li, all) =>
  ln.map((word, wi) => ({ word, n: all.slice(0, li).reduce((a, l) => a + l.length, 0) + wi })),
);
const cols = "lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)_minmax(0,1fr)]";

/**
 * Edge-to-edge opener on a visible three-column grid. A dusk photo of an offshore platform
 * fills the top and fades to navy; the headline sits centred; side cards show what we
 * read and who runs the work; the pig-run arc carries the call to action. The grid runs on
 * into the About row underneath.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const sideY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);

  return (
    <section ref={ref} id="kp-0" className="relative isolate overflow-hidden bg-ink text-white">
      {/* photo, graded into the navy below */}
      <motion.div className="absolute inset-x-0 top-0 -z-10 h-[max(100svh,760px)]" style={{ y: photoY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: reduce ? 1 : 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease }}
        >
          <HeroScene />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,14,4,0.55)_0%,rgba(24,14,4,0.12)_28%,rgba(24,14,4,0.05)_50%,rgba(16,16,20,0.55)_78%,#0c1a2b_100%)]" />
      </motion.div>

      {/* row 1 */}
      <div className={`grid min-h-[max(calc(100svh-64px),700px)] pt-[74px] ${cols}`}>
        <div className="hidden items-center justify-center px-8 lg:flex">
          <motion.div style={{ y: sideY }} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, delay: 1, ease }} className="flex w-full justify-center">
            <HeroTrace />
          </motion.div>
        </div>

        <div className="relative flex flex-col items-center border-white/15 px-5 pt-[7vh] text-center lg:border-x">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="font-display text-[12px] font-semibold tracking-[0.16em] text-white/75 uppercase"
          >
            KP 0+000 · Port Harcourt, Nigeria
          </motion.p>
          <p aria-hidden className="headline mt-6 text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[0.98] font-[350] tracking-[-0.045em]">
            {lines.map((ln, li) => (
              <span key={li} className="block">
                {ln.map(({ word, n }) => (
                  <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%", filter: "blur(8px)" }}
                      animate={{ y: "0%", filter: "blur(0px)" }}
                      transition={{ duration: 1.1, delay: 0.45 + n * 0.07, ease }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-white/80 sm:text-[17px]"
          >
            Powering energy and industry with innovative engineering and technical solutions: pigging, commissioning, process
            chemicals and equipment.
          </motion.h1>

          {/* arc + call to action, sitting on the row line */}
          <div className="relative mt-auto w-full pt-12">
            <HeroArc />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.9, ease }}
              className="relative z-10 -mb-6 flex justify-center gap-3"
            >
              <Button href="/contact?type=Services" variant="hivis">Start a job</Button>
              <Button href="/services" variant="line-light" className="!bg-ink/60">Our services</Button>
            </motion.div>
          </div>
        </div>

        <div className="hidden items-center justify-center px-8 lg:flex">
          <motion.div style={{ y: sideY }} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, delay: 1.15, ease }} className="flex w-full justify-center">
            <HeroCrew />
          </motion.div>
        </div>
      </div>

      {/* row 2: about, on the same grid */}
      <div className={`grid border-t border-white/15 ${cols}`}>
        <div className="order-2 flex flex-col items-center justify-center gap-4 border-t border-white/15 px-8 py-12 text-center lg:order-none lg:border-t-0 lg:py-20">
          <div className="flex -space-x-3">
            {[img.engHardhat, img.workerHardhat, img.engTool].map((s) => (
              <span key={s} className="relative size-14 overflow-hidden rounded-full ring-2 ring-ink">
                <Image src={s} alt="" fill sizes="56px" className="object-cover" />
              </span>
            ))}
          </div>
          <p className="max-w-[220px] text-[15px] leading-snug text-white/80">Training the crews behind the work</p>
          <a href={site.academyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-[14px] font-medium text-berry-light hover:underline">
            Serviceberry Academy <ArrowUpRight className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className="relative overflow-hidden border-white/15 px-5 pt-24 pb-16 text-center lg:border-x lg:pt-28 lg:pb-24">
          <svg aria-hidden viewBox="0 0 1000 500" preserveAspectRatio="xMidYMin slice" className="absolute inset-0 h-full w-full">
            <motion.path
              d="M0 500 C0 220 230 0 500 0 C770 0 1000 220 1000 500"
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease }}
            />
          </svg>
          <p className="relative font-display text-[12px] font-semibold tracking-[0.16em] text-white/55 uppercase">About</p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="relative mx-auto mt-6 max-w-[760px] font-display text-[clamp(1.7rem,3.2vw,2.9rem)] leading-[1.12] font-[350] tracking-[-0.03em] text-balance"
          >
            One accountable team for pipeline, process and equipment work, with specialist partners where the job needs them.
          </motion.p>
          <Link href="/about" className="group relative mt-8 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-white/85 hover:text-white">
            About Serviceberry <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="order-3 flex flex-col items-center justify-center gap-3 border-t border-white/15 px-8 py-12 text-center lg:border-t-0 lg:py-20">
          <p className="max-w-[200px] text-[15px] leading-snug text-white/80">Working with technology partners</p>
          <span aria-hidden className="text-white/40">×</span>
          <ul className="space-y-1">
            {partners.map((p) => (
              <li key={p.slug} className="font-display text-[22px] font-semibold tracking-[-0.02em]">{p.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
