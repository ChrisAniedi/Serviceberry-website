"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
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

const HINT_CARDS = 2; // how far the row glides by itself, in cards

/**
 * Services as a sideways row of photo cards. The page never locks: as the section scrolls
 * past, the row glides along by a couple of cards to show there is more, then it is the
 * visitor's to drag, swipe, trackpad-scroll or step with the arrows. The glide stops the
 * moment they take over.
 */
export function ServicesRail() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const bar = useSpring(progress, { stiffness: 200, damping: 30 });

  const cardStep = () => {
    const first = rail.current?.querySelector<HTMLElement>("[data-card]");
    return first ? first.offsetWidth + 20 : 420;
  };

  const sync = () => {
    const r = rail.current;
    if (!r) return;
    const max = r.scrollWidth - r.clientWidth;
    progress.set(max > 0 ? r.scrollLeft / max : 0);
  };

  // the glide: tie the first couple of cards to the vertical scroll, until the visitor takes over
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const r = rail.current;
    if (!r || touched.current || reduce) return;
    const t = Math.min(1, Math.max(0, (p - 0.3) / 0.4));
    r.scrollLeft = t * cardStep() * HINT_CARDS;
  });

  useEffect(() => {
    const r = rail.current;
    if (!r) return;
    const takeOver = () => (touched.current = true);
    const onWheel = (e: WheelEvent) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && takeOver();
    r.addEventListener("touchstart", takeOver, { passive: true });
    r.addEventListener("wheel", onWheel, { passive: true });
    r.addEventListener("keydown", takeOver);

    // drag to scroll with a mouse
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let moved = false;
    const down = (e: PointerEvent) => {
      takeOver();
      if (e.pointerType !== "mouse") return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = r.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      r.scrollLeft = startLeft - dx;
    };
    const up = () => (dragging = false);
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    r.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    r.addEventListener("click", click, true);
    return () => {
      r.removeEventListener("touchstart", takeOver);
      r.removeEventListener("wheel", onWheel);
      r.removeEventListener("keydown", takeOver);
      r.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      r.removeEventListener("click", click, true);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    touched.current = true;
    rail.current?.scrollBy({ left: dir * cardStep(), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section ref={section} id="kp-1" className="scroll-mt-20 bg-paper py-24 sm:py-32">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">Our services</p>
          <h2 className="headline mt-4 max-w-[20ch] text-[clamp(2.2rem,4.4vw,3.8rem)]">
            Specialised process <span className="text-brand">and pipeline services.</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div aria-hidden className="mr-3 hidden h-[3px] w-32 overflow-hidden rounded-full bg-line sm:block">
            <motion.span className="block h-full origin-left bg-brand" style={{ scaleX: bar }} />
          </div>
          <button type="button" onClick={() => step(-1)} aria-label="Previous services" className="grid size-12 place-items-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-white">
            <ArrowLeft className="size-5" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="More services" className="grid size-12 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-brand">
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={rail}
        onScroll={sync}
        tabIndex={0}
        role="region"
        aria-label="Services, scroll sideways for more"
        className="no-scrollbar mt-12 flex cursor-grab gap-5 overflow-x-auto px-[var(--gutter)] pb-2 select-none active:cursor-grabbing max-lg:snap-x max-lg:snap-mandatory max-lg:scroll-px-[var(--gutter)]"
      >
        {services.map((s, i) => {
          const scope = s.scope.flatMap((g) => g.items).slice(0, 3);
          return (
            <Link
              key={s.slug}
              data-card
              href={`/services/${s.slug}`}
              draggable={false}
              className="group relative h-[min(62svh,560px)] w-[min(84vw,400px)] shrink-0 snap-start overflow-hidden rounded-[28px] bg-ink text-white"
            >
              <Image
                src={photo[s.slug] ?? s.image}
                alt=""
                fill
                draggable={false}
                sizes="400px"
                className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <span className="absolute top-5 left-5 rounded-full bg-white/15 px-3 py-1.5 font-display text-[12px] font-semibold tracking-[0.1em] ring-1 ring-white/25 backdrop-blur-md">
                {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
              <span className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-5" />
              </span>
              <div className="absolute inset-x-3 bottom-3 rounded-[22px] bg-[linear-gradient(160deg,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_60%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_20px_40px_-20px_rgba(10,22,48,0.6)] ring-1 ring-white/30 backdrop-blur-[18px] backdrop-saturate-[1.6]">
                <h3 className="headline text-[25px] leading-[1.05] [text-shadow:0_1px_12px_rgba(10,22,48,0.35)]">{s.title}</h3>
                <p className="mt-2 line-clamp-2 text-[14.5px] leading-snug text-white/90 [text-shadow:0_1px_10px_rgba(10,22,48,0.4)]">{s.short}</p>
                <ul className="mt-4 grid max-h-0 gap-1.5 overflow-hidden text-[13.5px] text-white/85 opacity-0 transition-all duration-700 ease-out-expo group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100">
                  {scope.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand-light" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          );
        })}
        <div data-card className="flex h-[min(62svh,560px)] w-[min(84vw,360px)] shrink-0 snap-start flex-col justify-between rounded-[28px] bg-brand p-8 text-white">
          <p className="headline text-[32px] leading-[1.05]">Not sure which service fits?</p>
          <div>
            <p className="text-[15px] text-white/85">Tell us about the line or the asset. We will scope it with you.</p>
            <Button href="/request-a-quote?type=Services" variant="white" className="mt-6">Talk to an engineer</Button>
          </div>
        </div>
      </div>

      <div className="container-x mt-8 flex items-center justify-between gap-4">
        <p className="text-[14px] text-steel">Drag or swipe to see all {services.length} services.</p>
        <Link href="/services" className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-brand hover:underline">
          All services <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
