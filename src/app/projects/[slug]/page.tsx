import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Illustrative } from "@/components/ui/Illustrative";
import { Reveal } from "@/components/motion/Reveal";
import { projects, getProject } from "@/content/projects";
import { getService } from "@/content/services";

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
      <PageHero kp="5+100" label={p.type} crumbs={[{ label: "Projects", href: "/projects" }]} title={p.title} intro={cs.overview} image={p.image}>
        {!p.verified && <Illustrative className="mt-4" />}
      </PageHero>
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <dl className="grid gap-px bg-line ring-1 ring-line sm:grid-cols-3">
            {[{ k: "Location", v: p.location }, { k: "Serviceberry role", v: p.role }, { k: "Service", v: service?.title ?? "" }].map((d) => (
              <div key={d.k} className="bg-mist p-6">
                <dt className="font-display text-[12px] font-semibold tracking-[0.12em] text-steel uppercase">{d.k}</dt>
                <dd className="headline mt-2 text-[20px]">{d.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.7fr]">
            <div>
              <div className="sticky top-24 bg-brand-deep p-7 text-white">
                <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-berry-light uppercase">Scope at a glance</p>
                <ul className="mt-5 space-y-3">{p.scope.map((s) => <li key={s} className="flex items-center gap-3 text-[16px]"><span className="h-[3px] w-4 bg-berry" /> {s}</li>)}</ul>
                <p className="mt-7 font-display text-[12px] font-semibold tracking-[0.12em] text-berry-light uppercase">Outcome</p>
                <p className="mt-2 text-[16px] text-white/85">{p.outcome}</p>
              </div>
            </div>
            <div>
              {sections.map((s, i) => (
                <Reveal key={s.title} className="grid gap-3 border-t border-line py-8 sm:grid-cols-[90px_1fr]">
                  <span className="font-display text-[15px] font-semibold text-brand">KP {i + 1}+000</span>
                  <div>
                    <h2 className="headline text-[27px]">{s.title}</h2>
                    <p className="mt-3 text-[17px] leading-relaxed text-steel">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-berry py-20">
        <div className="container-x flex flex-wrap items-center justify-between gap-6">
          <p className="headline text-[clamp(1.68rem,3.36vw,2.86rem)]">Discuss a similar requirement with our team.</p>
          <Button href={`/contact?type=Project%20Collaboration&subject=${encodeURIComponent(p.title)}`} className="!bg-ink !text-white">Start the conversation</Button>
        </div>
      </section>
    </>
  );
}
