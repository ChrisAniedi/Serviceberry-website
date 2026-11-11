"use client";

import { motion, useReducedMotion } from "motion/react";
import { ClipboardList, FileCheck2, ScanSearch, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    icon: ClipboardList,
    title: "Survey & plan",
    body: "We review the line: diameter, length, bends, valves and product. Then we choose the pig, size it and plan the run around production.",
    points: ["Line data and drawings", "Pig selection and sizing", "Run plan and permits"],
    status: "Run plan approved",
  },
  {
    icon: Send,
    title: "Launch",
    body: "The pig is loaded into the launcher and released under controlled pressure, with tracking so the crew always knows where it is.",
    points: ["Launcher operation", "Pig tracking and signalling", "Pressure and flow control"],
    status: "Pig in the line",
  },
  {
    icon: ScanSearch,
    title: "Clean & inspect",
    body: "Brushes and discs sweep wax, scale and water ahead of the pig. Gauge, caliper or intelligent tools record the inside of the pipe.",
    points: ["Progressive cleaning runs", "Gauge and caliper runs", "Intelligent pigging with partners"],
    status: "Line cleaned · data logged",
  },
  {
    icon: FileCheck2,
    title: "Receive & report",
    body: "The pig is trapped in the receiver, debris is measured and photographed, and the results become a clear run report.",
    points: ["Receiver operation", "Debris measured and logged", "Run report to the operator"],
    status: "Report delivered",
  },
];

/**
 * A pigging run in four stations, on black (after camuh's "request to delivery"): a line
 * with an icon at each station that draws itself in as the section arrives, a gold pig that
 * keeps travelling it, and a card per station with its number, work and a status tag.
 */
export function PiggingStory() {
  const reduce = useReducedMotion();
  return (
    <section id="kp-2" className="relative scroll-mt-20 overflow-hidden bg-[#070809] py-24 text-white sm:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand-light uppercase">Our core: pigging</p>
            <h2 className="headline mt-4 max-w-[20ch] text-[clamp(2.1rem,4vw,3.4rem)]">
              How a pigging run keeps your line flowing, <span className="text-white/45">in four stations.</span>
            </h2>
          </div>
          <p className="max-w-md text-[16px] leading-relaxed text-white/60">
            Operational and maintenance pigging, caliper and geometry runs, and intelligent pigging with specialist tool providers. One crew from plan to report.
          </p>
        </div>

        {/* the line, its stations and the pig (large screens) */}
        <div aria-hidden className="relative mt-14 hidden h-12 lg:block">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/12" />
          <motion.div
            className="absolute top-1/2 left-0 h-px w-[calc(75%+60px)] origin-left -translate-y-1/2 bg-brand-light"
            initial={{ scaleX: reduce ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -120px 0px" }}
            transition={{ duration: 1.6, ease }}
          />
          {!reduce && (
            <span className="anim-pig-run absolute top-1/2 left-0 z-10 block h-[10px] w-[28px] -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,#ffd98f,#f2a93b)] shadow-[0_0_16px_4px_rgba(255,198,92,0.45)]" />
          )}
          {steps.map((s, i) => (
            <motion.span
              key={s.title}
              className="absolute top-0 grid size-12 place-items-center rounded-full bg-brand-light text-brand-deep"
              style={{ left: `calc(${i * 25}% + ${i * 4 + 24}px)` }}
              initial={{ scale: reduce ? 1 : 0.6, opacity: reduce ? 1 : 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -120px 0px" }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.35, ease }}
            >
              <s.icon className="size-5" strokeWidth={1.8} />
            </motion.span>
          ))}
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease }}
              className="group flex flex-col rounded-[20px] bg-white/[0.045] p-6 ring-1 ring-white/[0.08] transition-colors duration-500 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-[44px] leading-none font-medium tracking-[-0.03em] text-white/20 tabular-nums transition-colors duration-500 group-hover:text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid size-10 place-items-center rounded-full bg-brand-light/15 text-brand-light lg:hidden">
                  <s.icon className="size-5" strokeWidth={1.8} />
                </span>
              </div>
              <h3 className="mt-7 text-[19px] font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/60">{s.body}</p>
              <ul className="mt-4 space-y-1.5 text-[14px] text-white/80">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <span className="h-px w-3.5 bg-brand-light" /> {p}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#1f9d55]/15 px-3 py-1.5 text-[12.5px] font-medium text-[#5fd497]">
                <span className="size-1.5 rounded-full bg-[#5fd497]" /> {s.status}
              </span>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href="/services/pipeline-integrity-pigging">Plan a pigging programme</Button>
          <p className="text-[14px] text-white/55">One contact from the first survey to the final report.</p>
        </div>
      </div>
    </section>
  );
}
