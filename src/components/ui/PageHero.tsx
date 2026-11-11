"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Kp } from "./Kp";
import { PipeFrame } from "@/components/motion/PipeFrame";

type Props = {
  kp: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  crumbs?: { label: string; href: string }[];
  children?: ReactNode;
};

const ease = [0.16, 1, 0.3, 1] as const;

/** Inner-page opener: KP label and crumbs, big condensed title, intro, then a pipe-framed photo. */
export function PageHero({ kp, label, title, intro, image, crumbs, children }: Props) {
  return (
    <section className="bg-white pt-[74px]">
      <div className="container-x pt-12 pb-10 sm:pt-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Kp kp={kp} label={label} />
          {crumbs && (
            <nav aria-label="Breadcrumb" className="text-[14px] text-steel">
              {crumbs.map((c, i) => (
                <span key={c.href}>
                  {i > 0 && <span className="mx-2">/</span>}
                  <Link href={c.href} className="hover:text-brand">{c.label}</Link>
                </span>
              ))}
            </nav>
          )}
        </motion.div>
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="headline text-[clamp(2.52rem,6.72vw,6.05rem)] text-brand-deep lg:col-span-8">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay: 0.1, ease }}>
                {title}
              </motion.span>
            </span>
          </h1>
          {(intro || children) && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease }} className="text-[17px] leading-relaxed text-steel lg:col-span-4 lg:pb-3">
              {intro}
              {children}
            </motion.div>
          )}
        </div>
      </div>
      {image && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.3, ease }}>
          <PipeFrame src={image} alt="" priority className="h-[min(58svh,560px)]" />
        </motion.div>
      )}
    </section>
  );
}
