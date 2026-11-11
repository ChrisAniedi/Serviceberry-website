import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Radio, ShieldCheck } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { img } from "@/content/images";

function PhotoTile({ href, image, kicker, title, className = "" }: { href: string; image: string; kicker: string; title: string; className?: string }) {
  return (
    <Link href={href} className={`group relative block min-h-[240px] overflow-hidden rounded-[26px] bg-ink ${className}`}>
      <Image src={image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white">
        <span>
          <span className="block font-display text-[11px] font-semibold tracking-[0.14em] text-brand-light uppercase">{kicker}</span>
          <span className="headline mt-2 block text-[clamp(1.34rem,2.02vw,1.85rem)]">{title}</span>
        </span>
        <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

/** Mixed tile grid: photos, a count, safety, chemicals, valves, monitoring, Nigerian Content. */
export function Capabilities() {
  return (
    <section id="kp-3" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="container-x">
        <Title
          kp="3+000"
          label="Capabilities"
          title={<>Onshore. Offshore.<br /><span className="text-brand">In the plant.</span></>}
          intro="From flow stations to export lines, we bring the people, the equipment and the specialist partners the job needs."
        />
        <Reveal className="mt-14 grid auto-rows-[minmax(260px,auto)] gap-3 md:grid-cols-4">
          <PhotoTile href="/services" image={img.rigOcean} kicker="Where we work" title="Onshore & offshore assets" className="md:col-span-2 md:row-span-2" />
          <div className="flex flex-col justify-between rounded-[26px] bg-brand p-6 text-white">
            <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-white/70 uppercase">Service lines</p>
            <p className="headline text-[5.88rem] leading-none"><CountUp to={7} /></p>
            <p className="text-[15px] text-white/80">Pipeline, process, chemicals and equipment.</p>
          </div>
          <Link href="/qhse" className="group flex flex-col justify-between rounded-[26px] bg-brand-deep p-6 text-white transition-colors hover:bg-[#0c3570]">
            <ShieldCheck className="size-9 text-brand-light transition-transform duration-500 group-hover:-rotate-6" strokeWidth={1.6} />
            <span>
              <span className="headline block text-[1.85rem]">Safety first</span>
              <span className="mt-2 flex items-center gap-1 text-[15px]">Our QHSE commitments <ArrowUpRight className="size-4" /></span>
            </span>
          </Link>
          <PhotoTile href="/services/production-specialty-chemicals" image={img.chemicals} kicker="Chemicals" title="Alpha Descaler & production chemicals" className="md:col-span-2" />
          <PhotoTile href="/services/valve-maintenance-hot-tapping" image={img.valves} kicker="Valves" title="Hot tapping & cold cutting" />
          <Link href="/services/remote-monitoring-cathodic-protection" className="group flex flex-col justify-between rounded-[26px] bg-mist p-6 ring-1 ring-line transition-colors hover:bg-white">
            <Radio className="size-9 text-brand transition-transform duration-500 group-hover:-rotate-6" strokeWidth={1.6} />
            <span>
              <span className="headline block text-[1.68rem]">Remote monitoring & CP</span>
              <span className="mt-2 flex items-center gap-1 text-[15px] text-steel group-hover:text-ink">Watch long lines from one screen <ArrowUpRight className="size-4" /></span>
            </span>
          </Link>
          <div className="flex flex-col justify-between rounded-[26px] bg-ink p-6 text-white md:col-span-2">
            <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-brand-light uppercase">Nigerian Content</p>
            <p className="max-w-lg font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-tight font-[350] tracking-[-0.02em]">
              In-country crews, local participation and technology transfer through our partners and our Academy.
            </p>
          </div>
          <PhotoTile href="/services/asset-process-systems-integrity" image={img.assetIntegrity} kicker="Integrity" title="Asset & process systems" className="min-h-[340px] md:col-span-4" />
        </Reveal>
      </div>
    </section>
  );
}
