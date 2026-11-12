import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Illustrative } from "@/components/ui/Illustrative";
import { Reveal } from "@/components/motion/Reveal";
import { projects, getProject } from "@/content/projects";
import { getService } from "@/content/services";
import { StartQuote } from "@/components/sections/StartQuote";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.caseStudy.overview } : {};
}

/** Case study with the workbook's headings (section 5). */
export default async function CaseStudy({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const service = getService(p.service);
  const cs = p.caseStudy;
  const sections = [
    { title: "Project overview", body: cs.overview },
    { title: "Client / sector", body: cs.client },
    { title: "Challenge", body: cs.challenge },
    { title: "Scope", body: cs.scope },
    { title: "Execution", body: cs.execution },
    { title: "Outcome", body: cs.outcome },
    { title: "Role clarification", body: cs.roleClarification },
  ];

  return (
    <>
      <PageHero variant="split" kp="5+100" label={p.type} tags={p.scope} caption={`${p.location} · ${p.role}`} title={p.title} intro={cs.overview} image={p.image}>
        {!p.verified && <Illustrative className="mt-4" />}
      </PageHero>
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <dl className="grid gap-3 sm:grid-cols-3">
            {[{ k: "Location", v: p.location }, { k: "Serviceberry role", v: p.role }, { k: "Service", v: service?.title ?? "" }].map((d) => (
              <div key={d.k} className="rounded-[24px] bg-mist p-6 ring-1 ring-line">
                <dt className="font-display text-[12px] font-semibold tracking-[0.12em] text-steel uppercase">{d.k}</dt>
                <dd className="headline mt-2 text-[20px]">{d.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.7fr]">
            <div>
              <div className="sticky top-24 rounded-[30px] bg-brand-deep p-7 text-white sm:p-8">
                <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-brand-light uppercase">Scope at a glance</p>
                <ul className="mt-5 space-y-3">{p.scope.map((s) => <li key={s} className="flex items-center gap-3 text-[16px]"><span className="size-2 shrink-0 rounded-full bg-brand-light" /> {s}</li>)}</ul>
                <p className="mt-7 font-display text-[12px] font-semibold tracking-[0.12em] text-brand-light uppercase">Outcome</p>
                <p className="mt-2 text-[16px] text-white/85">{p.outcome}</p>
              </div>
            </div>
            <div className="relative border-l border-line pl-8 sm:pl-12">
              {sections.map((s, i) => (
                <Reveal key={s.title} className="relative pb-12 last:pb-0">
                  <span className="absolute top-1 -left-[41px] grid size-[18px] place-items-center rounded-full bg-white ring-2 ring-brand sm:-left-[57px]">
                    <span className="size-2 rounded-full bg-brand" />
                  </span>
                  <span className="font-display text-[13px] font-semibold tracking-[0.1em] text-brand uppercase">KP {i + 1}+000</span>
                  <h2 className="headline mt-2 text-[28px]">{s.title}</h2>
                  <p className="mt-3 max-w-[62ch] text-[17px] leading-relaxed text-steel">{s.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <StartQuote type="Project Collaboration" title={<>Discuss a <span className="text-brand-light">similar job.</span></>} need={`Similar to: ${p.title}\n`} />
    </>
  );
}
