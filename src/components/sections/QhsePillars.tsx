"use client";

import { motion } from "motion/react";
import { BadgeCheck, HardHat, Leaf, RefreshCw } from "lucide-react";
import { spot } from "@/lib/spot";

const ease = [0.16, 1, 0.3, 1] as const;

const pillars = [
  { icon: BadgeCheck, title: "Quality", body: "Planned scopes, calibrated equipment, competent people and documented results on every job.", points: ["Planned scopes", "Calibrated equipment", "Documented results"] },
  { icon: HardHat, title: "Health & safety", body: "Permit-to-work discipline, job hazard analysis and stop-work authority for everyone on site.", points: ["Permit to work", "Job hazard analysis", "Stop-work authority"] },
  { icon: Leaf, title: "Environment", body: "Controlled handling of chemicals, pigging waste and test water, and respect for host communities.", points: ["Chemical handling", "Waste and test water", "Host communities"] },
  { icon: RefreshCw, title: "Improvement", body: "Incidents and near misses are reported, learned from and closed out.", points: ["Report", "Learn", "Close out"] },
];

/**
 * The four QHSE pillars. Health & safety leads on deep navy (white text, light-blue icon,
 * so it clears contrast comfortably); the others are white cards. All light up under the pointer.
 */
export function QhsePillars() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((p, i) => {
        const lead = i === 1;
        return (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.8, delay: i * 0.07, ease }}
            onPointerMove={spot}
            className={`spot group relative flex min-h-[380px] flex-col overflow-hidden rounded-[26px] p-7 ring-1 transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(11,26,62,0.5)] ${
              lead ? "bg-brand-deep text-white ring-white/10" : "bg-white text-ink ring-line [--spot-edge:rgba(7,76,189,0.5)] [--spot:rgba(7,76,189,0.06)]"
            }`}
          >
            <div className="flex items-start justify-between">
              <span className={`grid size-14 place-items-center rounded-2xl transition-[rotate,scale] duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110 ${lead ? "bg-brand-light text-brand-deep" : "bg-brand-soft text-brand"}`}>
                <p.icon className="size-7" strokeWidth={1.6} />
              </span>
              <span className={`font-display text-[13px] font-semibold tabular-nums ${lead ? "text-brand-light" : "text-steel-2"}`}>{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h2 className="headline mt-12 text-[30px]">{p.title}</h2>
            <p className={`mt-3 text-[15.5px] leading-relaxed ${lead ? "text-white/80" : "text-steel"}`}>{p.body}</p>
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
              {p.points.map((x) => (
                <li key={x} className={`rounded-full px-3 py-1 text-[12.5px] font-medium ${lead ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-mist text-ink"}`}>{x}</li>
              ))}
            </ul>
          </motion.article>
        );
      })}
    </div>
  );
}
