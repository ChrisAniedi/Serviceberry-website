"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { brochure } from "@/content/images";
import { site } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Closing call to action, after the back page of the brochure: "Achieve more with Efficient
 * Engineering." on a large rounded panel over the aerial photo, with a glass card of the
 * quickest ways to reach the team.
 */
export function Closing({ id = "kp-7" }: { id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  const rows = [
    { icon: Phone, label: "Call", value: site.phones[0], href: `tel:${site.phones[0].replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Visit", value: "Elelenwo, Port Harcourt", href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}` },
  ];

  return (
    <section ref={ref} id={id} className="scroll-mt-20 bg-white px-[var(--gutter)] py-16 sm:py-20">
      <div className="relative isolate mx-auto max-w-[1600px] overflow-hidden rounded-[36px] bg-brand-deep text-white">
        <motion.div className="absolute inset-0 -z-10" style={{ scale, y }}>
          <Image src={brochure.aerialPlant} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(0,36,118,0.95)_0%,rgba(0,49,152,0.82)_45%,rgba(7,76,189,0.4)_100%)]" />
        <div aria-hidden className="absolute -bottom-40 -left-24 -z-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(182,52,75,0.28),transparent)]" />

        <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }} transition={{ duration: 1, ease }}>
            <p className="font-display text-[clamp(1.2rem,2vw,1.7rem)] font-light tracking-[-0.02em] text-white/80">Achieve more with</p>
            <h2 className="headline mt-2 text-[clamp(3rem,7.4vw,6.6rem)] leading-[0.95]">
              Efficient <span className="text-brand-light">Engineering.</span>
            </h2>
            <p className="mt-6 flex items-center gap-4 text-[clamp(1rem,1.4vw,1.2rem)] text-white/85">
              <span className="h-[2px] w-12 bg-berry" /> Let&apos;s create value together today.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/request-a-quote">Get a quote</Button>
              <Button href="/contact" variant="glass">Talk to our team</Button>
            </div>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="divide-y divide-white/10 rounded-[24px] bg-white/[0.07] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] ring-1 ring-white/15 backdrop-blur-xl"
          >
            {rows.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  target={r.label === "Visit" ? "_blank" : undefined}
                  rel={r.label === "Visit" ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-[18px] px-4 py-4 transition-colors hover:bg-white/[0.08]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-brand-light">
                    <r.icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] text-white/60">{r.label}</span>
                    <span className="block truncate text-[15.5px] font-medium">{r.value}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
