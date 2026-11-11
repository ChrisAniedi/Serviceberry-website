import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { Illustrative } from "@/components/ui/Illustrative";
import { projects } from "@/content/projects";

/** Project cards that pin and stack on top of each other as the page scrolls. */
export function ProjectStack({ id = "kp-5", withTitle = true }: { id?: string; withTitle?: boolean }) {
  return (
    <section id={id} className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="container-x">
        {withTitle && (
          <Title
            kp="5+000"
            label="Projects"
            title={<>Project experience<br /><span className="text-brand">& execution</span></>}
            intro="Every case study states exactly what Serviceberry did: what we executed ourselves, and what came from partners."
          />
        )}
        <div className={`bleed-x ${withTitle ? "mt-14" : ""}`}>
          {projects.map((p, i) => (
            <div key={p.slug} className="sticky" style={{ top: `${74 + i * 22}px` }}>
              <Link
                href={`/projects/${p.slug}`}
                className="group grid overflow-hidden border-t border-line bg-paper md:h-[min(640px,calc(100svh-140px))] md:grid-cols-[1.35fr_1fr]"
                style={{ boxShadow: "0 -20px 40px -30px rgba(12,26,43,0.35)" }}
              >
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                  <Image src={p.image} alt="" fill sizes="(min-width:768px) 55vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
                  <span className="absolute top-0 left-0 bg-berry px-3 py-1.5 font-display text-[14px] font-bold">{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                </div>
                <div className="flex flex-col p-7 sm:p-10 lg:p-14">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-brand uppercase">{p.type}</p>
                    {!p.verified && <Illustrative />}
                  </div>
                  <h3 className="headline mt-3 text-[clamp(1.68rem,2.86vw,2.52rem)]">{p.title}</h3>
                  <p className="mt-4 max-w-md text-[16px] leading-relaxed text-steel">{p.caseStudy.overview}</p>
                  <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-5 text-[14.5px]">
                    <div><dt className="text-steel">Location</dt><dd className="mt-1 font-semibold">{p.location}</dd></div>
                    <div><dt className="text-steel">Our role</dt><dd className="mt-1 font-semibold">{p.role}</dd></div>
                  </dl>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-[16px] font-semibold group-hover:text-brand">
                    Read the case study <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
