"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Cog, Cylinder, Droplet, Factory, FlaskConical, Gauge, Wind, Wrench } from "lucide-react";
import { useState } from "react";
import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { EquipmentCard } from "@/components/sections/EquipmentCard";
import { equipmentForSale, sourcingCategories } from "@/content/equipment";
import { spot } from "@/lib/spot";

// One icon per sourcing category, in the order of `sourcingCategories`.
const icons = [Droplet, Cog, Wind, Wrench, FlaskConical, Cylinder, Factory, Gauge];

/** Equipment sourcing (first, the default) and equipment for sale, kept separate by a two-way switch. */
export function EquipmentShelf({ id = "kp-4", withTitle = true }: { id?: string; withTitle?: boolean }) {
  // Sourcing comes first: Serviceberry supplies and rents far more equipment than it sells.
  const [tab, setTab] = useState<"sale" | "source">("source");
  return (
    <section id={id} className="scroll-mt-20 bg-mist py-24 sm:py-32">
      <div className="container-x">
        {withTitle && (
          <Title
            kp="4+000"
            label="Equipment"
            title={<>Equipment sourcing<br /><span className="text-brand">& equipment for sale</span></>}
            intro="Sourcing, procurement and rental support for project and operational requirements, plus selected equipment available through Serviceberry."
          />
        )}
        <div role="tablist" aria-label="Equipment" className={`inline-flex rounded-full bg-white p-1 ring-1 ring-line ${withTitle ? "mt-12" : ""}`}>
          {([["source", "A · We source"], ["sale", "B · For sale"]] as const).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className="relative min-h-11 rounded-full px-5 font-display text-[16px] font-semibold"
            >
              {tab === k && <motion.span layoutId="eq-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.35 }} />}
              <span className={`relative ${tab === k ? "text-white" : "text-ink"}`}>{label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "sale" ? (
            <motion.div key="sale" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="bleed-x mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {equipmentForSale.map((e) => <EquipmentCard key={e.slug} item={e} />)}
            </motion.div>
          ) : (
            <motion.div key="source" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="mt-8">
              <div className="bleed-x grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                {sourcingCategories.map((c, i) => {
                  const Icon = icons[i % icons.length];
                  return (
                    <motion.div
                      key={c.title}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-white"
                    >
                      <Link
                        href={`/request-a-quote?type=Equipment%20Sourcing&subject=${encodeURIComponent(c.title)}`}
                        onPointerMove={spot}
                        className="spot group relative flex h-full flex-col overflow-hidden p-6 transition-colors duration-500 [--spot-edge:rgba(7,76,189,0.55)] [--spot:rgba(7,76,189,0.07)] hover:bg-paper"
                      >
                        <div className="flex items-start justify-between">
                          <span className="grid size-11 place-items-center rounded-xl bg-mist text-brand ring-1 ring-line transition-[background-color,color,rotate,scale] duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
                            <Icon className="size-5" strokeWidth={1.7} />
                          </span>
                          <span className="flex items-center gap-1.5 font-display text-[14px] font-semibold text-steel-2 tabular-nums transition-colors group-hover:text-brand">
                            {String(i + 1).padStart(2, "0")}
                            <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-[opacity,translate] duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                          </span>
                        </div>
                        <p className="headline mt-6 text-[22px] transition-[translate] duration-500 ease-out-expo group-hover:translate-x-1">{c.title}</p>
                        <p className="mt-2 text-[15px] text-steel">{c.body}</p>
                        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[13.5px] font-medium text-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                          Source this <ArrowUpRight className="size-3.5" />
                        </span>
                        <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand transition-[width] duration-700 ease-out-expo group-hover:w-full" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 bg-white p-6 ring-1 ring-line">
                <p className="max-w-xl text-[16px] text-steel">Not listed? Tell us the duty, specification and timeline. We source it, check the technical fit and coordinate delivery.</p>
                <Button href="/request-a-quote?type=Equipment%20Sourcing">Submit a sourcing enquiry</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
