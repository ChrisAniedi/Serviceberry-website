"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** The two ends of the run. Each pair is a job Serviceberry carries from start to finish. */
export const runs = [
  { from: "launch", to: "receiver", a: "Launcher", b: "Receiver" },
  { from: "survey", to: "sign-off", a: "Survey", b: "Sign-off" },
  { from: "wellhead", to: "export line", a: "Wellhead", b: "Export line" },
  { from: "first run", to: "final report", a: "First run", b: "Final report" },
  { from: "spool", to: "start-up", a: "Spool", b: "Start-up" },
] as const;

const EVERY = 3400;

/** Rotates through `runs`; calls back so the arc labels can follow. Static with reduced motion. */
export function useRun() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % runs.length), i === 0 ? EVERY + 1800 : EVERY);
    return () => clearTimeout(t);
  }, [i, reduce]);
  return i;
}

function Swap({ text, k, className = "" }: { text: string; k: string; className?: string }) {
  return (
    <motion.span layout transition={{ layout: { duration: 0.55, ease } }} className={`relative inline-flex overflow-hidden pb-[0.08em] ${className}`}>
      {/* "wait": the old words leave first, the line then settles to the new width, then the
          new words rise in, so two words never share the slot */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={k}
          className="relative inline-block whitespace-nowrap"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, delay: 0.12, ease } }}
          exit={{ y: "-90%", opacity: 0, filter: "blur(6px)", transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }}
        >
          {text}
          <motion.span
            aria-hidden
            className="absolute inset-x-0 bottom-[0.02em] h-[0.05em] origin-left rounded-full bg-[#ffc65c]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
          />
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

function Fixed({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.span layout transition={{ layout: { duration: 0.55, ease } }} className="inline-flex overflow-hidden pb-[0.08em]">
      <motion.span className="inline-block" initial={{ y: "110%", filter: "blur(8px)" }} animate={{ y: "0%", filter: "blur(0px)" }} transition={{ duration: 1.1, delay, ease }}>
        {children}
      </motion.span>
    </motion.span>
  );
}

/**
 * "Pipeline integrity, from launch to receiver." The first line stays; the two ends of the
 * run change together ("survey to sign-off", "wellhead to export line"…). Decorative: the
 * page's real h1 sits under it.
 */
export function HeroHeadline({ index }: { index: number }) {
  const r = runs[index];
  return (
    <p aria-hidden className="headline mt-6 text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[0.98] font-[350] tracking-[-0.045em]">
      <span className="flex flex-wrap justify-center gap-x-[0.24em]">
        <Fixed delay={0.45}>Pipeline</Fixed>
        <Fixed delay={0.52}>integrity,</Fixed>
      </span>
      <LayoutGroup>
        <span className="flex min-h-[2em] flex-wrap content-start justify-center gap-x-[0.24em] lg:min-h-0 lg:flex-nowrap">
          <Fixed delay={0.59}>from</Fixed>
          <motion.span layout className="inline-flex" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.66, ease, layout: { duration: 0.55, ease } }}>
            <Swap text={r.from} k={`f-${index}`} className="text-white" />
          </motion.span>
          <Fixed delay={0.73}>to</Fixed>
          <motion.span layout className="inline-flex" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.8, ease, layout: { duration: 0.55, ease } }}>
            <Swap text={`${r.to}.`} k={`t-${index}`} className="text-white" />
          </motion.span>
        </span>
      </LayoutGroup>
    </p>
  );
}
