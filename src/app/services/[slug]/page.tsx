import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Cog } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ScopeChapter } from "@/components/sections/ScopeChapter";
import { ProjectFeature } from "@/components/sections/ProjectFeature";
import { PiggingStory } from "@/components/home/PiggingStory";
import { StartQuote } from "@/components/sections/StartQuote";
import { services, getService, serviceGallery } from "@/content/services";
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

/**
 * A service line as a short story: the opener, each part of the scope as an illustrated
 * chapter, the technology on a dark photo band, where it is used as photo cards, then a
 * related project, other services and the quote panel.
 */
export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const i = services.findIndex((x) => x.slug === s.slug);
  const gallery = serviceGallery[s.slug] ?? [s.image];
  const pic = (k: number) => gallery[k % gallery.length];
  const project = s.relatedProject ? getProject(s.relatedProject) : undefined;
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 3);
  const cta = s.cta === "quotation" ? "Request a quotation" : "Request a technical discussion";
  const n = s.scope.length;

  return (
    <>
      <PageHero
        kp={`1+${String((i + 1) * 100).padStart(3, "0")}`}
        label={`Service ${String(i + 1).padStart(2, "0")}`}
        variant="split"
        tags={s.scope.map((g) => g.heading)}
        title={s.title}
        intro={s.intro}
        image={s.image}
        caption={`Service ${String(i + 1).padStart(2, "0")} of ${String(services.length).padStart(2, "0")}`}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={`/request-a-quote?type=Services&subject=${encodeURIComponent(s.title)}`}>{cta}</Button>
          <a
            href={waLink(`Hello Serviceberry, I would like to ask about ${s.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full px-5 font-display text-[15px] font-medium text-ink ring-1 ring-ink/20 transition-colors ring-inset hover:bg-mist"
          >
            <WhatsAppIcon className="size-[18px] text-[#1faa55]" /> Ask on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* the scope, chapter by chapter */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <Reveal>
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">What we deliver</p>
              <p className="headline mt-4 text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.1]">{s.short}</p>
            </Reveal>
            <Reveal delay={0.1} className="rounded-[28px] bg-[#070b16] p-6 text-white sm:p-7">
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand-light uppercase">At a glance</p>
              <ul className="mt-4 divide-y divide-white/10">
                {s.scope.map((g, k) => (
                  <li key={g.heading}>
                    <a href={`#scope-${k + 1}`} className="group flex items-center justify-between gap-4 py-3 text-[15.5px]">
                      <span className="flex items-center gap-3"><span className="font-display text-[13px] text-brand-light tabular-nums">{String(k + 1).padStart(2, "0")}</span>{g.heading}</span>
                      <span className="text-[13px] text-white/50 transition-colors group-hover:text-white">{g.items.length} items</span>
                    </a>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-4 py-3 text-[15.5px]"><span className="flex items-center gap-3"><span className="font-display text-[13px] text-brand-light">+</span>Technology & equipment</span><span className="text-[13px] text-white/50">{s.technology.length} items</span></li>
              </ul>
            </Reveal>
          </div>
          <div className="mt-12 space-y-3">
            {s.scope.map((g, k) => (
              <ScopeChapter key={g.heading} n={k + 1} of={n} heading={g.heading} items={g.items} image={pic(k)} flip={k % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* technology on a dark photo band */}
      <section className="bg-white pb-20 sm:pb-24">
        <div className="container-x">
          <div data-nav="dark" className="relative isolate overflow-hidden rounded-[36px] bg-[#070b16] text-white">
            <Image src={pic(n)} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-35" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#070b16_10%,rgba(7,11,22,0.75)_55%,rgba(7,11,22,0.4))]" />
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:p-16">
              <Reveal>
                <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand-light uppercase">Technology & equipment</p>
                <h2 className="headline mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.02]">The kit we bring to the job</h2>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/70">Our own equipment, and specialist partners&apos; tools where the job needs them.</p>
              </Reveal>
              <ul className="grid gap-3 sm:grid-cols-2">
                {s.technology.map((t) => (
                  <li key={t} className="flex h-full items-start gap-3 rounded-[20px] bg-white/[0.07] p-5 ring-1 ring-white/12 backdrop-blur-xl">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-light/15 text-brand-light"><Cog className="size-[18px]" strokeWidth={1.7} /></span>
                    <span className="text-[15.5px] leading-snug">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* where it is used */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">Typical applications</p>
            <h2 className="headline mt-4 text-[clamp(2rem,3.6vw,3.2rem)]">Where it is <span className="text-brand">used</span></h2>
          </Reveal>
          <div className={`mt-12 grid gap-3 ${s.applications.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {s.applications.map((a, k) => (
              <Reveal key={a} delay={k * 0.08} className="group relative isolate flex aspect-[4/5] items-end overflow-hidden rounded-[28px] bg-ink p-6 text-white sm:aspect-[3/4]">
                <Image src={pic(n + 1 + k)} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="-z-10 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070b16]/85 via-[#070b16]/15 to-transparent" />
                <p>
                  <span className="font-display text-[13px] font-semibold text-brand-light tabular-nums">{String(k + 1).padStart(2, "0")}</span>
                  <span className="headline mt-2 block text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.05]">{a}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {s.icon === "pig" && <PiggingStory />}

      {project && (
        <section className="bg-white py-24">
          <div className="container-x">
            <Reveal>
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">Relevant experience</p>
              <h2 className="headline mt-4 mb-10 text-[clamp(2rem,3.6vw,3.2rem)]">How a job like this <span className="text-brand">runs</span></h2>
            </Reveal>
            <Reveal><ProjectFeature project={project} label="Case study" /></Reveal>
          </div>
        </section>
      )}

      <section className={`py-24 ${project ? "bg-mist" : "bg-white"}`}>
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="headline text-[clamp(2rem,3.6vw,3.2rem)]">Other <span className="text-brand">services</span></h2>
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
