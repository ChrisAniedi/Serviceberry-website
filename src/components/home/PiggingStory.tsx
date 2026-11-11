"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { brochure, img } from "@/content/images";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    title: "Survey & plan",
    body: "We review the line: diameter, length, bends, valves and product. Then we choose the pig, size it and plan the run around production.",
    points: ["Line data and drawings review", "Pig selection and sizing", "Run plan and permits"],
    image: img.blueprints,
  },
  {
    title: "Launch",
    body: "The pig is loaded into the launcher and released under controlled pressure, with tracking so the crew always knows where it is.",
    points: ["Launcher operation", "Pig tracking and signalling", "Pressure and flow control"],
    image: brochure.crewIntelligentPig,
  },
  {
    title: "Clean & inspect",
    body: "Brushes and discs sweep wax, scale and water ahead of the pig. Gauge, caliper or intelligent tools record the inside of the pipe.",
    points: ["Progressive cleaning runs", "Gauge plate and caliper runs", "Intelligent pigging with tool partners"],
    image: brochure.descalerBeforeAfter,
  },
  {
    title: "Receive & report",
    body: "The pig is trapped in the receiver, debris is measured and photographed, and the results become a clear run report.",
    points: ["Receiver operation", "Debris measured and logged", "Run report to the operator"],
    image: img.monitoring,
  },
];

function StepBody({ i, compact = false }: { i: number; compact?: boolean }) {
  const s = steps[i];
  return (
    <div>
      <p className="font-display text-[13px] font-semibold tracking-[0.14em] text-brand-light uppercase">
        Station {String(i + 1).padStart(2, "0")} / 04
      </p>
      <h3 className={`headline mt-3 text-white ${compact ? "text-[30px]" : "text-[clamp(2rem,3.4vw,3rem)]"}`}>{s.title}</h3>
      <p className="mt-4 max-w-md text-[16.5px] leading-relaxed text-white/75">{s.body}</p>
      <ul className="mt-6 space-y-2.5">
        {s.points.map((p) => (
          <li key={p} className="flex items-center gap-3 text-[15px] text-white/90">
            <span className="h-[2px] w-5 rounded-full bg-brand-light" /> {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The pipe with four stations and a pig that runs along it with the scroll. */
function Track({ progress, active }: { progress: MotionValue<number>; active: number }) {
  const left = useTransform(progress, (p) => `${p * 100}%`);
  const fill = useTransform(progress, (p) => p);
  return (
    <div className="relative mx-[18px] h-[64px]">
      {/* pipe */}
      <div className="absolute inset-x-0 top-1/2 h-[10px] -translate-y-1/2 rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.3)]" />
      <motion.div className="absolute top-1/2 left-0 h-[10px] w-full origin-left -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,rgba(143,180,255,0.35),rgba(143,180,255,0.75))]" style={{ scaleX: fill }} />
      {/* stations */}
      {steps.map((s, i) => (
        <div key={s.title} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${(i / (steps.length - 1)) * 100}%` }}>
          <span className={`block size-5 rounded-full border-2 transition-colors duration-500 ${i <= active ? "border-brand-light bg-brand-deep" : "border-white/25 bg-brand-deep"}`} />
          <span
            className={`absolute top-8 text-[13px] whitespace-nowrap transition-colors duration-500 ${i === 0 ? "left-0" : i === steps.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2"} ${i === active ? "text-white" : "text-white/55"}`}
          >
            {s.title}
          </span>
        </div>
      ))}
      {/* the pig */}
      <motion.span className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" style={{ left }}>
        <span className="absolute -inset-5 rounded-full bg-[radial-gradient(closest-side,rgba(255,198,92,0.55),transparent)]" />
        <span className="relative block h-[16px] w-[40px] rounded-full bg-[linear-gradient(180deg,#ffd98f,#f2a93b)] shadow-[0_0_18px_rgba(255,198,92,0.6)]" />
      </motion.span>
    </div>
  );
}

/**
 * A pigging run, told along a pipe. On large screens the section holds while you scroll:
 * the pig travels from station to station, the pipe fills behind it, and each station's
 * words and photo come in as it arrives. Phones get the four stations as a simple list.
 */
export function PiggingStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [pin, setPin] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)");
    const set = () => setPin(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // hold briefly at each station: the pig moves in the middle of each quarter of the scroll
  const stationed = useTransform(scrollYProgress, [0, 0.12, 0.3, 0.42, 0.6, 0.72, 0.9, 1], [0, 0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1, 1]);
  const progress = useSpring(stationed, { stiffness: 120, damping: 26, mass: 0.5 });
  useMotionValueEvent(stationed, "change", (p) => setActive(Math.min(3, Math.round(p * 3))));

  return (
    <section
      ref={ref}
      id="kp-2"
      className="relative scroll-mt-20 overflow-x-clip bg-brand-deep text-white"
      style={{ height: pin ? "320svh" : undefined }}
    >
      <div className={pin ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden" : "py-24 sm:py-28"}>
        <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] size-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(11,79,191,0.45),transparent)]" />
        <div className="container-x relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand-light uppercase">Our core: pigging</p>
              <h2 className="headline mt-4 max-w-[18ch] text-[clamp(2.2rem,4.2vw,3.6rem)]">
                How a pigging run <span className="text-brand-light">keeps your line flowing.</span>
              </h2>
            </div>
            <p className="max-w-md text-[16px] leading-relaxed text-white/70">
              Operational and maintenance pigging, caliper and geometry runs, and intelligent pigging with specialist tool providers.
            </p>
          </div>

          {pin ? (
            <>
              <div className="mt-12">
                <Track progress={progress} active={active} />
              </div>
              <div className="mt-16 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                <div className="relative min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <StepBody i={active} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative aspect-[16/10] max-h-[44svh] w-full overflow-hidden rounded-[28px] bg-ink ring-1 ring-white/10">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={active}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease }}
                    >
                      <Image src={steps[active].image} alt="" fill sizes="50vw" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <span className="glass-fade text-lift absolute bottom-4 left-4 rounded-full px-4 py-2 text-[13px] font-medium">
                    {String(active + 1).padStart(2, "0")} · {steps[active].title}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <ol className="mt-12 space-y-12">
              {steps.map((s, i) => (
                <li key={s.title} className="grid gap-6 border-t border-white/15 pt-10 sm:grid-cols-2 sm:items-center">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-ink">
                    <Image src={s.image} alt="" fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <StepBody i={i} compact />
                </li>
              ))}
            </ol>
          )}

          <div className={`flex flex-wrap items-center justify-between gap-4 ${pin ? "mt-12" : "mt-14 border-t border-white/15 pt-10"}`}>
            <Button href="/services/pipeline-integrity-pigging">Plan a pigging programme</Button>
            {pin && <span className="text-[13px] text-white/50">Scroll to follow the pig</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
