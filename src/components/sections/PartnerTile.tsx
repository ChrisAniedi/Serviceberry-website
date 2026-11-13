import Image from "next/image";
import Link from "next/link";
import type { Partner } from "@/content/partners";
import { Illustrative } from "@/components/ui/Illustrative";

export function PartnerTile({ partner }: { partner: Partner }) {
  return (
    <Link href={`/partners#${partner.slug}`} className="relative grid aspect-[16/9] place-items-center rounded-[26px] bg-white p-8 ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(11,26,62,0.4)]">
      {partner.logo ? (
        <Image src={partner.logo} alt={partner.name} width={180} height={60} />
      ) : (
        <span className="headline text-[25px] text-steel">{partner.name}</span>
      )}
      {!partner.verified && <Illustrative className="absolute top-2 right-2" />}
    </Link>
  );
}
