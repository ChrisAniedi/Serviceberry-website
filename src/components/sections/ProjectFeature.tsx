import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Illustrative } from "@/components/ui/Illustrative";
import type { Project } from "@/content/projects";

/** A project as a wide split card: the photo on one side, the story in brief on the other. */
export function ProjectFeature({ project, label = "Featured project" }: { project: Project; label?: string }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group grid overflow-hidden rounded-[32px] bg-white ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(10,22,48,0.45)] lg:grid-cols-[1.25fr_1fr]">
      <div className="relative m-2 overflow-hidden rounded-[26px]">
        <ParallaxImage src={project.image} alt="" sizes="(min-width:1024px) 55vw, 100vw" className="h-full min-h-[300px] transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.03] lg:min-h-[460px]" />
        <span className="glass-fade text-lift absolute top-4 left-4 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white">{project.type}</span>
        {!project.verified && <Illustrative className="absolute top-4 right-4" />}
      </div>
      <div className="flex flex-col p-7 sm:p-10">
        <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-brand uppercase">{label}</p>
        <h3 className="headline mt-3 text-[clamp(1.8rem,2.8vw,2.6rem)] leading-[1.02]">{project.title}</h3>
        <p className="mt-4 text-[16px] leading-relaxed text-steel">{project.caseStudy.overview}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.scope.map((s) => (
            <li key={s} className="rounded-full bg-mist px-3.5 py-1.5 text-[13.5px] text-ink">{s}</li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
          <p className="text-[14.5px] text-steel">{project.location} · {project.role}</p>
          <span className="inline-flex items-center gap-2 font-display text-[15px] font-semibold text-ink">
            Read the case study
            <span className="grid size-10 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="size-5" /></span>
          </span>
        </div>
      </div>
    </Link>
  );
}
