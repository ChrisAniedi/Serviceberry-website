"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, BadgeCheck, FileSearch, Handshake, HardHat, Settings2, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { img } from "@/content/images";
import { spot } from "@/lib/spot";

const ease = [0.16, 1, 0.3, 1] as const;

// The six reasons from the brochure's "Why clients work with us" page.
const reasons = [
  { icon: Settings2, title: "Tailored solutions", body: "Scopes built around your asset and your production plan." },
  { icon: FileSearch, title: "Due diligence", body: "Methods, equipment and partners checked before mobilisation." },
  { icon: ShieldCheck, title: "Safety first", body: "No activity has priority over safety." },
  { icon: BadgeCheck, title: "Trust and transparency", body: "Clear roles, honest reporting, no surprises." },
  { icon: Handshake, title: "Customer relationship", body: "One team with your operators, from planning to hand-over." },
  { icon: HardHat, title: "Experienced team", body: "Multi-skilled professionals with local equipment." },
];

/** Glass tiles over a slowly zooming plant photo, with the QHSE promise underneath. */
export function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-brand-deep py-24 text-white sm:py-32">
      <motion.div className="absolute inset-0 -z-10" style={{ scale, y }}>
        <Image src={img.nightPlant2} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,42,87,0.88),rgba(10,42,87,0.7)_45%,rgba(10,22,48,0.92))]" />

      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand-light uppercase">Why clients work with us</p>
            <h2 className="headline mt-4 text-[clamp(2.4rem,5vw,4.4rem)]">
              We collaborate for <span className="text-brand-light">impact and success.</span>
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-white/70 lg:col-span-5">
            Respect, integrity and passion: the values in our name, and in how we run every job.
          </p>
        </div>

        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.12, ease }}
              onPointerMove={spot}
              className="spot group relative overflow-hidden rounded-[24px] bg-white/[0.07] p-7 ring-1 ring-white/15 backdrop-blur-xl transition-[background-color,translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:bg-white/[0.11] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]"
            >
              {/* an occasional sheen, staggered across the grid */}
              <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 overflow-visible">
                <span
                  className="anim-sheen absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)]"
                  style={{ animationDelay: `${i * 1.3}s` }}
                />
              </span>
              <div className="relative flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-brand-light ring-1 ring-white/20 transition-[rotate,scale,background-color,color] duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-light group-hover:text-brand-deep">
                  <r.icon className="size-6" strokeWidth={1.6} />
                </span>
                <span className="font-display text-[13px] font-semibold text-white/30 tabular-nums transition-colors duration-500 group-hover:text-brand-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="headline relative mt-8 text-[24px] transition-[translate] duration-500 ease-out-expo group-hover:translate-x-1">{r.title}</h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-white/70 transition-colors duration-500 group-hover:text-white/85">{r.body}</p>
              <span aria-hidden className="absolute bottom-0 left-7 h-[2px] w-0 bg-brand-light transition-[width] duration-700 ease-out-expo group-hover:w-[calc(100%-3.5rem)]" />
            </motion.li>
          ))}
        </ul>

        <Link
          href="/qhse"
          className="group mt-3 flex flex-wrap items-center justify-between gap-4 rounded-[24px] bg-white p-6 text-ink sm:p-8"
        >
          <span className="headline text-[clamp(1.5rem,2.6vw,2.2rem)]">No activity has priority over safety.</span>
          <span className="inline-flex items-center gap-2 text-[15px] font-medium text-brand">
            Our QHSE policy
            <span className="grid size-10 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="size-5" />
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
