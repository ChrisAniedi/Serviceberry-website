"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

/** Rotates through `runs`; the arc labels follow the same index. Static with reduced motion. */
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

/**
 * A slot for one changing word. It measures the incoming word and eases its own width to
 * fit, while the old word rises out and the new one rises in. Both are clipped by the slot,
 * so a longer outgoing word can never run over its neighbours.
 */
function Swap({ text }: { text: string }) {
  const measure = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();

  useLayoutEffect(() => {
    const m = measure.current;
    if (!m) return;
    const set = () => setWidth(m.offsetWidth);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(m);
    return () => ro.disconnect();
  }, [text]);

  return (
    <span
      className="relative inline-block overflow-hidden pb-[0.08em] align-bottom text-[#ffd79a]"
      style={{ width, transition: "width 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {/* sizes the slot (height always; width before the first measurement) */}
      <span className="invisible whitespace-nowrap">{text}</span>
      {/* measures the incoming word's natural width */}
      <span ref={measure} aria-hidden className="invisible absolute top-0 left-0 whitespace-nowrap">
        {text}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={text}
          className="absolute top-0 left-0 whitespace-nowrap"
          initial={{ y: "105%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-105%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.75, ease }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Rise({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span className="inline-block" initial={{ y: "110%", filter: "blur(8px)" }} animate={{ y: "0%", filter: "blur(0px)" }} transition={{ duration: 1.1, delay, ease }}>
        {children}
      </motion.span>
    </span>
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
      <span className="block">
        <Rise delay={0.45}>Pipeline</Rise> <Rise delay={0.52}>integrity,</Rise>
      </span>
      <span className="block lg:whitespace-nowrap">
        <Rise delay={0.59}>from</Rise>{" "}
        <Rise delay={0.66}>
          <Swap text={r.from} />
        </Rise>{" "}
        <Rise delay={0.73}>to</Rise>{" "}
        <Rise delay={0.8}>
          <Swap text={`${r.to}.`} />
        </Rise>
      </span>
    </p>
  );
}
