"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { EquipmentCard } from "@/components/sections/EquipmentCard";
import { equipmentForSale, sourcingCategories } from "@/content/equipment";

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
                {sourcingCategories.map((c, i) => (
                  <div key={c.title} className="bg-white p-6">
                    <span className="font-display text-[14px] font-semibold text-steel-2">{String(i + 1).padStart(2, "0")}</span>
                    <p className="headline mt-4 text-[22px]">{c.title}</p>
                    <p className="mt-2 text-[15px] text-steel">{c.body}</p>
                  </div>
                ))}
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
