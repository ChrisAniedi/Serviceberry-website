import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { PiggingStory } from "@/components/home/PiggingStory";
import { StartQuote } from "@/components/sections/StartQuote";
import { services, getService } from "@/content/services";
import { getProject } from "@/content/projects";
import { waLink } from "@/content/site";

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
        label={s.title}
        crumbs={[{ label: "Services", href: "/services" }]}
        title={s.title}
        intro={s.intro}
        image={s.image}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={`/request-a-quote?type=Services&subject=${encodeURIComponent(s.title)}`}>{cta}</Button>
          <a
            href={waLink(`Hello Serviceberry, I would like to ask about ${s.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white/10 px-5 font-display text-[15px] font-medium text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <WhatsAppIcon className="size-[18px] text-[#25d366]" /> Ask on WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="bg-white py-24 sm:py-28">
        <div className="container-x">
          <Title kp={`1+${String((i + 1) * 100 + 10).padStart(3, "0")}`} label={`Service ${String(i + 1).padStart(2, "0")}`} title={<>Scope of <span className="text-brand">services</span></>} intro="What our crews and partners deliver on this service line." />
          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {s.scope.map((g, k) => (
              <Reveal key={g.heading} delay={k * 0.08} className="rounded-[28px] bg-mist p-7 ring-1 ring-line sm:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="headline text-[26px]">{g.heading}</h3>
                  <span className="font-display text-[13px] font-semibold text-steel-2 tabular-nums">{String(k + 1).padStart(2, "0")}</span>
                </div>
                <ul className="mt-6 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-[15.5px] ring-1 ring-line">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white"><Check className="size-3" strokeWidth={3} /></span>
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {[
              { h: "Technology & equipment", list: s.technology, bg: "bg-brand-deep" },
              { h: "Typical applications", list: s.applications, bg: "bg-[#070b16]" },
            ].map((b, k) => (
              <Reveal key={b.h} delay={k * 0.08} className={`rounded-[28px] p-7 text-white sm:p-9 ${b.bg}`}>
                <h3 className="headline text-[26px]">{b.h}</h3>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {b.list.map((t) => (
                    <li key={t} className="rounded-full bg-white/10 px-4 py-2 text-[14.5px] text-white/90 ring-1 ring-white/15">{t}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
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
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Title size="md" title={<>Other <span className="text-brand">services</span></>} />
            <Link href="/services" className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-brand">
              All services <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[26px] bg-ink">
                <Image src={o.image} alt="" fill sizes="33vw" className="object-cover opacity-85 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
                  <span className="headline text-[22px]">{o.title}</span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="size-5" /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <StartQuote need={`${s.title}: `} />
    </>
  );
}
