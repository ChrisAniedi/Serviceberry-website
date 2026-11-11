import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Illustrative } from "@/components/ui/Illustrative";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { EquipmentCard } from "@/components/sections/EquipmentCard";
import { equipmentForSale, getEquipment } from "@/content/equipment";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return equipmentForSale.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEquipment((await params).slug);
  return e ? { title: e.title, description: e.summary } : {};
}

/** Equipment listing with every field from the workbook's listing form. */
export default async function EquipmentDetail({ params }: Props) {
  const e = getEquipment((await params).slug);
  if (!e) notFound();
  const rows = [
    { label: "Status", value: e.status },
    { label: "Condition", value: e.condition },
    { label: "Manufacturer / model", value: e.manufacturer },
    { label: "Year / serial number", value: e.year },
    ...e.specs,
    { label: "Location", value: e.location },
    { label: "Included accessories", value: e.accessories.join(", ") },
  ];
  const others = equipmentForSale.filter((o) => o.slug !== e.slug).slice(0, 3);

  return (
    <>
      <PageHero kp="4+100" label={e.category} crumbs={[{ label: "Equipment", href: "/equipment" }]} title={e.title} intro={e.summary}>
        <div className="mt-6 flex items-center gap-3">
          <Button href={`/request-a-quote?type=Equipment%20for%20Sale&subject=${encodeURIComponent(e.title)}`}>Request technical details</Button>
          {!e.verified && <Illustrative />}
        </div>
      </PageHero>
      <section className="bg-white pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="grid grid-cols-2 gap-3">
            {e.photos.map((src, i) => (
              <div key={src + i} className={`relative overflow-hidden bg-mist ${i === 0 ? "chamfer-lg col-span-2 aspect-[16/10]" : "aspect-[4/3]"}`}>
                <Image src={src} alt={`${e.title}, view ${i + 1}`} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="sticky top-24 bg-mist p-7">
              <p className="headline text-[24px]">Specification</p>
              <dl className="mt-5 border-t border-line">
                {rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-2 gap-4 border-b border-line py-3 text-[15px]">
                    <dt className="text-steel">{r.label}</dt>
                    <dd className="font-semibold">{r.value}</dd>
                  </div>
                ))}
              </dl>
              {e.documents.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {e.documents.map((d) => <li key={d.href}><a href={d.href} className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand"><FileText className="size-4" /> {d.label}</a></li>)}
                </ul>
              )}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-mist py-20">
        <div className="container-x">
          <h2 className="headline text-[clamp(1.68rem,2.86vw,2.35rem)]">More equipment</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">{others.map((o) => <EquipmentCard key={o.slug} item={o} />)}</div>
        </div>
      </section>
    </>
  );
}
