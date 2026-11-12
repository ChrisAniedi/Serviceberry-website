import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectFeature } from "@/components/sections/ProjectFeature";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { StartQuote } from "@/components/sections/StartQuote";
import { projects } from "@/content/projects";
import { brochure, img } from "@/content/images";

export const metadata: Metadata = { title: "Project Experience", description: "How Serviceberry delivers pipeline, commissioning and chemical solutions work." };

// What each role label on a case study means.
const roles = [
  { t: "Direct contractor", b: "We hold the contract and deliver the scope with our own crews and equipment." },
  { t: "Subcontractor", b: "We deliver a defined part of a larger contractor's scope." },
  { t: "Local representative", b: "We represent a technology owner in Nigeria: supply, support and coordination." },
  { t: "Technical partner", b: "We bring a specialist method or equipment alongside your team or contractor." },
  { t: "Personnel experience", b: "Work our people did in earlier roles, labelled as such and never claimed as company work." },
];

export default function ProjectsPage() {
  const [lead, ...rest] = projects;
  return (
    <>
      <PageHero
        kp="5+000"
        label="Projects"
        title={<>Project experience <span className="text-brand">& execution.</span></>}
        intro="Technical services, equipment and chemical solutions, pipeline work and specialist support, delivered directly and through established technical relationships."
        image={img.chapterSource}
      />

      <section className="bg-white py-24 sm:py-28">
        <div className="container-x">
          <Reveal className="mb-10">
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">Case studies</p>
            <h2 className="headline mt-4 max-w-[18ch] text-[clamp(2.2rem,4.2vw,3.6rem)]">The work, <span className="text-brand">told plainly</span></h2>
          </Reveal>
          {lead && <Reveal><ProjectFeature project={lead} /></Reveal>}
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}><ProjectCard project={p} index={i + 1} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-24 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">Every role, clearly labelled</p>
              <h2 className="headline mt-4 text-[clamp(2rem,3.6vw,3.2rem)]">What we did, <span className="text-brand">said up front</span></h2>
              <p className="mt-4 max-w-lg text-[16.5px] leading-relaxed text-steel">Each case study carries one of these labels, so you always know Serviceberry&apos;s part in the job.</p>
            </Reveal>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {roles.map((r, i) => (
                <Reveal key={r.t} delay={i * 0.05} className="group grid grid-cols-[44px_1fr] gap-4 py-5">
                  <span className="font-display text-[14px] font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-[18px] font-semibold transition-colors group-hover:text-brand">{r.t}</span>
                    <span className="mt-1 block text-[15.5px] leading-relaxed text-steel">{r.b}</span>
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[28px]">
              <Image src={brochure.crewIntelligentPig} alt="Serviceberry crew preparing an inspection run" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[28px]">
              <Image src={brochure.descalerBeforeAfter} alt="Pipe before and after descaling" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[28px]">
              <Image src={brochure.hdpePipes} alt="HDPE-lined pipe spools" fill sizes="25vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <StartQuote type="Project Collaboration" title={<>Have a similar <span className="text-brand-light">job in mind?</span></>} />
    </>
  );
}
