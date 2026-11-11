"use client";

import { motion, useReducedMotion } from "motion/react";
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

const phrase = (i: number) => `${runs[i].from} to ${runs[i].to}.`;

const TYPE = 60; // ms per letter typed
const ERASE = 30; // ms per letter erased
const HOLD = 2200; // ms the full phrase stays
const START = 2000; // ms before the first erase (lets the intro finish)

/**
 * Types the run out letter by letter, holds it, erases it, and types the next one.
 * Returns the run index (the arc labels follow it) and the text typed so far.
 * With reduced motion the first phrase simply stays.
 */
export function useTypedRun() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(phrase(0));
  const [mode, setMode] = useState<"hold" | "erase" | "type">("hold");

  useEffect(() => {
    if (reduce) return;
    const full = phrase(index);
    let t: ReturnType<typeof setTimeout>;
    if (mode === "hold") t = setTimeout(() => setMode("erase"), typed === phrase(0) && index === 0 ? START + HOLD : HOLD);
    else if (mode === "erase") {
      if (typed.length) t = setTimeout(() => setTyped(typed.slice(0, -1)), ERASE);
      else
        t = setTimeout(() => {
          setIndex((index + 1) % runs.length);
          setMode("type");
        }, 280);
    } else {
      if (typed.length < full.length) t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), TYPE);
      else setMode("hold");
    }
    return () => clearTimeout(t);
  }, [mode, typed, index, reduce]);

  return { index, typed };
}

/** Colours the typed text: the two ends in gold, "to" and the full stop in white. */
function Typed({ text, index }: { text: string; index: number }) {
  const from = runs[index].from;
  const a = text.slice(0, from.length);
  const mid = text.slice(from.length, from.length + 4); // " to "
  const b = text.slice(from.length + 4).replace(/\.$/, "");
  const dot = text.endsWith(".") ? "." : "";
  return (
    <>
      <span className="text-[#ffd79a]">{a}</span>
      {mid}
      <span className="text-[#ffd79a]">{b}</span>
      {dot}
    </>
  );
}

/**
 * "Pipeline integrity, from launch to receiver." The first line stays; the run after
 * "from" is typed out, held, erased and replaced by the next ("survey to sign-off",
 * "wellhead to export line"…). The second line sits in a box as wide as the longest run,
 * with the text set from its left edge, so typing never shifts the line about.
 * Decorative: the page's real h1 sits under it.
 */
export function HeroHeadline({ index, typed }: { index: number; typed: string }) {
  const longest = runs.map((_, i) => phrase(i)).reduce((a, b) => (b.length > a.length ? b : a));
  return (
    <motion.p
      aria-hidden
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.1, delay: 0.45, ease }}
      className="headline mt-6 text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[1.02] font-[350] tracking-[-0.045em]"
    >
      <span className="block">Pipeline integrity,</span>
      <span className="relative inline-grid max-w-full text-left">
        {/* reserves the width of the longest run */}
        <span className="invisible col-start-1 row-start-1">from {longest}</span>
        <span className="col-start-1 row-start-1">
          from <Typed text={typed} index={index} />
          <span className="anim-caret ml-[0.04em] inline-block h-[0.82em] w-[0.06em] translate-y-[0.08em] rounded-full bg-[#ffd79a] align-baseline" />
        </span>
      </span>
    </motion.p>
  );
}
