import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";
import { AcademyBlock } from "@/components/home/AcademyBlock";
import { img } from "@/content/images";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Careers", description: "Vacancies and how to apply to Serviceberry Global Limited." };

/** Add openings here. When empty the page says "No current vacancies" (workbook section 1). */
const vacancies: { title: string; location: string; type: string; summary: string }[] = [];

export default function CareersPage() {
  return (
    <>
      <PageHero kp="6+500" label="Careers" title={<>Build a career<br /><span className="text-brand">in energy</span></>} intro="We look for safe, skilled and curious people: technicians, engineers and support staff who take pride in work done right." image={img.workersStairs} />
      <section className="bg-white py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Title size="md" title="Current openings" />
            {vacancies.length === 0 ? (
              <Reveal className="mt-8 border-l-[4px] border-brand bg-mist p-8">
                <p className="headline text-[27px]">No current vacancies</p>
                <p className="mt-3 max-w-lg text-[16px] text-steel">There are no open roles right now. Send your CV and we will keep it on file for future openings.</p>
              </Reveal>
            ) : (
              <ul className="mt-8 border-t border-line">
                {vacancies.map((v) => (
                  <li key={v.title} className="border-b border-line py-6">
                    <p className="headline text-[24px]">{v.title}</p>
                    <p className="mt-1 text-[15px] text-steel">{v.location} · {v.type}</p>
                    <p className="mt-3 text-steel">{v.summary}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Reveal className="h-fit bg-brand p-8 text-white">
            <p className="font-display text-[13px] font-semibold tracking-[0.12em] text-brand-light uppercase">How to apply</p>
            <ol className="mt-5 space-y-4 text-[16px] text-white/85">
              <li>1. Prepare your CV (PDF) and a short cover note.</li>
              <li>2. Put the role, or &quot;General application&quot;, in the subject line.</li>
              <li>3. Email {site.email}.</li>
            </ol>
            <Button href={`mailto:${site.email}?subject=Career%20application`} variant="hivis" className="mt-8">Email your CV</Button>
          </Reveal>
        </div>
      </section>
      <AcademyBlock id="academy" />
    </>
  );
}
