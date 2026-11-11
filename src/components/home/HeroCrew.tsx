"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { img } from "@/content/images";

/** Hero side card: a crew photo in viewfinder corners with a scan line passing over it. */
export function HeroCrew() {
  const reduce = useReducedMotion();
  const corner = "absolute size-4 border-white";
  return (
    <div className="relative w-full max-w-[290px] border border-white/25 bg-white/[0.06] p-5 pb-8 backdrop-blur-md">
      <p className="text-[19px] leading-snug font-normal text-white">Pigging and inspection, planned with your operators</p>
      <div className="relative mt-5 aspect-[4/3.4]">
        <div className="absolute inset-3 overflow-hidden">
          <Image src={img.engPortrait} alt="Engineer in safety gear" fill sizes="260px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-white/25 to-transparent"
              animate={{ top: ["-15%", "100%"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
            />
          )}
        </div>
        <span className={`${corner} top-0 left-0 border-t border-l`} />
        <span className={`${corner} top-0 right-0 border-t border-r`} />
        <span className={`${corner} bottom-0 left-0 border-b border-l`} />
        <span className={`${corner} right-0 bottom-0 border-r border-b`} />
      </div>
      <Link
        href="/services/pipeline-integrity-pigging"
        aria-label="Pipeline Integrity & Pigging"
        className="absolute -bottom-7 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(255,198,92,0.6)] transition-transform hover:scale-105"
      >
        <ArrowUpRight className="size-6" />
      </Link>
    </div>
  );
}
