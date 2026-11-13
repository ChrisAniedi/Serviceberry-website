import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { EquipmentItem } from "@/content/equipment";
import { Illustrative } from "@/components/ui/Illustrative";

/** Equipment as a spec sheet: photo, name, key rows, full-width Request details bar. */
export function EquipmentCard({ item }: { item: EquipmentItem }) {
  const rows = [
    { k: "Status", v: item.status },
    { k: "Condition", v: item.condition },
    { k: "Location", v: item.location },
  ];
  return (
    <Link href={`/equipment/${item.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-white ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(11,26,62,0.45)]">
      <div className="relative m-2 aspect-[4/3] overflow-hidden rounded-[20px]">
        <Image src={item.photos[0]} alt={item.title} fill sizes="(min-width:1024px) 25vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1.5 font-display text-[12px] font-semibold text-ink backdrop-blur-md">{item.category}</span>
        {!item.verified && <Illustrative className="absolute top-2 right-2" />}
      </div>
      <div className="flex flex-1 flex-col px-5 pt-3 pb-5">
        <h3 className="headline text-[20px] leading-[1]">{item.title}</h3>
        <dl className="mt-4 divide-y divide-line border-y border-line text-[14px]">
          {rows.map((r) => (
            <div key={r.k} className="flex justify-between gap-3 py-2">
              <dt className="text-steel">{r.k}</dt>
              <dd className="text-right font-medium">{r.v}</dd>
            </div>
          ))}
        </dl>
        <span className="mt-auto pt-5">
          <span className="flex min-h-12 items-center justify-between rounded-full bg-brand-soft pr-2 pl-5 font-display text-[15px] font-semibold text-brand transition-colors group-hover:bg-brand group-hover:text-white">
            Request details <span className="grid size-8 place-items-center rounded-full bg-white text-brand"><ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
          </span>
        </span>
      </div>
    </Link>
  );
}
