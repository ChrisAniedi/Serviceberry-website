"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { img } from "@/content/images";

type Props = {
  kp: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  crumbs?: { label: string; href: string }[];
  children?: ReactNode;
  /** Colour of the page under the rounded corners, to match the next section. */
  after?: string;
  /** A shorter opener (forms, detail pages). */
  compact?: boolean;
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Inner-page opener: a full-bleed photo under a deep navy wash, rounded at the foot.
 * Breadcrumbs and the KP station sit on top, the title rises into place, and a thin
 * pipeline with a travelling light runs along the bottom. Blue words in the title are
 * lifted to light blue so they read on the dark.
 */
export function PageHero({ kp, label, title, intro, image, crumbs, children, after = "bg-white", compact }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.35]);
  const src = image ?? img.nightPlant2;
  const short = compact || !image;

  return (
    <section ref={ref} data-nav="dark" className={after}>
      <div className="relative isolate overflow-hidden rounded-b-[32px] bg-[#060a14] text-white sm:rounded-b-[44px]">
        <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ y }}>
          <motion.div className="absolute inset-0" initial={{ scale: reduce ? 1 : 1.14 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }}>
            <Image src={src} alt="" fill priority sizes="100vw" className={`object-cover ${image ? "opacity-60" : "opacity-30 grayscale"}`} />
          </motion.div>
        </motion.div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,10,20,0.92)_0%,rgba(6,10,20,0.6)_50%,rgba(6,10,20,0.25)_100%)]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#060a14_0%,rgba(6,10,20,0.4)_45%,rgba(6,10,20,0.55)_100%)]" />
        <div aria-hidden className="absolute -top-40 right-[-10%] -z-10 size-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(11,79,191,0.35),transparent)]" />

        <motion.div
          style={{ opacity: fade }}
          className={`container-x flex flex-col justify-end ${short ? "pt-[150px] pb-14 sm:pt-[170px] sm:pb-16" : "min-h-[min(88svh,820px)] pt-[150px] pb-14 sm:pb-16"}`}
        >
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="flex flex-wrap items-center gap-3">
            <nav aria-label="Breadcrumb" className="inline-flex flex-wrap items-center gap-1 rounded-full bg-white/[0.07] py-1.5 pr-4 pl-3 text-[13.5px] text-white/70 ring-1 ring-white/12 backdrop-blur-md">
              <Link href="/" className="rounded-full px-1 transition-colors hover:text-white">Home</Link>
              {crumbs?.map((c) => (
                <span key={c.href} className="inline-flex items-center gap-1">
                  <ChevronRight className="size-3.5 text-white/35" />
                  <Link href={c.href} className="rounded-full px-1 transition-colors hover:text-white">{c.label}</Link>
                </span>
              ))}
              <ChevronRight className="size-3.5 text-white/35" />
              <span aria-current="page" className="max-w-[40ch] truncate px-1 text-white">{label}</span>
            </nav>
            <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-brand-light/10 px-3 font-display text-[12px] font-semibold tracking-[0.12em] text-brand-light ring-1 ring-brand-light/25">
              <span className="size-1.5 rounded-full bg-brand-light" /> KP {kp}
            </span>
          </motion.div>

          <h1 className={`headline mt-7 max-w-[20ch] leading-[0.98] [&_.text-brand]:text-brand-light ${short ? "text-[clamp(2.4rem,5.6vw,5.2rem)]" : "text-[clamp(2.6rem,6.8vw,6.4rem)]"}`}>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay: 0.1, ease }}>
                {title}
              </motion.span>
            </span>
          </h1>

          {(intro || children) && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45, ease }} className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end">
              {intro && <div className="max-w-[640px] text-[17px] leading-relaxed text-white/75 lg:col-span-7">{intro}</div>}
              {children && <div className="lg:col-span-5 lg:justify-self-end">{children}</div>}
            </motion.div>
          )}
        </motion.div>

        {/* the line along the foot, with a light running down it */}
        <div aria-hidden className="container-x relative pb-8">
          <div className="relative h-px overflow-hidden bg-white/12">
            <span className="anim-run absolute top-0 h-px w-32 bg-[linear-gradient(90deg,transparent,#ffd98f,transparent)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
