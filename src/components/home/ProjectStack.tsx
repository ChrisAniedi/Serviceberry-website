"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { createRef, useMemo, type RefObject } from "react";
import { Title } from "@/components/ui/Title";
import { Illustrative } from "@/components/ui/Illustrative";
import { projects, type Project } from "@/content/projects";

const TOP = 96; // where the cards pin, below the header

function Card({ p, i, n, next, self }: { p: Project; i: number; n: number; next?: RefObject<HTMLDivElement | null>; self: RefObject<HTMLDivElement | null> }) {
  const reduce = useReducedMotion();
  // as the NEXT card slides up over this one, this one sinks back: smaller, dimmer, a little blurred
  const { scrollYProgress: cover } = useScroll({ target: next ?? self, offset: ["start end", "start start"] });
  const last = i === n - 1 || reduce;
  const scale = useTransform(cover, [0.15, 1], [1, last ? 1 : 0.92]);
  const dim = useTransform(cover, [0.15, 1], [0, last ? 0 : 0.4]);
  const blur = useTransform(cover, [0.4, 1], ["blur(0px)", last ? "blur(0px)" : "blur(3px)"]);
  // the photo settles in its frame as the card arrives
  const { scrollYProgress } = useScroll({ target: self, offset: ["start end", "start start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.2, 1]);
  const inner = self;

  return (
    <div ref={inner} className="sticky" style={{ top: TOP + i * 18 }}>
      <motion.div style={{ scale, filter: blur }} className="origin-top will-change-transform">
        <Link
          href={`/projects/${p.slug}`}
          className="group relative grid overflow-hidden rounded-[32px] bg-paper ring-1 ring-line md:h-[min(600px,calc(100svh-150px))] md:grid-cols-[1.35fr_1fr]"
        >
          <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
            <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
              <Image src={p.image} alt="" fill sizes="(min-width:768px) 55vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
            </motion.div>
            <span className="absolute top-5 left-5 rounded-full bg-white/85 px-3 py-1.5 font-display text-[13px] font-semibold text-ink backdrop-blur-md">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>
          <div className="flex flex-col p-7 sm:p-10 lg:p-14">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-brand uppercase">{p.type}</p>
              {!p.verified && <Illustrative />}
            </div>
            <h3 className="headline mt-3 text-[clamp(1.68rem,2.86vw,2.52rem)]">{p.title}</h3>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-steel">{p.caseStudy.overview}</p>
            <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-5 text-[14.5px]">
              <div><dt className="text-steel">Location</dt><dd className="mt-1 font-semibold">{p.location}</dd></div>
              <div><dt className="text-steel">Our role</dt><dd className="mt-1 font-semibold">{p.role}</dd></div>
            </dl>
            <span className="mt-6 inline-flex items-center gap-2 font-display text-[16px] font-semibold group-hover:text-brand">
              Read the case study <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
            </span>
          </div>
          <motion.span aria-hidden className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />
        </Link>
      </motion.div>
    </div>
  );
}

/**
 * Project cards that pin and stack as the page scrolls. Each card sinks back as the next
 * one slides over it (it shrinks, dims and softens), and its photo settles in its frame.
 */
export function ProjectStack({ id = "kp-5", withTitle = true }: { id?: string; withTitle?: boolean }) {
  const refs = useMemo(() => projects.map(() => createRef<HTMLDivElement>()), []);
  return (
    <section id={id} className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="container-x">
        {withTitle && (
          <Title
            kp="5+000"
            label="Projects"
            title={<>Project experience<br /><span className="text-brand">& execution</span></>}
            intro="Every case study states exactly what Serviceberry did: what we executed ourselves, and what came from partners."
          />
        )}
        <div className={`space-y-[18vh] ${withTitle ? "mt-14" : ""}`}>
          {projects.map((p, i) => (
            <Card key={p.slug} p={p} i={i} n={projects.length} self={refs[i]} next={refs[i + 1]} />
          ))}
        </div>
      </div>
    </section>
  );
}
