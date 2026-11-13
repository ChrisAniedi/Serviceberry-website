"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { waLink } from "@/content/site";

type Props = {
  kp: string;
  /** Short name of the page, shown as the eyebrow with the KP station. */
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  /** Buttons and other actions. */
  children?: ReactNode;
  /**
   * "overlay": the title, intro and buttons sit on the photo over a brand wash, with a glass
   * card bottom-right (main pages). "split": title and buttons above, the photo below with
   * tag chips on it (detail pages).
   */
  variant?: "overlay" | "split";
  /** Glass card on the overlay photo; a big figure and what it counts. Defaults to a WhatsApp card. */
  stat?: { value: string; label: string };
  /** Chips on the split photo, e.g. the scope of a service. */
  tags?: string[];
  /** Caption chip on the split photo. */
  caption?: string;
  /** A shorter opener with no photo (forms). */
  compact?: boolean;
  /** Re-tone a warm photo into the brand blues (as on the home hero). */
  grade?: boolean;
};

const ease = [0.16, 1, 0.3, 1] as const;

function Eyebrow({ kp, label, light }: { kp: string; label: string; light?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 font-display text-[12.5px] font-semibold tracking-[0.12em] uppercase ${light ? "bg-white/12 text-white ring-1 ring-white/25 backdrop-blur-md" : "bg-brand-soft text-brand"}`}>
      <span className={`rounded-full px-2 py-0.5 text-[11px] ${light ? "bg-white text-brand-deep" : "bg-brand text-white"}`}>KP {kp}</span>
      {label}
    </p>
  );
}

function Title({ title, size, light }: { title: ReactNode; size: string; light?: boolean }) {
  return (
    <h1 className={`headline leading-[0.98] ${light ? "text-white [&_.text-brand]:text-brand-light" : "text-ink"} ${size}`}>
      <span className="block overflow-hidden pb-[0.06em]">
        <motion.span className="block" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay: 0.15, ease }}>
          {title}
        </motion.span>
      </span>
    </h1>
  );
}

/**
 * Inner-page opener. Main pages put everything on one large rounded photo (title bottom-left
 * over a brand wash, a glass card bottom-right); detail pages keep the title and buttons on
 * white with the photo underneath and its tags on it. Forms get a compact title only.
 */
export function PageHero({ kp, label, title, intro, image, children, variant = "overlay", stat, tags, caption, compact, grade }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: box, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"]);
  const reveal = {
    initial: { clipPath: reduce ? "inset(0% 0% 0% 0% round 32px)" : "inset(4% 3% 0% 3% round 32px)", opacity: 0.5 },
    animate: { clipPath: "inset(0% 0% 0% 0% round 32px)", opacity: 1 },
    transition: { duration: 1.3, ease },
  };

  // Forms: title and intro only.
  if (compact || !image) {
    return (
      <section className="bg-white pt-[74px]">
        <div className="container-x grid gap-8 pt-14 pb-12 sm:pt-20 sm:pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
              <Eyebrow kp={kp} label={label} />
            </motion.div>
            <div className="mt-6"><Title title={title} size="text-[clamp(2.4rem,5.4vw,4.8rem)]" /></div>
          </div>
          {(intro || children) && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease }} className="lg:col-span-4 lg:pb-2">
              {intro && <div className="text-[17px] leading-relaxed text-steel">{intro}</div>}
              {children && <div className={intro ? "mt-7" : ""}>{children}</div>}
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  // Detail pages: title and buttons on white, the photo below with its tags.
  if (variant === "split") {
    return (
      <section className="bg-white pt-[74px]">
        <div className="container-x pt-12 sm:pt-16">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <Eyebrow kp={kp} label={label} />
          </motion.div>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8"><Title title={title} size="text-[clamp(2.5rem,5.6vw,5.2rem)]" /></div>
            {(intro || children) && (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease }} className="lg:col-span-4 lg:pb-2">
                {intro && <div className="text-[16.5px] leading-relaxed text-steel">{intro}</div>}
                {children && <div className={intro ? "mt-6" : ""}>{children}</div>}
              </motion.div>
            )}
          </div>
        </div>
        <div className="container-x mt-10 sm:mt-12">
          <motion.div ref={box} {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="relative h-[clamp(280px,54svh,600px)] overflow-hidden rounded-[32px] bg-mist">
            <motion.div className="absolute inset-[-8%_0]" style={{ y }}>
              <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b16]/55 via-transparent to-transparent" />
            {caption && <span className="glass-fade text-lift absolute top-5 left-5 rounded-full px-4 py-2 text-[13.5px] font-medium text-white">{caption}</span>}
            {tags && tags.length > 0 && (
              <ul className="absolute right-4 bottom-4 left-4 flex flex-wrap items-center justify-end gap-2 sm:right-6 sm:bottom-6">
                {tags.map((t, k) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + k * 0.08, ease }}
                    className="flex items-center gap-2"
                  >
                    {k > 0 && <span aria-hidden className="text-[13px] text-white/50">{"//"}</span>}
                    <span className="rounded-full bg-white/15 px-3.5 py-1.5 font-display text-[12.5px] font-semibold tracking-[0.06em] text-white uppercase ring-1 ring-white/30 backdrop-blur-md">{t}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  // Main pages: everything on one large photo.
  return (
    <section className="bg-white pt-[74px]">
      <div className="container-x pt-3 sm:pt-4">
        <motion.div
          ref={box}
          data-nav="dark"
          {...reveal}
          className="relative isolate flex min-h-[min(86svh,780px)] flex-col justify-end overflow-hidden rounded-[32px] bg-brand-deep text-white"
        >
          <motion.div aria-hidden className="absolute inset-[-8%_0] -z-10" style={{ y }}>
            <motion.div className="absolute inset-0" initial={{ scale: reduce ? 1 : 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2, ease }}>
              <Image src={image} alt="" fill priority sizes="100vw" className={`object-cover ${grade ? "[filter:contrast(1.15)_brightness(0.92)]" : ""}`} />
              {grade && (
                <>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,#003198_0%,#074cbd_50%,#003198_100%)] mix-blend-color" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,40,130,0.6)_0%,rgba(7,76,189,0.05)_50%,rgba(0,30,90,0.35)_100%)] mix-blend-multiply" />
                </>
              )}
            </motion.div>
          </motion.div>
          {/* brand wash rising from the bottom-left, where the words sit */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(35deg,rgba(0,49,152,0.95)_0%,rgba(7,76,189,0.78)_30%,rgba(0,49,152,0.3)_58%,transparent_78%)]" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#06142e]/70 via-transparent to-transparent" />

          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:p-14">
            <div className="max-w-[760px]">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}>
                <Eyebrow kp={kp} label={label} light />
              </motion.div>
              <div className="mt-6"><Title title={title} size="text-[clamp(2.5rem,5.8vw,5.4rem)]" light /></div>
              {(intro || children) && (
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45, ease }}>
                  {intro && <div className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-white/85">{intro}</div>}
                  {children && <div className="mt-8">{children}</div>}
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease }}
              className="w-full max-w-[280px] rounded-[24px] bg-white/[0.12] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/25 backdrop-blur-2xl max-lg:hidden"
            >
              {stat ? (
                <>
                  <p className="headline text-[52px] leading-none">{stat.value}</p>
                  <p className="mt-3 text-[15px] leading-snug text-white/85">{stat.label}</p>
                </>
              ) : (
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="group block">
                  <span className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-full bg-[#25d366] text-[#06281a]"><WhatsAppIcon className="size-5" /></span>
                    <ArrowUpRight className="size-5 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </span>
                  <span className="mt-6 block text-[19px] font-semibold">Talk to an engineer</span>
                  <span className="mt-1 block text-[14.5px] text-white/75">Our Port Harcourt team, on WhatsApp.</span>
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
