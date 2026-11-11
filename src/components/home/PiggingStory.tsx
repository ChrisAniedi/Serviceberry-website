"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ClipboardList, FileCheck2, ScanSearch, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { brochure, img } from "@/content/images";

const steps = [
  { icon: ClipboardList, title: "Survey & plan", body: "We read the line and plan the run around your production.", status: "Run plan approved", image: img.blueprints },
  { icon: Send, title: "Launch", body: "The pig goes in under controlled pressure, tracked all the way.", status: "Pig in the line", image: brochure.crewIntelligentPig },
  { icon: ScanSearch, title: "Clean & inspect", body: "Wax and scale swept out, the pipe wall measured as it goes.", status: "Line cleaned · data logged", image: brochure.descalerBeforeAfter },
  { icon: FileCheck2, title: "Receive & report", body: "Debris measured and photographed, then a clear run report.", status: "Report delivered", image: img.monitoring },
];

function Card({ i, active, still }: { i: number; active: boolean; still: boolean }) {
  const s = steps[i];
  return (
    <article
      className={`relative flex w-[min(84vw,400px)] shrink-0 flex-col overflow-hidden rounded-[26px] bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_30px_60px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.12] backdrop-blur-xl transition-[filter,opacity,transform] duration-700 ease-out-expo lg:w-[min(30vw,440px)] ${
        still || active ? "opacity-100 blur-0" : "scale-[0.96] opacity-40 blur-[3px]"
      }`}
    >
      <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-[20px] bg-ink">
        <Image src={s.image} alt="" fill sizes="440px" className={`object-cover transition-transform duration-[1.4s] ease-out-expo ${active ? "scale-100" : "scale-110"}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="glass-fade text-lift absolute top-3 left-3 rounded-full px-3 py-1 font-display text-[12px] font-semibold tracking-[0.1em]">
          {String(i + 1).padStart(2, "0")} / 04
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-3 pb-5">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-brand-light text-brand-deep">
            <s.icon className="size-[18px]" strokeWidth={1.8} />
          </span>
          <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{s.title}</h3>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-white/65">{s.body}</p>
        <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#1f9d55]/15 px-3 py-1.5 text-[12.5px] font-medium text-[#5fd497]">
          <span className="size-1.5 rounded-full bg-[#5fd497]" /> {s.status}
        </span>
      </div>
    </article>
  );
}

/**
 * A pigging run in four stations, on near-black with a faint photo behind. On large screens
 * the section holds while you scroll: the gold pig moves along the line, the cards slide
 * left so the next station comes into focus (the passed ones drift out to the left), and
 * only the current card is sharp. Phones get the four cards in a simple grid.
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
  // pause a little at each station
  const stationed = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.38, 0.58, 0.66, 0.86, 1], [0, 0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1, 1]);
  const progress = useSpring(stationed, { stiffness: 110, damping: 26, mass: 0.5 });
  const x = useTransform(progress, (p) => -p * shift);
  const pigLeft = useTransform(progress, (p) => `${p * 100}%`);
  useMotionValueEvent(stationed, "change", (p) => setActive(Math.min(3, Math.round(p * 3))));

  return (
    <section ref={ref} id="kp-2" className="relative scroll-mt-20 overflow-x-clip bg-[#070809] text-white" style={{ height: pin ? "330svh" : undefined }}>
      <div className={pin ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-16" : "relative overflow-hidden py-24"}>
        {/* faint photo behind */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image src={img.pipeValley} alt="" fill sizes="100vw" className="object-cover opacity-[0.12] grayscale" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_70%_30%,transparent,#070809_80%)]" />
        </div>

        <div className="container-x relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand-light uppercase">Our core: pigging</p>
              <h2 className="headline mt-4 max-w-[20ch] text-[clamp(2rem,3.6vw,3.2rem)]">
                How a pigging run keeps your line flowing, <span className="text-white/45">in four stations.</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-[16px] leading-relaxed text-white/60">
                Operational and maintenance pigging, caliper and geometry runs, and intelligent pigging with specialist tool providers.
              </p>
              <Button href="/services/pipeline-integrity-pigging" className="mt-6">Plan a pigging programme</Button>
            </div>
          </div>

          {/* the line with its stations and the pig */}
          {pin && (
            <div aria-hidden className="relative mt-10 h-10">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/12" />
              <motion.div className="absolute top-1/2 left-0 h-px w-full origin-left -translate-y-1/2 bg-brand-light" style={{ scaleX: progress }} />
              {steps.map((s, i) => (
                <span
                  key={s.title}
                  className={`absolute top-1/2 grid size-10 -translate-1/2 place-items-center rounded-full transition-colors duration-500 ${i <= active ? "bg-brand-light text-brand-deep" : "bg-white/10 text-white/50 ring-1 ring-white/15"}`}
                  style={{ left: `${(i / 3) * 100}%`, marginLeft: i === 0 ? 20 : i === 3 ? -20 : 0 }}
                >
                  <s.icon className="size-[18px]" strokeWidth={1.8} />
                </span>
              ))}
              <motion.span className="absolute top-1/2 z-10 -translate-1/2" style={{ left: pigLeft }}>
                <span className="block h-[10px] w-[28px] rounded-full bg-[linear-gradient(180deg,#ffd98f,#f2a93b)] shadow-[0_0_16px_4px_rgba(255,198,92,0.45)]" />
              </motion.span>
            </div>
          )}
        </div>

        {/* the cards: slide left with the run on large screens; a grid on phones */}
        <div className={pin ? "relative mt-8 overflow-hidden" : "container-x relative mt-10"}>
          {pin ? (
            <motion.div ref={track} style={{ x: reduce ? 0 : x }} className="flex w-max gap-5 px-[var(--gutter)]">
              {steps.map((_, i) => (
                <Card key={i} i={i} active={i === active} still={false} />
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
