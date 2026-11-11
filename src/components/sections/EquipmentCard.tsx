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
    <Link href={`/equipment/${item.slug}`} className="group flex h-full flex-col bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgba(12,26,43,0.4)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={item.photos[0]} alt={item.title} fill sizes="(min-width:1024px) 25vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
        <span className="absolute top-0 left-0 bg-ink px-3 py-1.5 font-display text-[12px] font-semibold text-white">{item.category}</span>
        {!item.verified && <Illustrative className="absolute top-2 right-2" />}
      </div>
      <div className="flex flex-1 flex-col p-5">
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
          <span className="flex items-center justify-between bg-brand-soft px-4 py-3 font-display text-[15px] font-semibold text-brand transition-colors group-hover:bg-brand group-hover:text-white">
            Request details <ArrowRight className="size-4" />
          </span>
        </span>
      </div>
    </Link>
  );
}
