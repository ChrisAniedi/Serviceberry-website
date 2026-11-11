import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { PiggingStory } from "@/components/home/PiggingStory";
import { StartJob } from "@/components/sections/StartJob";
import { services, getService } from "@/content/services";
import { getProject } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  return s ? { title: s.title, description: s.short } : {};
}

/** Reusable service page (workbook section 3). */
export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const i = services.findIndex((x) => x.slug === s.slug);
  const project = s.relatedProject ? getProject(s.relatedProject) : undefined;
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 3);
  const cta = s.cta === "quotation" ? "Request a quotation" : "Request a technical discussion";

  return (
    <>
      <PageHero
        kp={`1+${String((i + 1) * 100).padStart(3, "0")}`}
        label={`Service ${String(i + 1).padStart(2, "0")}`}
        crumbs={[{ label: "Services", href: "/services" }]}
        title={s.title}
        intro={s.intro}
        image={s.image}
      >
        <div className="mt-6"><Button href={`/contact?type=Services&subject=${encodeURIComponent(s.title)}`}>{cta}</Button></div>
      </PageHero>

      <section className="bg-white py-24 sm:py-28">
        <div className="container-x">
          <Title size="md" title={<>Scope of <span className="text-brand">services</span></>} intro="What our crews and partners deliver on this service line." />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {s.scope.map((g, k) => (
              <Reveal key={g.heading} delay={k * 0.08} className="bg-mist p-7 sm:p-9">
                <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-brand uppercase">{String(k + 1).padStart(2, "0")}</p>
                <h3 className="headline mt-2 text-[25px]">{g.heading}</h3>
                <ul className="mt-6 border-t border-line">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 border-b border-line py-3.5 text-[16px]">
                      <span className="h-[3px] w-4 shrink-0 bg-brand" /> {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Reveal className="bg-brand p-7 text-white sm:p-9">
              <h3 className="headline text-[25px]">Technology & equipment</h3>
              <ul className="mt-5 space-y-2.5 text-[16px] text-white/85">{s.technology.map((t) => <li key={t}>{t}</li>)}</ul>
            </Reveal>
            <Reveal delay={0.08} className="bg-ink p-7 text-white sm:p-9">
              <h3 className="headline text-[25px]">Typical applications</h3>
              <ul className="mt-5 space-y-2.5 text-[16px] text-white/85">{s.applications.map((t) => <li key={t}>{t}</li>)}</ul>
            </Reveal>
          </div>
        </div>
      </section>

      {s.icon === "pig" && <PiggingStory />}

      {project && (
        <section className="bg-mist py-24">
          <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
            <Title size="md" title={<>Relevant <span className="text-brand">experience</span></>} intro="How a job on this service line runs, start to finish." />
            <Reveal className="max-w-md lg:justify-self-end"><ProjectCard project={project} index={0} /></Reveal>
          </div>
        </section>
      )}

      <section className="bg-white py-24">
        <div className="container-x">
          <Title size="md" title="Other services" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-ink">
                <Image src={o.image} alt="" fill sizes="33vw" className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
                  <span className="headline text-[22px]">{o.title}</span>
                  <ArrowUpRight className="size-5 shrink-0" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <StartJob />
    </>
  );
}
