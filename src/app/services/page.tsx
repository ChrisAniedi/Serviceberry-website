import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceBento } from "@/components/sections/ServiceBento";
import { StartQuote } from "@/components/sections/StartQuote";
import { partners } from "@/content/partners";
import { brochure, img } from "@/content/images";

export const metadata: Metadata = {
  title: "Services",
  description: "Pipeline integrity and pigging, commissioning, asset and process integrity, specialty chemicals, remote monitoring, valve services and equipment procurement.",
};

const steps = [
  { t: "Survey & plan", b: "We read the asset and your production plan, then agree a method, equipment and crew." },
  { t: "Mobilise", b: "Our crews and equipment, with any specialist partner, arrive with permits and a job safety plan." },
  { t: "Do the work", b: "Executed to the plan, safely, with your operators kept in the loop." },
  { t: "Report & hand over", b: "Results measured and documented in a clear report you can act on." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kp="1+000"
        label="Services"
        title={<>Process & <span className="text-brand">pipeline services.</span></>}
        intro="Integrated services for onshore and offshore oil and gas, energy, construction and process industries, delivered directly and through specialist technology partners."
        image={img.chapterClean}
        stat={{ value: "7", label: "Service lines, delivered by one accountable team." }}
      />

      <section className="bg-white py-24 sm:py-28">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">Service lines</p>
              <h2 className="headline mt-4 max-w-[18ch] text-[clamp(2.2rem,4.4vw,3.8rem)]">Seven service lines. <span className="text-brand">One accountable team.</span></h2>
            </div>
            <p className="max-w-md text-[16.5px] leading-relaxed text-steel">Every scope says who does what: our own crews and equipment, and specialist partners where the job needs them.</p>
          </Reveal>
          <div className="mt-12">
            <ServiceBento />
          </div>
        </div>
      </section>

      <section className="bg-mist py-24 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
              <Image src={brochure.crewPigging} alt="Serviceberry crew preparing a pigging run" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -right-3 -bottom-6 hidden w-[46%] overflow-hidden rounded-[24px] ring-8 ring-mist sm:block">
              <div className="relative aspect-[4/3]">
                <Image src={brochure.pigOnDeck} alt="" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">How a job runs</p>
              <h2 className="headline mt-4 text-[clamp(2rem,3.6vw,3.2rem)]">From the first call <span className="text-brand">to the final report</span></h2>
            </Reveal>
            <div className="mt-10 space-y-2">
              {steps.map((s, i) => (
                <Reveal key={s.t} delay={i * 0.08}>
                  <div className="group grid grid-cols-[56px_1fr] gap-4 rounded-[22px] p-4 transition-colors duration-500 hover:bg-white">
                    <span className="grid size-14 place-items-center rounded-2xl bg-white font-display text-[18px] font-semibold text-brand ring-1 ring-line transition-colors duration-500 group-hover:bg-brand group-hover:text-white group-hover:ring-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pt-1">
                      <span className="block text-[18px] font-semibold">{s.t}</span>
                      <span className="mt-1 block text-[15.5px] leading-relaxed text-steel">{s.b}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <Reveal className="container-x">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[30px] bg-paper p-7 ring-1 ring-line sm:p-9">
            <div>
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">With specialist partners</p>
              <p className="headline mt-2 text-[clamp(1.5rem,2.4vw,2rem)]">Technology where the job needs it</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {partners.map((p) => (
                <Link key={p.slug} href={`/partners#${p.slug}`} className="rounded-full bg-white px-4 py-2 text-[15px] font-medium ring-1 ring-line transition-colors hover:text-brand hover:ring-brand/40">{p.name}</Link>
              ))}
              <Link href="/partners" className="group ml-1 inline-flex items-center gap-1 text-[15px] font-medium text-brand">All partners <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
            </div>
          </div>
        </Reveal>
      </section>
      <StartQuote />
    </>
  );
}
