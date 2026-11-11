import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectStack } from "@/components/home/ProjectStack";
import { Reveal } from "@/components/motion/Reveal";
import { StartQuote } from "@/components/sections/StartQuote";
import { img } from "@/content/images";

export const metadata: Metadata = { title: "Project Experience", description: "How Serviceberry delivers pipeline, commissioning and chemical solutions work." };

const roles = ["Direct contractor", "Subcontractor", "Local representative", "Technical partner", "Personnel experience"];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kp="5+000"
        label="Projects"
        title={<>Project experience <span className="text-brand">& execution.</span></>}
        intro="Technical services, equipment and chemical solutions, pipeline work and specialist support, delivered directly and through established technical relationships."
        image={img.chapterSource}
      />
      <ProjectStack id="projects" withTitle={false} />
      <section className="bg-white pb-24">
        <Reveal className="container-x">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[30px] bg-mist p-7 ring-1 ring-line sm:p-9">
            <div>
              <p className="headline text-[clamp(1.5rem,2.4vw,2rem)]">Every role, clearly labelled</p>
              <p className="mt-1 text-[15px] text-steel">Each case study says what Serviceberry did on the job.</p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {roles.map((r) => <li key={r} className="rounded-full bg-white px-4 py-2 text-[14.5px] ring-1 ring-line">{r}</li>)}
            </ul>
          </div>
        </Reveal>
      </section>
      <StartQuote type="Project Collaboration" title={<>Have a similar <span className="text-brand-light">job in mind?</span></>} />
    </>
  );
}
