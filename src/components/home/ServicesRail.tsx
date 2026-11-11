"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { brochure } from "@/content/images";
import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";

// Serviceberry's own photos where the brochure has one for the service.
const photo: Record<string, string> = {
  "pipeline-integrity-pigging": brochure.crewPigging,
  "pipeline-commissioning-maintenance": brochure.plantDusk,
  "production-specialty-chemicals": brochure.descalerBeforeAfter,
  "remote-monitoring-cathodic-protection": brochure.watchdogUnit,
  "equipment-technical-procurement": brochure.valveWorkshop,
  "valve-maintenance-hot-tapping": brochure.valveHand,
};

/**
 * Services as a row of tall photo cards. On large screens the section pins and the row
 * slides sideways as you scroll down; on phones it is a swipeable strip.
 */
export function ServicesRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const measure = () => {
      const t = track.current;
      if (!t || window.innerWidth < 1024) return setShift(0);
      setShift(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(p, [0, 1], [0, -shift]);

  return (
    <section ref={section} id="kp-1" className="relative scroll-mt-0 bg-paper" style={{ height: shift ? `calc(100svh + ${shift}px)` : undefined }}>
      <div className={`${shift ? "sticky top-0 h-svh" : ""} flex flex-col justify-center overflow-hidden py-20 lg:py-0`}>
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-berry uppercase">Our services</p>
            <h2 className="headline mt-4 max-w-[20ch] text-[clamp(2.2rem,4.4vw,3.8rem)]">
              Specialised process <span className="text-brand">and pipeline services.</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div aria-hidden className="hidden h-[3px] w-40 overflow-hidden rounded-full bg-line lg:block">
              <motion.span className="block h-full origin-left bg-berry" style={{ scaleX: p }} />
            </div>
            <Button href="/services" variant="line">All services</Button>
          </div>
        </div>

        <motion.div
          ref={track}
          style={{ x }}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 lg:mt-12 lg:w-max lg:snap-none lg:overflow-visible lg:gap-5"
        >
          {services.map((s, i) => {
            const scope = s.scope.flatMap((g) => g.items).slice(0, 3);
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative h-[min(64svh,580px)] w-[min(86vw,420px)] shrink-0 snap-start overflow-hidden rounded-[28px] bg-ink text-white"
              >
                <Image
                  src={photo[s.slug] ?? s.image}
                  alt=""
                  fill
                  sizes="420px"
                  className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
                <span className="absolute top-5 left-5 rounded-full bg-white/15 px-3 py-1.5 font-display text-[12px] font-semibold tracking-[0.1em] ring-1 ring-white/25 backdrop-blur-md">
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
                <span className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="size-5" />
                </span>
                <div className="absolute inset-x-3 bottom-3 rounded-[22px] bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur-xl">
                  <h3 className="headline text-[26px] leading-[1.05]">{s.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[14.5px] leading-snug text-white/80">{s.short}</p>
                  <ul className="mt-4 grid max-h-0 gap-1.5 overflow-hidden text-[13.5px] text-white/85 opacity-0 transition-all duration-700 ease-out-expo group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100">
                    {scope.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-berry-light" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
          <div className="flex h-[min(64svh,580px)] w-[min(86vw,360px)] shrink-0 snap-start flex-col justify-between rounded-[28px] bg-brand p-8 text-white">
            <p className="headline text-[34px] leading-[1.05]">Not sure which service fits?</p>
            <div>
              <p className="text-[15px] text-white/80">Tell us about the line or the asset. We will scope it with you.</p>
              <Button href="/contact?type=Services" variant="white" className="mt-6">Talk to an engineer</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
