import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { Illustrative } from "@/components/ui/Illustrative";

/** Compact project card used on service pages and the projects grid. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block overflow-hidden rounded-[26px] bg-white ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(12,26,43,0.45)]">
      <div className="relative m-2 aspect-[4/3] overflow-hidden rounded-[20px]">
        <Image src={project.image} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
        <span className="absolute top-4 left-4 rounded-full bg-white/85 px-3 py-1.5 font-display text-[13px] font-semibold text-ink backdrop-blur-md">{String(index + 1).padStart(2, "0")}</span>
        {!project.verified && <Illustrative className="absolute top-2 right-2" />}
      </div>
      <div className="px-5 pt-3 pb-6">
        <p className="font-display text-[11px] font-semibold tracking-[0.12em] text-brand uppercase">{project.type}</p>
        <h3 className="headline mt-2 text-[22px]">{project.title}</h3>
        <p className="mt-2 text-[14.5px] text-steel">{project.location} · {project.role}</p>
        <span className="mt-4 inline-flex items-center gap-1 font-display text-[15px] font-semibold group-hover:text-brand">
          View case study <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
