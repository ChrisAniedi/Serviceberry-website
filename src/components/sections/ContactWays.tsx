"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, telLink, waLink } from "@/content/site";
import { spot } from "@/lib/spot";

const ease = [0.16, 1, 0.3, 1] as const;

/** The four ways to reach the team, as large cards that lift and light up under the pointer. */
export function ContactWays() {
  const ways = [
    { icon: WhatsAppIcon, k: "WhatsApp", v: site.whatsapp, note: "Fastest for photos and quick questions", href: waLink(), ext: true, tone: "wa" },
    { icon: Phone, k: "Call", v: site.phones[0], note: `Or ${site.phones[1]}`, href: telLink(site.phones[0]), ext: false, tone: "" },
    { icon: Mail, k: "Email", v: site.email, note: "For drawings, tenders and documents", href: `mailto:${site.email}`, ext: false, tone: "" },
    { icon: MapPin, k: "Visit", v: "Elelenwo, Port Harcourt", note: site.address.lines[0], href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`, ext: true, tone: "" },
  ];
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {ways.map((w, i) => (
        <motion.li key={w.k} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -40px 0px" }} transition={{ duration: 0.8, delay: i * 0.07, ease }}>
          <a
            href={w.href}
            target={w.ext ? "_blank" : undefined}
            rel={w.ext ? "noopener noreferrer" : undefined}
            onPointerMove={spot}
            className={`spot group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-[26px] p-6 ring-1 transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(10,22,48,0.45)] ${
              w.tone === "wa" ? "bg-[#0b2a1c] text-white ring-[#25d366]/25 [--spot-edge:rgba(37,211,102,0.8)] [--spot:rgba(37,211,102,0.16)]" : "bg-white ring-line [--spot-edge:rgba(11,79,191,0.5)] [--spot:rgba(11,79,191,0.06)]"
            }`}
          >
            <div className="flex items-start justify-between">
              <span className={`grid size-12 place-items-center rounded-2xl transition-[rotate,scale] duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110 ${w.tone === "wa" ? "bg-[#25d366] text-[#06281a]" : "bg-brand-soft text-brand"}`}>
                <w.icon className="size-[22px]" />
              </span>
              <ArrowUpRight className={`size-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${w.tone === "wa" ? "text-white/60" : "text-steel-2"}`} />
            </div>
            <p className={`mt-auto pt-10 font-display text-[13px] font-semibold tracking-[0.12em] uppercase ${w.tone === "wa" ? "text-[#7fe0ad]" : "text-brand"}`}>{w.k}</p>
            <p className="mt-1.5 text-[19px] font-semibold tracking-[-0.01em] break-words">{w.v}</p>
            <p className={`mt-1 text-[14px] ${w.tone === "wa" ? "text-white/60" : "text-steel"}`}>{w.note}</p>
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
