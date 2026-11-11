"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { ClipboardList, FileCheck2, GripHorizontal, ScanSearch, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { brochure, img } from "@/content/images";
import { scrollToY } from "@/lib/scroll";

const steps = [
  { icon: ClipboardList, title: "Survey & plan", body: "We read the line and plan the run around your production.", status: "Run plan approved", image: img.blueprints },
  { icon: Send, title: "Launch", body: "The pig goes in under controlled pressure, tracked all the way.", status: "Pig in the line", image: brochure.crewIntelligentPig },
  { icon: ScanSearch, title: "Clean & inspect", body: "Wax and scale swept out, the pipe wall measured as it goes.", status: "Line cleaned · data logged", image: brochure.descalerBeforeAfter },
  { icon: FileCheck2, title: "Receive & report", body: "Debris measured and photographed, then a clear run report.", status: "Report delivered", image: img.monitoring },
];

// Scroll progress → run progress, pausing at each station. INV turns a run position back
// into scroll progress (for dragging the pig and clicking a station).
const SCROLL = [0, 0.1, 0.3, 0.38, 0.58, 0.66, 0.86, 1];
const RUN = [0, 0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1, 1];
const STATION_AT = [0.05, 0.34, 0.62, 0.93];
function scrollFor(f: number) {
  const seg = Math.min(2, Math.floor(f * 3));
  const start = [0.1, 0.38, 0.66][seg];
  return start + (f - seg / 3) * 3 * 0.2;
}
const LINE_KM = 12; // a nominal line for the readout

function Card({ i, active, still, onPick }: { i: number; active: boolean; still: boolean; onPick?: () => void }) {
  const s = steps[i];
  const dim = !still && !active;
  return (
    <article
      onClick={onPick}
      className={`group relative flex w-[min(84vw,400px)] shrink-0 flex-col overflow-hidden rounded-[26px] bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_30px_60px_-30px_rgba(0,0,0,0.8)] ring-1 backdrop-blur-xl transition-[filter,opacity,transform,box-shadow] duration-700 ease-out-expo lg:w-[min(30vw,560px)] ${
        dim ? "cursor-pointer scale-[0.95] opacity-40 blur-[3px] ring-white/[0.08] hover:opacity-60 hover:blur-[1.5px]" : "opacity-100 blur-0 ring-white/[0.16]"
      } ${active && !still ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_0_1px_rgba(143,180,255,0.35),0_40px_80px_-30px_rgba(11,79,191,0.55)]" : ""}`}
    >
      <div className={`relative m-2 overflow-hidden rounded-[20px] bg-ink ${still ? "h-[clamp(160px,46vw,230px)]" : "min-h-[150px] flex-1"}`}>
        <Image src={s.image} alt="" fill sizes="420px" className={`object-cover transition-transform duration-[1.4s] ease-out-expo ${active ? "scale-100" : "scale-110"}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="glass-fade text-lift absolute top-3 left-3 rounded-full px-3 py-1 font-display text-[12px] font-semibold tracking-[0.1em]">
          {String(i + 1).padStart(2, "0")} / 04
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[12.5px] font-medium text-[#7fe0ad] ring-1 ring-white/10 backdrop-blur-md">
          <span className={`size-1.5 rounded-full bg-[#5fd497] ${active ? "animate-pulse" : ""}`} /> {s.status}
        </span>
      </div>
      <div className="px-6 pt-4 pb-6">
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-light text-brand-deep">
            <s.icon className="size-[18px]" strokeWidth={1.8} />
          </span>
          <h3 className="text-[20px] font-semibold tracking-[-0.01em]">{s.title}</h3>
        </div>
        <p className="mt-3 text-[15.5px] leading-relaxed text-white/65">{s.body}</p>
      </div>
    </article>
  );
}

/** A side view of a cleaning pig: body, three sealing cups and a nose, drawn in gold. */
function PigShape() {
  return (
    <svg viewBox="0 0 64 28" className="h-[28px] w-[64px] drop-shadow-[0_0_14px_rgba(255,198,92,0.6)]">
      <defs>
        <linearGradient id="pig-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0c8" />
          <stop offset="0.45" stopColor="#ffc865" />
          <stop offset="1" stopColor="#c97f1e" />
        </linearGradient>
        <linearGradient id="pig-cup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe3a6" />
          <stop offset="1" stopColor="#a8650f" />
        </linearGradient>
      </defs>
      <rect x="6" y="9" width="46" height="10" rx="3" fill="url(#pig-body)" />
      {[10, 26, 42].map((x) => (
        <rect key={x} x={x} y="2" width="6" height="24" rx="3" fill="url(#pig-cup)" />
      ))}
      <path d="M52 9 Q62 14 52 19 Z" fill="url(#pig-body)" />
      <circle cx="4" cy="14" r="2.4" fill="#ffe7b0" />
    </svg>
  );
}

/** The pipeline: dirty ahead of the pig, clean and flowing behind it, stations you can jump to. */
function Pipeline({
  progress,
  active,
  onScrub,
  onStation,
}: {
  progress: MotionValue<number>;
  active: number;
  onScrub: (f: number, immediate: boolean) => void;
  onStation: (i: number) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(false);
  // station centres sit 32px in from each end of the pipe
  const pct = useTransform(progress, (p) => `calc(32px + ${Math.max(0, Math.min(1, p))} * (100% - 64px))`);
  const speed = useVelocity(progress);
  const tilt = useTransform(speed, [-1.2, 0, 1.2], [5, 0, -5]);
  const stretch = useTransform(speed, [-1.2, 0, 1.2], [1.15, 1, 1.15]);
  const trail = useTransform(speed, [-0.8, -0.06, 0, 0.06, 0.8], [1, 0, 0, 0, 1]);
  const debris = useTransform(progress, [0, 0.05, 0.95, 1], [0, 0.5, 1.6, 0.4]);
  const [km, setKm] = useState("0+000");
  useMotionValueEvent(progress, "change", (p) => {
    const m = Math.round(Math.max(0, Math.min(1, p)) * LINE_KM * 1000);
    setKm(`${Math.floor(m / 1000)}+${String(m % 1000).padStart(3, "0")}`);
  });

  const at = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - r.left - 32) / (r.width - 64)));
  };

  return (
    <div className="relative mt-[clamp(2.75rem,6svh,4rem)] select-none">
      <div
        ref={box}
        className={`relative h-[64px] touch-none ${drag ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("[data-station]")) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          setDrag(true);
          onScrub(at(e.clientX), false);
        }}
        onPointerMove={(e) => drag && onScrub(at(e.clientX), true)}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
      >
        {/* the pipe: steel tube with wax and scale specks inside */}
        <div className="absolute inset-x-0 top-1/2 h-[20px] -translate-y-1/2 overflow-hidden rounded-full bg-[linear-gradient(180deg,#2c3443,#141922_55%,#0b0e14)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-2px_4px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
          <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_30%_70%,rgba(176,122,52,0.75)_0_1.6px,transparent_2.2px)_0_0/23px_18px,radial-gradient(circle_at_60%_40%,rgba(120,86,40,0.8)_0_1.2px,transparent_1.8px)_9px_0/17px_18px]" />
          {/* behind the pig: clean, with product flowing */}
          <motion.div className="absolute inset-y-0 left-0 overflow-hidden rounded-full" style={{ width: pct }}>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#3d6fc4,#1d3f86_55%,#122a5e)]" />
            <div className="anim-flow absolute inset-0 opacity-60 [background:repeating-linear-gradient(90deg,transparent_0_26px,rgba(190,215,255,0.55)_26px_40px,transparent_40px_70px)]" />
            <div className="absolute inset-x-0 top-[3px] h-px bg-white/40" />
          </motion.div>
        </div>

        {/* stations */}
        {steps.map((s, i) => {
          const on = i <= active;
          return (
            <button
              key={s.title}
              type="button"
              data-station
              onClick={() => onStation(i)}
              aria-label={`Go to step ${i + 1}: ${s.title}`}
              className="group/st absolute top-1/2 z-10 -translate-1/2 cursor-pointer"
              style={{ left: `calc(32px + ${i / 3} * (100% - 64px))` }}
            >
              {i === active && <span className="absolute inset-1 animate-ping rounded-full bg-brand-light/25 [animation-duration:2s]" />}
              {/* a valve-like station: an outer ring around a solid hub */}
              <span
                className={`relative grid size-16 place-items-center rounded-full backdrop-blur-md transition-[background-color,box-shadow,scale] duration-500 group-hover/st:scale-105 ${
                  on
                    ? "bg-brand-light/15 shadow-[0_0_0_1px_rgba(143,180,255,0.55),0_0_36px_rgba(143,180,255,0.35)]"
                    : "bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.16)] group-hover/st:shadow-[0_0_0_1px_rgba(255,255,255,0.4)]"
                }`}
              >
                <span
                  className={`grid size-11 place-items-center rounded-full transition-colors duration-500 ${
                    on ? "bg-brand-light text-brand-deep" : "bg-[#151a24] text-white/55 ring-1 ring-white/15 group-hover/st:text-white"
                  }`}
                >
                  <s.icon className="size-5" strokeWidth={1.8} />
                </span>
                <span
                  className={`absolute -top-1 -right-1 grid size-6 place-items-center rounded-full font-display text-[11px] font-semibold tabular-nums transition-colors duration-500 ${
                    on ? "bg-white text-ink" : "bg-[#1c2230] text-white/60 ring-1 ring-white/15"
                  }`}
                >
                  {i + 1}
                </span>
              </span>
              <span
                className={`absolute top-full left-1/2 mt-2.5 -translate-x-1/2 text-[14px] font-medium whitespace-nowrap transition-colors ${
                  i === active ? "text-white" : "text-white/45 group-hover/st:text-white/80"
                }`}
              >
                {s.title}
              </span>
            </button>
          );
        })}

        {/* the pig, with the debris it pushes and a readout above */}
        <motion.div className="pointer-events-none absolute top-1/2 z-20" style={{ left: pct }}>
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <motion.span
              className="absolute top-1/2 right-[52px] h-[6px] w-[70px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,214,150,0.7))] blur-[2px]"
              style={{ opacity: trail }}
            />
            <motion.span
              className="absolute top-1/2 left-[58px] h-[12px] w-[14px] origin-left -translate-y-1/2 rounded-[40%] bg-[radial-gradient(circle_at_30%_40%,#a87434_0_2px,transparent_2.5px),radial-gradient(circle_at_70%_65%,#7a5527_0_2px,transparent_2.5px),radial-gradient(circle_at_55%_25%,#c48a44_0_1.5px,transparent_2px)]"
              style={{ scaleX: debris, scaleY: debris }}
            />
            <motion.div style={{ rotate: tilt, scaleX: stretch }}>
              <PigShape />
            </motion.div>
            <span className="absolute bottom-full left-1/2 mb-7 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-display text-[11.5px] font-semibold whitespace-nowrap text-ink tabular-nums shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)]">
              <GripHorizontal className="size-3.5 text-steel-2" /> KP {km}
              <span className="absolute top-full left-1/2 -mt-px size-0 -translate-x-1/2 border-x-[5px] border-t-[5px] border-x-transparent border-t-white" />
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * A pigging run in four stations, on near-black with a faint photo behind. On large screens
 * the section holds while you scroll: the pig cleans its way along the pipe, the cards slide
 * left so the next station comes into focus, and only the current card is sharp. The pig can
 * be dragged and the stations and cards clicked to jump. Phones get the cards in a grid.
 */
export function PiggingStory() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pin, setPin] = useState(false);
  const [shift, setShift] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)");
    const set = () => setPin(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const measure = () => {
      // slide until the last card meets the right edge: the first card leaves as the third arrives
      const t = track.current;
      if (t) setShift(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    return () => ro.disconnect();
  }, [pin]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stationed = useTransform(scrollYProgress, SCROLL, RUN);
  const progress = useSpring(stationed, { stiffness: 110, damping: 26, mass: 0.5 });
  const x = useTransform(progress, (p) => -p * shift);
  useMotionValueEvent(stationed, "change", (p) => setActive(Math.min(3, Math.round(p * 3))));

  const goTo = (p: number, immediate: boolean) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + p * (el.offsetHeight - window.innerHeight), immediate);
  };

  return (
    <section data-nav="dark" ref={ref} id="kp-2" className="relative scroll-mt-20 overflow-x-clip bg-[#070809] text-white" style={{ height: pin ? "330svh" : undefined }}>
      <div className={pin ? "sticky top-0 flex h-svh flex-col overflow-hidden pt-[clamp(88px,12svh,120px)] pb-[clamp(1.5rem,4svh,3rem)]" : "relative overflow-hidden py-24"}>
        {/* faint photo behind */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image src={img.pipeValley} alt="" fill sizes="100vw" className="object-cover opacity-[0.12] grayscale" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_70%_30%,transparent,#070809_80%)]" />
        </div>

        <div className="container-x relative">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand-light uppercase">Our core: pigging</p>
              <h2 className="headline mt-3 max-w-[22ch] text-[clamp(1.9rem,3.3vw,3rem)] leading-[1.05]">
                How a pigging run keeps your line flowing, <span className="text-white/45">in four stations.</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-[15.5px] leading-relaxed text-white/60 [@media(max-height:820px)]:hidden">
                Operational and maintenance pigging, caliper and geometry runs, and intelligent pigging with specialist tool providers.
              </p>
              <Button href="/services/pipeline-integrity-pigging" className="mt-5 [@media(max-height:820px)]:mt-0">Plan a pigging programme</Button>
            </div>
          </div>

          {pin && (
            <Pipeline
              progress={progress}
              active={active}
              onScrub={(f, immediate) => goTo(scrollFor(f), immediate)}
              onStation={(i) => goTo(STATION_AT[i], false)}
            />
          )}
        </div>

        {/* the cards: slide left with the run on large screens; a grid on phones */}
        <div className={pin ? "relative mt-[clamp(3rem,7svh,4.5rem)] flex min-h-0 flex-1 items-start" : "container-x relative mt-10"}>
          {pin ? (
            <motion.div ref={track} style={{ x: reduce ? 0 : x }} className="flex h-full max-h-[620px] w-max gap-5 px-[var(--gutter)]">
              {steps.map((_, i) => (
                <Card key={i} i={i} active={i === active} still={false} onPick={() => goTo(STATION_AT[i], false)} />
              ))}
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((_, i) => (
                <Card key={i} i={i} active still />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
