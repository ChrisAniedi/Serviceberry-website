"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * One part of a service's scope: a tall photo beside a filled panel with the heading and the
 * items as small cards. The two halves are the same height, so nothing floats in white space.
 * Alternate sides with `flip`.
 */
export function ScopeChapter({ n, of, heading, items, image, flip }: { n: number; of: number; heading: string; items: string[]; image: string; flip?: boolean }) {
  return (
    <div id={`scope-${n}`} className="grid scroll-mt-28 gap-3 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ duration: 1, ease }}
        className={`relative min-h-[320px] ${flip ? "lg:order-2" : ""}`}
      >
        <ParallaxImage src={image} alt="" sizes="(min-width:1024px) 50vw, 100vw" className="h-full min-h-[320px] rounded-[32px]" />
        <span className="glass-fade text-lift absolute top-5 left-5 rounded-full px-3.5 py-1.5 font-display text-[13px] font-semibold text-white">
          Scope {String(n).padStart(2, "0")} / {String(of).padStart(2, "0")}
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ duration: 1, delay: 0.1, ease }}
        className="flex flex-col rounded-[32px] bg-mist p-7 ring-1 ring-line sm:p-10"
      >
        <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">Scope {String(n).padStart(2, "0")}</p>
        <h3 className="headline mt-3 text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.02]">{heading}</h3>
        <ul className="mt-8 grid flex-1 content-end gap-2.5 sm:grid-cols-2">
          {items.map((it, i) => (
            <motion.li
              key={it}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -30px 0px" }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease }}
              className="group flex flex-col justify-between gap-6 rounded-[20px] bg-white p-5 ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(10,42,87,0.4)]"
            >
              <span className="flex items-center justify-between">
                <span className="grid size-8 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:scale-110"><Check className="size-4" strokeWidth={2.6} /></span>
                <span className="font-display text-[12.5px] font-semibold text-steel-2 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span className="text-[16px] leading-snug font-medium">{it}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
