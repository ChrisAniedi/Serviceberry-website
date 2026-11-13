"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Check, ChevronDown, Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { img } from "@/content/images";
import { quoteBand, quoteNeeds } from "@/content/quote";
import { site, telLink, waLink } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

const promises = [
  "A method, a scope and a price for your job",
  "Local crews and equipment, close to your asset",
  "A clear report at the end of every job",
];

const field =
  "w-full rounded-2xl bg-white/[0.06] px-4 py-3.5 text-[15.5px] text-white ring-1 ring-white/15 outline-none transition-[box-shadow,background-color] placeholder:text-white/40 focus:bg-white/[0.1] focus:ring-2 focus:ring-brand-light";

type Props = {
  id?: string;
  title?: ReactNode;
  intro?: string;
  /** Pre-selects the quick-quote type, e.g. "Equipment Sourcing" on the equipment page. */
  type?: string;
  /** A starting line for the "What do you need?" box. */
  need?: string;
};

/**
 * "Start your quote" for the end of inner pages: the promise and the three fastest ways to
 * reach the team (WhatsApp, phone, email) on the left, a quick-quote card on the right that
 * carries its answers into the full quote page, and an outlined word band underneath.
 */
export function StartQuote({ id = "quote", title = "Start your quote", intro, type = "Services", need = "" }: Props) {
  return (
    <section id={id} data-nav="dark" className="relative isolate scroll-mt-20 overflow-hidden bg-[#061230] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image src={img.nightPlant3} alt="" fill sizes="100vw" className="object-cover opacity-[0.16] grayscale" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_75%_30%,rgba(7,76,189,0.38),transparent_70%),linear-gradient(180deg,#061230_0%,rgba(6,18,48,0.7)_40%,#061230_100%)]" />
      </div>

      <div className="container-x grid gap-12 pt-24 pb-10 sm:pt-28 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }} transition={{ duration: 0.9, ease }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[13px] font-medium text-white/85 ring-1 ring-white/15">
            <span className="relative grid size-2 place-items-center">
              <span className="absolute size-2 animate-ping rounded-full bg-[#25d366]/60" />
              <span className="size-2 rounded-full bg-[#25d366]" />
            </span>
            Talk to an engineer in Port Harcourt
          </p>
          <h2 className="headline mt-6 text-[clamp(2.6rem,5.6vw,4.8rem)] leading-[0.98]">{title}</h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/70">
            {intro ?? "Tell us what you need and where. We come back with questions, a method and a price, and we keep you posted on every step."}
          </p>
          <ul className="mt-8 space-y-3">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15.5px] text-white/85">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-light/15 text-brand-light ring-1 ring-brand-light/30">
                  <Check className="size-3.5" strokeWidth={2.6} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#25d366] px-5 font-display text-[15px] font-semibold text-[#06281a] shadow-[0_14px_30px_-14px_rgba(37,211,102,0.7)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#2fe072]"
            >
              <WhatsAppIcon className="size-5" /> WhatsApp us
            </a>
            <a href={telLink(site.phones[0])} className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white/[0.06] px-5 font-display text-[15px] font-medium ring-1 ring-white/20 transition-colors hover:bg-white/[0.12]">
              <Phone className="size-[18px] text-brand-light" /> {site.phones[0]}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white/[0.06] px-5 font-display text-[15px] font-medium ring-1 ring-white/20 transition-colors hover:bg-white/[0.12]">
              <Mail className="size-[18px] text-brand-light" /> Email
            </a>
          </div>
        </motion.div>

        <motion.form
          action="/request-a-quote"
          method="get"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.9, delay: 0.12, ease }}
          className="relative rounded-[30px] bg-white/[0.05] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_40px_80px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/12 backdrop-blur-2xl sm:p-8"
        >
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-display text-[21px] font-semibold tracking-[-0.01em]">Quick quote</p>
            <p className="text-[13px] text-white/50">Takes under a minute</p>
          </div>

          <label htmlFor={`${id}-type`} className="mt-6 mb-2 block font-display text-[12px] font-semibold tracking-[0.12em] text-white/60 uppercase">I need</label>
          <div className="relative">
            <select id={`${id}-type`} name="type" defaultValue={type} className={`${field} appearance-none pr-11 [&>option]:text-ink`}>
              {quoteNeeds.map((n) => (
                <option key={n.id} value={n.type}>{n.title}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-white/60" />
          </div>

          <label htmlFor={`${id}-need`} className="mt-5 mb-2 block font-display text-[12px] font-semibold tracking-[0.12em] text-white/60 uppercase">What do you need?</label>
          <textarea id={`${id}-need`} name="details" rows={3} defaultValue={need} placeholder="e.g. cleaning pig runs on a 12-inch, 8 km flowline" className={`${field} resize-none`} />

          <label htmlFor={`${id}-where`} className="mt-5 mb-2 block font-display text-[12px] font-semibold tracking-[0.12em] text-white/60 uppercase">Where</label>
          <input id={`${id}-where`} name="location" placeholder="Field, facility or city" className={field} />

          <button
            type="submit"
            className="group mt-7 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-white font-display text-[15.5px] font-semibold text-ink transition-colors hover:bg-brand-light"
          >
            Continue to quote <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-3 text-center text-[13px] text-white/45">You add your contact details on the next page.</p>
        </motion.form>
      </div>

      {/* outlined word band */}
      <div aria-hidden className="relative overflow-hidden pb-6 select-none">
        <div className="flex w-max animate-marquee [--marquee-duration:60s]">
          {[0, 1].map((k) => (
            <p key={k} className="flex shrink-0 items-center whitespace-nowrap font-display text-[clamp(4rem,10vw,9rem)] leading-none font-semibold tracking-[-0.03em] text-transparent uppercase [-webkit-text-stroke:1px_rgba(255,255,255,0.13)]">
              {quoteBand.map((w) => (
                <span key={w} className="flex items-center">
                  {w}
                  <span className="mx-[0.35em] inline-block size-[0.12em] rounded-full ring-1 ring-white/20" />
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
