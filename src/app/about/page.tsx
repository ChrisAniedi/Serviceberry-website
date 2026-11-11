import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";
import { Capabilities } from "@/components/home/Capabilities";
import { AcademyBlock } from "@/components/home/AcademyBlock";
import { StartJob } from "@/components/sections/StartJob";
import { clientReasons, mission, values, vision } from "@/content/site";
import { img } from "@/content/images";

export const metadata: Metadata = { title: "About Us", description: "Serviceberry Global Limited is a Nigerian engineering and technical services company supporting the oil and gas, energy, process and industrial sectors." };

// Workbook section 7. TODO(verify): management to approve.
const blocks = [
  { title: "Who we are", body: "A Nigerian engineering and technical services company based in Port Harcourt, Rivers State, serving onshore and offshore oil and gas, energy, construction and process industries.", image: img.engPhone },
  { title: "What we do", body: "Pipeline integrity and pigging, commissioning and maintenance, asset and process integrity, production chemicals, remote monitoring, valve services, and equipment for sale and sourcing.", image: img.pigging },
  { title: "How we deliver", body: "Our own crews and equipment, specialist technology partners where the job needs them, and local support close to your asset, with roles made clear on every scope.", image: img.workerPole },
  { title: "Nigerian Content", body: "In-country capability, local participation and technology transfer through our partnerships and the Serviceberry Academy.", image: img.workersStairs },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kp="0+100"
        label="About us"
        title={<>Engineering<br /><span className="text-brand">reliability</span></>}
        intro="Serviceberry Global Limited is a Nigerian engineering and technical services company supporting the oil and gas, energy, process and industrial sectors. Our focus is asset integrity, operational reliability and project execution."
        image={img.chapterInspect}
      />
      <section className="bg-white py-24 sm:py-28">
        <div className="container-x grid gap-4 md:grid-cols-2">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={(i % 2) * 0.08} className="group grid grid-cols-[120px_1fr] gap-5 bg-mist p-4 sm:grid-cols-[170px_1fr] sm:p-5">
              <div className="chamfer relative aspect-[3/4] overflow-hidden">
                <Image src={b.image} alt="" fill sizes="170px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="py-2">
                <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-brand uppercase">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="headline mt-2 text-[29px]">{b.title}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-steel">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-brand-deep py-24 text-white sm:py-28">
        <div className="container-x grid gap-px bg-white/15 lg:grid-cols-2">
          {[{ k: "Our vision", v: vision }, { k: "Our mission", v: mission }].map((x) => (
            <Reveal key={x.k} className="bg-brand-deep p-2 lg:p-10">
              <p className="font-display text-[13px] font-semibold tracking-[0.12em] text-berry-light uppercase">{x.k}</p>
              <p className="headline mt-4 text-[clamp(1.6rem,2.52vw,2.35rem)] leading-[1.02]">{x.v}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-white py-24 sm:py-28">
        <div className="container-x">
          <Title kp="0+200" label="Values" title={<>What we hold<br /><span className="text-brand">ourselves to</span></>} />
          <div className="mt-12 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.05} className="border-r border-b border-line p-7">
                <p className="font-display text-[44px] leading-none font-bold text-berry-light">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="headline mt-5 text-[24px]">{v.title}</h3>
                <p className="mt-2 text-[16px] text-steel">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-mist py-24">
        <div className="container-x">
          <Title size="md" title={<>To achieve the best,<br /><span className="text-brand">offer only the best</span></>} intro="What our clients tell us they value." />
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {clientReasons.map((r) => (
              <Reveal key={r.title} className="border-t-[3px] border-brand pt-5">
                <h3 className="headline text-[22px]">{r.title}</h3>
                <p className="mt-2 text-[16px] text-steel">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Capabilities />
      <AcademyBlock />
      <StartJob />
    </>
  );
}
