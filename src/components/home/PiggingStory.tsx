"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { img } from "@/content/images";

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
    image: img.pigging,
  },
  {
    title: "Clean & inspect",
    body: "Brushes and discs sweep wax, scale and water ahead of the pig. Gauge, caliper or intelligent tools record the inside of the pipe.",
    points: ["Progressive cleaning runs", "Gauge plate and caliper runs", "Intelligent pigging with tool partners"],
    image: img.valveGauge,
  },
  {
    title: "Receive & report",
    body: "The pig is trapped in the receiver, debris is measured and photographed, and the results become a clear run report.",
    points: ["Receiver operation", "Debris measured and logged", "Run report to the operator"],
    image: img.workerHardhat,
  },
];

function Step({ i, onActive }: { i: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  const s = steps[i];
  return (
    <div ref={ref} className="flex min-h-[70svh] flex-col justify-center border-t border-white/15 py-12 lg:py-0">
      <div className="chamfer-lg relative mb-8 aspect-[4/3] overflow-hidden lg:hidden">
        <Image src={s.image} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <p className="font-display text-[13px] font-semibold tracking-[0.12em] text-berry-light uppercase">Step {String(i + 1).padStart(2, "0")} / 04</p>
      <h3 className="headline mt-3 text-[clamp(2.02rem,3.7vw,3.19rem)] text-white">{s.title}</h3>
      <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/75">{s.body}</p>
      <ul className="mt-6 space-y-2.5">
        {s.points.map((p) => (
          <li key={p} className="flex items-center gap-3 text-[15.5px] text-white">
            <span className="h-[3px] w-5 bg-berry" /> {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Sticky photo on the left changes as the four steps of a pigging run scroll past on the right. */
export function PiggingStory() {
  const [active, setActive] = useState(0);
  return (
    <section id="kp-2" className="scroll-mt-20 bg-brand-deep pt-24 text-white sm:pt-32">
      <div className="container-x">
        <Title
          light
          kp="2+000"
          label="Our core: pigging"
          title={<>How a pigging run<br /><span className="text-brand-light">keeps your line flowing</span></>}
          intro="Pigging is at the heart of what we do: Operational and maintenance pigging, caliper and geometry inspection, and intelligent pigging with specialist tool providers."
        />
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="hidden lg:-ml-[var(--gutter)] lg:block">
            <div className="sticky top-0 h-svh">
              <div className="relative h-full overflow-hidden bg-ink">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    exit={{ opacity: 0.6 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image src={steps[active].image} alt="" fill sizes="50vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute top-6 right-6 bottom-6 w-[3px] bg-white/25">
                  <motion.span className="absolute inset-x-0 top-0 bg-berry" animate={{ height: `${((active + 1) / steps.length) * 100}%` }} transition={{ duration: 0.6 }} />
                </div>
                <p className="absolute bottom-6 left-6 bg-ink/80 px-3 py-2 font-display text-[13px] font-semibold tracking-[0.08em] uppercase">
                  {String(active + 1).padStart(2, "0")} · {steps[active].title}
                </p>
              </div>
            </div>
          </div>
          <div>
            {steps.map((_, i) => <Step key={i} i={i} onActive={setActive} />)}
            <div className="border-t border-white/15 pt-10 pb-24 sm:pb-32">
              <Button href="/services/pipeline-integrity-pigging" variant="hivis">Plan a pigging programme</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
