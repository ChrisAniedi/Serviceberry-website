import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";
import { Capabilities } from "@/components/home/Capabilities";
import { AcademyBlock } from "@/components/home/AcademyBlock";
import { HoverCards } from "@/components/sections/HoverCards";
import { StartQuote } from "@/components/sections/StartQuote";
import { clientReasons, mission, values, vision } from "@/content/site";
import { brochure, img } from "@/content/images";

export const metadata: Metadata = { title: "About Us", description: "Serviceberry Global Limited is a Nigerian engineering and technical services company supporting the oil and gas, energy, process and industrial sectors." };

// Workbook section 7. TODO(verify): management to approve.
const blocks = [
  { title: "Who we are", body: "A Nigerian engineering and technical services company based in Port Harcourt, Rivers State, serving onshore and offshore oil and gas, energy, construction and process industries.", image: brochure.crewPigging },
  { title: "What we do", body: "Pipeline integrity and pigging, commissioning and maintenance, asset and process integrity, production chemicals, remote monitoring, valve services, and equipment for sale and sourcing.", image: brochure.pigOnDeck },
  { title: "How we deliver", body: "Our own crews and equipment, specialist technology partners where the job needs them, and local support close to your asset, with roles made clear on every scope.", image: img.workerPole },
  { title: "Nigerian Content", body: "In-country capability, local participation and technology transfer through our partnerships and the Serviceberry Academy.", image: img.workersStairs },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kp="0+100"
        label="About us"
        title={<>Engineering <span className="text-brand">reliability.</span></>}
        intro="Serviceberry Global Limited is a Nigerian engineering and technical services company supporting the oil and gas, energy, process and industrial sectors. Our focus is asset integrity, operational reliability and project execution."
        image={img.chapterInspect}
        grade
      />

      <section className="bg-white py-24 sm:py-28">
        <div className="container-x">
          <Title kp="0+110" label="The company" title={<>One team, <span className="text-brand">from plan to report</span></>} intro="Who we are, what we do and how a Serviceberry job runs." />
          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {blocks.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 0.08} className="group relative isolate min-h-[440px] overflow-hidden rounded-[30px] bg-ink text-white">
                <Image src={b.image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="-z-10 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#061230]/90 via-[#061230]/30 to-transparent" />
                <div className="glass-fade text-lift absolute inset-x-3 bottom-3 rounded-[24px] p-6 sm:p-7">
                  <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-brand-light uppercase">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="headline mt-2 text-[30px]">{b.title}</h2>
                  <p className="mt-2 max-w-[52ch] text-[15.5px] leading-relaxed text-white/85">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-24 sm:pb-28">
        <div className="container-x">
          <div data-nav="dark" className="relative isolate overflow-hidden rounded-[36px] bg-brand-deep text-white">
            <Image src={brochure.aerialPlant} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(0,36,118,0.95),rgba(0,49,152,0.72))]" />
            <div className="grid gap-px lg:grid-cols-2">
              {[{ k: "Our vision", v: vision }, { k: "Our mission", v: mission }].map((x, i) => (
                <Reveal key={x.k} delay={i * 0.1} className={`p-8 sm:p-12 lg:p-16 ${i === 1 ? "border-t border-white/12 lg:border-t-0 lg:border-l" : ""}`}>
                  <p className="font-display text-[13px] font-semibold tracking-[0.14em] text-brand-light uppercase">{x.k}</p>
                  <p className="headline mt-5 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.08]">{x.v}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-24 sm:py-28">
        <div className="container-x">
          <Title kp="0+200" label="Values" title={<>What we hold <span className="text-brand">ourselves to</span></>} />
          <div className="mt-12">
            <HoverCards items={values} />
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <Title size="md" title={<>To achieve the best, <span className="text-brand">offer only the best</span></>} intro="What our clients tell us they value." />
          <div className="mt-12">
            <HoverCards items={clientReasons} />
          </div>
        </div>
      </section>
      <Capabilities />
      <AcademyBlock />
      <StartQuote />
    </>
  );
}
