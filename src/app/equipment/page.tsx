import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { EquipmentCard } from "@/components/sections/EquipmentCard";
import { SourcingTiles } from "@/components/sections/SourcingTiles";
import { StartQuote } from "@/components/sections/StartQuote";
import { equipmentForSale } from "@/content/equipment";
import { brochure, img } from "@/content/images";

export const metadata: Metadata = {
  title: "Equipment for Sale & Equipment Supply",
  description: "Equipment sourcing, procurement and rental for oil and gas projects and operations, plus selected equipment for sale.",
};

const routes = [
  { k: "A", href: "#sourcing", title: "We source & rent", body: "Tell us the duty and timeline. We find it, check the technical fit and deliver it to your base.", image: brochure.hdpeShop, cta: "What we source" },
  { k: "B", href: "#for-sale", title: "Equipment for sale", body: "Selected packages and skids available through Serviceberry, with specifications on request.", image: img.machineWhite, cta: "See what is available" },
];

const steps = [
  { t: "Tell us the duty", b: "Service, pressure, flow, size and where it is going." },
  { t: "We find and check", b: "Options from trusted makers, checked against your specification." },
  { t: "Agree the quote", b: "Price, lead time, documents and any rental terms in writing." },
  { t: "Delivered", b: "Coordinated to your base, yard, jetty or site." },
];

export default function EquipmentPage() {
  return (
    <>
      <PageHero
        kp="4+000"
        label="Equipment"
        title={<>Equipment supply <span className="text-brand">& equipment for sale.</span></>}
        intro="We source and rent equipment for project and operational requirements, and market selected equipment. Pick a route below or send us your requirement."
        image={img.procurement}
        stat={{ value: "8", label: "Equipment categories we source, check and deliver." }}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-x grid gap-3 md:grid-cols-2">
          {routes.map((r, i) => (
            <Reveal key={r.k} delay={i * 0.08}>
              <Link href={r.href} className="group relative isolate flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[32px] bg-ink p-7 text-white sm:p-9">
                <Image src={r.image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="-z-10 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#061230]/90 via-[#061230]/35 to-[#061230]/10" />
                <span className="grid size-14 place-items-center rounded-full bg-white font-display text-[22px] font-semibold text-ink">{r.k}</span>
                <div>
                  <h2 className="headline text-[clamp(2rem,3.4vw,3rem)] leading-[1.02]">{r.title}</h2>
                  <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/80">{r.body}</p>
                  <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/15 px-5 text-[15px] font-medium ring-1 ring-white/30 backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-ink">
                    {r.cta} <ArrowDown className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="sourcing" className="scroll-mt-24 bg-mist py-24 sm:py-28">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">A · We source & rent</p>
              <h2 className="headline mt-4 max-w-[16ch] text-[clamp(2.2rem,4.2vw,3.6rem)]">Equipment found, checked <span className="text-brand">and delivered</span></h2>
            </div>
            <p className="max-w-md text-[16.5px] leading-relaxed text-steel">Pick a category to start a sourcing enquiry. Not listed? Tell us the duty and we will look.</p>
          </Reveal>
          <div className="mt-12">
            <SourcingTiles />
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <Reveal>
              <h3 className="headline text-[clamp(1.8rem,3vw,2.6rem)]">How sourcing <span className="text-brand">works</span></h3>
              <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-steel">Four steps from your requirement to delivery, with one contact the whole way.</p>
            </Reveal>
            <div className="relative grid gap-6 sm:grid-cols-4">
              <span aria-hidden className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-[linear-gradient(90deg,transparent,#c9d4e5_15%,#c9d4e5_85%,transparent)] sm:block" />
              {steps.map((s, i) => (
                <Reveal key={s.t} delay={i * 0.08} className="relative text-center">
                  <span className="relative mx-auto grid size-14 place-items-center rounded-full bg-white font-display text-[17px] font-semibold text-brand shadow-[0_10px_30px_-14px_rgba(0,49,152,0.35)] ring-1 ring-line">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-4 text-[16.5px] font-semibold">{s.t}</p>
                  <p className="mt-1 text-[14.5px] leading-snug text-steel">{s.b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="for-sale" className="scroll-mt-24 bg-white py-24 sm:py-28">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">B · Equipment for sale</p>
              <h2 className="headline mt-4 max-w-[16ch] text-[clamp(2.2rem,4.2vw,3.6rem)]">Available through <span className="text-brand">Serviceberry</span></h2>
            </div>
            <p className="max-w-md text-[16.5px] leading-relaxed text-steel">Specifications, condition and documents are confirmed on request for each item.</p>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {equipmentForSale.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 4) * 0.06} className="h-full"><EquipmentCard item={e} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <StartQuote type="Equipment Sourcing" title={<>Need equipment? <span className="text-brand-light">Start here.</span></>} intro="Tell us the duty, specification and timeline. We source it, check the technical fit and coordinate delivery to your base." />
    </>
  );
}
