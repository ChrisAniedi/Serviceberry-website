import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, HardHat, Leaf, RefreshCw } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";
import { StartJob } from "@/components/sections/StartJob";
import { img } from "@/content/images";

export const metadata: Metadata = { title: "QHSE", description: "Serviceberry's commitment to quality, health, safety and the environment." };

/** TODO(verify): publish only current, approved certificates (issuing body and dates). */
const certificates: { name: string; body: string; issued: string; expires: string }[] = [];

const pillars = [
  { icon: BadgeCheck, title: "Quality", body: "Planned scopes, calibrated equipment, competent people and documented results on every job." },
  { icon: HardHat, title: "Health & safety", body: "Permit-to-work discipline, job hazard analysis and stop-work authority for everyone on site." },
  { icon: Leaf, title: "Environment", body: "Controlled handling of chemicals, pigging waste and test water, and respect for host communities." },
  { icon: RefreshCw, title: "Improvement", body: "Incidents and near misses are reported, learned from and closed out." },
];

export default function QhsePage() {
  return (
    <>
      <PageHero kp="3+500" label="QHSE" title={<>Safety comes<br /><span className="text-brand">before schedule</span></>} intro="Quality, health, safety and environmental performance protect our people, your assets and the communities we work in." image={img.workerHardhat} />
      <section className="bg-white py-24">
        <div className="container-x grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className={`flex min-h-[300px] flex-col justify-between p-7 ${i === 1 ? "bg-brand" : "bg-mist"}`}>
              <p.icon className="size-10 text-brand" strokeWidth={1.5} />
              <div>
                <h2 className="headline text-[29px]">{p.title}</h2>
                <p className="mt-3 text-[16px] text-ink/75">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-mist py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Title size="md" title={<>Policies &<br /><span className="text-brand">certificates</span></>} />
            {certificates.length === 0 ? (
              <Reveal className="mt-6 text-[17px] leading-relaxed text-steel">
                Our current QHSE policy and certificates are available on request.{" "}
                <Link href="/contact?type=Other&subject=QHSE%20documents" className="font-semibold text-brand underline underline-offset-4">Ask for a copy</Link>.
              </Reveal>
            ) : (
              <ul className="mt-6 border-t border-line">{certificates.map((c) => <li key={c.name} className="border-b border-line py-4"><b>{c.name}</b> · {c.body} · {c.issued}–{c.expires}</li>)}</ul>
            )}
          </div>
          <Reveal className="chamfer-lg relative aspect-[4/3] overflow-hidden">
            <Image src={img.engHardhat} alt="" fill sizes="50vw" className="object-cover" />
          </Reveal>
        </div>
      </section>
      <StartJob />
    </>
  );
}
