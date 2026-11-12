"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";

const ease = [0.16, 1, 0.3, 1] as const;

// Grid placement per card on large screens (7 cards over 4 columns).
const span = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "",
  "",
  "lg:col-span-2",
  "",
  "",
];

/** The seven service lines as a photo grid: one large lead card and six around it. */
export function ServiceBento() {
  return (
    <div className="grid auto-rows-[minmax(280px,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <motion.div
          key={s.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.9, delay: (i % 4) * 0.06, ease }}
          className={span[i] ?? ""}
        >
          <Link href={`/services/${s.slug}`} className="group relative isolate flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[28px] bg-ink p-6 text-white sm:p-7">
            <Image src={s.image} alt="" fill sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 100vw"} className="-z-10 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070b16]/90 via-[#070b16]/30 to-[#070b16]/10" />
            <div className="flex items-start justify-between">
              <span className="glass-fade text-lift rounded-full px-3 py-1 font-display text-[12.5px] font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="grid size-10 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="size-5" /></span>
            </div>
            <div>
              <h3 className={`headline leading-[1.02] ${i === 0 ? "text-[clamp(2rem,3.4vw,3rem)]" : "text-[clamp(1.5rem,2vw,1.9rem)]"}`}>{s.title}</h3>
              <p className={`mt-3 max-w-[46ch] text-[15px] leading-relaxed text-white/75 ${i === 0 ? "" : "line-clamp-2"}`}>{s.short}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
