import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Illustrative } from "@/components/ui/Illustrative";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { EquipmentCard } from "@/components/sections/EquipmentCard";
import { EquipmentGallery } from "@/components/sections/EquipmentGallery";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { waLink } from "@/content/site";
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
      <PageHero compact kp="4+100" label={e.title} crumbs={[{ label: "Equipment", href: "/equipment" }]} title={e.title} intro={e.summary} image={e.photos[0]}>
        {!e.verified && <Illustrative />}
      </PageHero>
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <Reveal>
            <EquipmentGallery title={e.title} photos={e.photos} />
          </Reveal>
          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <div className="rounded-[30px] bg-mist p-7 ring-1 ring-line sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="headline text-[26px]">Specification</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1f9d55]/10 px-3 py-1 text-[13px] font-medium text-[#147a40]">
                  <span className="size-1.5 rounded-full bg-[#1f9d55]" /> {e.status}
                </span>
              </div>
              <dl className="mt-5 divide-y divide-line rounded-2xl bg-white px-5 ring-1 ring-line">
                {rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-2 gap-4 py-3 text-[15px]">
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
              <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <Button href={`/request-a-quote?type=Equipment%20for%20Sale&subject=${encodeURIComponent(e.title)}`} className="w-full">Request details</Button>
                <a href={waLink(`Hello Serviceberry, I would like details on the ${e.title}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-5 font-display text-[15px] font-semibold text-[#06281a] transition-colors hover:bg-[#2fe072]">
                  <WhatsAppIcon className="size-[18px]" /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-mist py-20">
        <div className="container-x">
          <h2 className="headline text-[clamp(1.8rem,3.2vw,2.7rem)]">More <span className="text-brand">equipment</span></h2>
          <div className="mt-10 grid gap-3 md:grid-cols-3">{others.map((o) => <EquipmentCard key={o.slug} item={o} />)}</div>
        </div>
      </section>
    </>
  );
}
