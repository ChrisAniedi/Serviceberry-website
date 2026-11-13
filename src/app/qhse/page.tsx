import type { Metadata } from "next";
import Image from "next/image";
import { FileText } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";
import { QhsePillars } from "@/components/sections/QhsePillars";
import { StartQuote } from "@/components/sections/StartQuote";
import { brochure, img } from "@/content/images";

export const metadata: Metadata = { title: "QHSE", description: "Serviceberry's commitment to quality, health, safety and the environment." };

/** TODO(verify): publish only current, approved certificates (issuing body and dates). */
const certificates: { name: string; body: string; issued: string; expires: string }[] = [];

export default function QhsePage() {
  return (
    <>
      <PageHero
        kp="3+500"
        label="QHSE"
        title={<>Safety comes <span className="text-brand">before schedule.</span></>}
        intro="Quality, health, safety and environmental performance protect our people, your assets and the communities we work in."
        image={img.workerHardhat}
      />

      <section className="bg-white py-24 sm:py-28">
        <div className="container-x">
          <Title kp="3+510" label="Our commitments" title={<>Four things we <span className="text-brand">never trade away</span></>} intro="Every scope is planned, checked and closed out against the same four pillars." />
          <div className="mt-12">
            <QhsePillars />
          </div>
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="container-x">
          <Reveal className="relative isolate grid overflow-hidden rounded-[36px] bg-[#061230] text-white lg:grid-cols-2">
            <div className="relative min-h-[320px] lg:min-h-[520px]">
              <Image src={brochure.qhseEngineer} alt="A Serviceberry engineer in safety gear" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061230] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#061230]" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand-light uppercase">On every site</p>
              <p className="headline mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.02]">No activity has priority over safety.</p>
              <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-white/70">
                Anyone on a Serviceberry job can stop the work if something is not safe. The work starts again only when the risk is dealt with.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <h2 className="headline text-[clamp(1.8rem,3.4vw,2.85rem)]">Policies & <span className="text-brand">certificates</span></h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-steel">Our current QHSE policy and certificates are shared on request, so you always get the latest approved copy.</p>
          </Reveal>
          <Reveal className="rounded-[30px] bg-white p-7 ring-1 ring-line sm:p-9">
            {certificates.length === 0 ? (
              <>
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><FileText className="size-6" strokeWidth={1.6} /></span>
                  <div>
                    <p className="text-[17px] font-semibold">QHSE policy and certificates</p>
                    <p className="text-[14.5px] text-steel">Sent by email, current versions only</p>
                  </div>
                </div>
                <Button href="/contact?type=Other&subject=QHSE%20documents" className="mt-7">Ask for a copy</Button>
              </>
            ) : (
              <ul className="divide-y divide-line">{certificates.map((c) => <li key={c.name} className="py-4"><b>{c.name}</b> · {c.body} · {c.issued}–{c.expires}</li>)}</ul>
            )}
          </Reveal>
        </div>
      </section>
      <StartQuote />
    </>
  );
}
