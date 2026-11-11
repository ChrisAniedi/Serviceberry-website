import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectStack } from "@/components/home/ProjectStack";
import { Reveal } from "@/components/motion/Reveal";
import { StartJob } from "@/components/sections/StartJob";
import { img } from "@/content/images";

export const metadata: Metadata = { title: "Project Experience", description: "How Serviceberry delivers pipeline, commissioning and chemical solutions work." };

const roles = ["Direct contractor", "Subcontractor", "Local representative", "Technical partner", "Personnel experience"];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kp="5+000"
        label="Projects"
        title={<>Project experience<br /><span className="text-brand">& execution</span></>}
        intro="Technical services, equipment and chemical solutions, pipeline work and specialist support, delivered directly and through established technical relationships."
        image={img.chapterSource}
      />
      <ProjectStack id="projects" withTitle={false} />
      <section className="bg-mist py-16">
        <Reveal className="container-x flex flex-wrap items-center justify-between gap-6">
          <p className="headline text-[25px]">Every role, clearly labelled</p>
          <ul className="flex flex-wrap gap-2">
            {roles.map((r) => <li key={r} className="bg-white px-4 py-2 text-[15px] ring-1 ring-line">{r}</li>)}
          </ul>
        </Reveal>
      </section>
      <StartJob />
    </>
  );
}
