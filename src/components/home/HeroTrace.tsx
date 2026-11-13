"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.65, 0, 0.35, 1] as const;
// A made-up wall-thickness trace for the illustration: mostly flat, one feature.
const LINE = "M0 70 C20 66 30 74 46 68 S70 60 84 66 S104 40 116 22 S130 58 142 60 S168 48 184 54 S210 62 228 50 L240 46";
const AREA = `${LINE} L240 120 L0 120 Z`;

/** Hero side card: an illustrated in-line inspection trace with a marked feature. */
export function HeroTrace() {
  const reduce = useReducedMotion();
  return (
    <div className="hero-glass relative w-full max-w-[290px] p-5">
      <p className="text-[19px] leading-snug font-normal text-white">Read the whole line, metre by metre</p>
      <div className="relative mt-12">
        <svg viewBox="0 0 240 120" className="h-auto w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="trace-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#a9c8ff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#a9c8ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 80, 120, 160, 200].map((x) => (
            <line key={x} x1={x} x2={x} y1="0" y2="120" stroke="white" strokeOpacity="0.18" strokeDasharray="2 4" />
          ))}
          <motion.path d={AREA} fill="url(#trace-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} />
          <motion.path
            d={LINE}
            fill="none"
            stroke="#a9c8ff"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 1.8, ease }}
          />
          <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.8, duration: 0.5 }} style={{ transformOrigin: "116px 22px" }}>
            <circle cx="116" cy="22" r="5" fill="white" />
            {!reduce && (
              <circle cx="116" cy="22" r="5" fill="none" stroke="white">
                <animate attributeName="r" values="5;13" dur="2s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
          </motion.g>
        </svg>
        <motion.span
          className="absolute -top-7 left-[48%] -translate-x-1/2 rounded-full bg-white px-2.5 py-1 text-[12px] font-medium whitespace-nowrap text-ink"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          Feature · KP 2+350
        </motion.span>
      </div>
      <p className="mt-4 flex items-center justify-between text-[12px] text-white/55">
        <span>Wall thickness, sample run</span>
        <span>Illustration</span>
      </p>
    </div>
  );
}
