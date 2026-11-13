"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { spot } from "@/lib/spot";

const ease = [0.16, 1, 0.3, 1] as const;

type Item = { title: string; body: string; extra?: ReactNode };

/**
 * A grid of numbered cards that lift, light up under the pointer and grow an underline on
 * hover. `tone` picks white cards on a light section or glass cards on a dark one.
 */
export function HoverCards({ items, cols = 3, tone = "light" }: { items: Item[]; cols?: 2 | 3 | 4; tone?: "light" | "dark" }) {
  const grid = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  const dark = tone === "dark";
  return (
    <ul className={`grid gap-3 ${grid}`}>
      {items.map((it, i) => (
        <motion.li
          key={it.title}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.8, delay: (i % cols) * 0.07, ease }}
          onPointerMove={spot}
          className={`spot group relative overflow-hidden rounded-[24px] p-7 ring-1 transition-[translate,background-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 ${
            dark
              ? "bg-white/[0.06] text-white ring-white/12 backdrop-blur-xl hover:bg-white/[0.1]"
              : "bg-white text-ink ring-line hover:shadow-[0_30px_60px_-30px_rgba(10,22,48,0.4)] [--spot-edge:rgba(7,76,189,0.5)] [--spot:rgba(7,76,189,0.06)]"
          }`}
        >
          <span className={`font-display text-[40px] leading-none font-light tabular-nums transition-colors duration-500 ${dark ? "text-brand-light/70 group-hover:text-brand-light" : "text-brand-light group-hover:text-brand"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="headline mt-8 text-[24px] transition-[translate] duration-500 ease-out-expo group-hover:translate-x-1">{it.title}</h3>
          <p className={`mt-2 text-[15.5px] leading-relaxed ${dark ? "text-white/70" : "text-steel"}`}>{it.body}</p>
          {it.extra}
          <span aria-hidden className={`absolute bottom-0 left-7 h-[2px] w-0 transition-[width] duration-700 ease-out-expo group-hover:w-[calc(100%-3.5rem)] ${dark ? "bg-brand-light" : "bg-brand"}`} />
        </motion.li>
      ))}
    </ul>
  );
}
