"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { img } from "@/content/images";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Socials } from "@/components/ui/Socials";

const ease = [0.76, 0, 0.24, 1] as const;
const out = [0.16, 1, 0.3, 1] as const;

const pages = [
  { label: "Home", href: "/", pic: img.hero },
  { label: "About", href: "/about", pic: img.workersStairs },
  { label: "Services", href: "/services", pic: img.pigging },
  { label: "Equipment", href: "/equipment", pic: img.procurement },
  { label: "Projects", href: "/projects", pic: img.chapterInspect },
  { label: "Partners", href: "/partners", pic: img.monitoring },
  { label: "QHSE", href: "/qhse", pic: img.workerHardhat },
  { label: "Careers", href: "/careers", pic: img.engTool },
  { label: "Academy", href: "/academy", pic: img.engPortrait },
  { label: "Contact", href: "/contact", pic: img.valveGauge },
];

/**
 * Full-screen menu: every page as a numbered station, a photo that follows the hovered
 * page, the service lines, contact details and the Academy link out. The panel wipes down
 * from the top bar; links rise in one after another.
 */
export function MenuOverlay({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const first = useRef<HTMLAnchorElement>(null);
  const current = Math.max(0, pages.findIndex((p) => (p.href === "/" ? pathname === "/" : pathname.startsWith(p.href))));
  const shown = hover ?? current;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => first.current?.focus(), 450);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[45] overflow-y-auto bg-[#08245c] bg-[radial-gradient(90%_70%_at_85%_0%,rgba(11,79,191,0.55),transparent_60%),linear-gradient(165deg,#0a3485_0%,#082866_45%,#051a45_100%)] text-white"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease }}
          data-lenis-prevent
        >

          <div className="container-x relative grid min-h-full gap-12 pt-[100px] pb-12 lg:grid-cols-12 lg:gap-10">
            <nav aria-label="Site" className="lg:col-span-7">
              <ul onMouseLeave={() => setHover(null)}>
                {pages.map((p, i) => (
                  <li key={p.href} className="overflow-hidden border-b border-white/10">
                    <motion.div
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "105%", transition: { duration: 0.3 } }}
                      transition={{ duration: 0.8, delay: 0.25 + i * 0.045, ease: out }}
                    >
                      <Link
                        ref={i === 0 ? first : undefined}
                        href={p.href}
                        onClick={onClose}
                        onMouseEnter={() => setHover(i)}
                        onFocus={() => setHover(i)}
                        aria-current={i === current ? "page" : undefined}
                        className="group flex items-baseline gap-5 py-2 lg:py-[0.55rem]"
                      >
                        <span className="w-12 shrink-0 font-display text-[12px] font-semibold tracking-[0.1em] whitespace-nowrap text-white/40 tabular-nums">
                          {i}+000
                        </span>
                        <span
                          className={`headline text-[clamp(1.75rem,3.1vw,2.7rem)] transition-[color,transform] duration-500 group-hover:translate-x-3 ${i === current ? "text-brand-light" : shown === i ? "text-white" : "text-white/75"}`}
                        >
                          {p.label}
                        </span>
                        {p.label === "Academy" && <span className="text-[13px] text-white/50">Training</span>}
                        {shown === i && (
                          <motion.span layoutId="menu-pig" className="ml-auto h-[10px] w-7 self-center rounded-full bg-brand-light" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                        )}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.aside
              className="flex flex-col gap-7 lg:col-span-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.8, delay: 0.45, ease: out }}
            >
              <div className="chamfer-lg relative hidden aspect-[2/1] overflow-hidden bg-ink lg:block">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={pages[shown].pic}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: out }}
                  >
                    <Image src={pages[shown].pic} alt="" fill sizes="40vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <p className="absolute bottom-4 left-5 font-display text-[12px] font-semibold tracking-[0.12em] text-white/80 uppercase">
                  KP {shown}+000 · {pages[shown].label}
                </p>
              </div>

              <div>
                <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-brand-light uppercase">Services</p>
                <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} onClick={onClose} className="block border-b border-white/10 py-2 text-[15px] text-white/80 hover:text-white">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="text-[15px] leading-relaxed text-white/75">
                  <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-brand-light uppercase">Talk to us</p>
                  {site.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="mt-2 block hover:text-white">{p}</a>
                  ))}
                  <a href={`mailto:${site.email}`} className="block hover:text-white">{site.email}</a>
                </div>
                <div className="text-[15px] leading-relaxed text-white/75">
                  <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-brand-light uppercase">Visit</p>
                  <p className="mt-2">{site.address.lines.map((l) => <span key={l} className="block">{l}</span>)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                <p className="text-[14px] text-white/70">Follow Serviceberry</p>
                <Socials />
              </div>

              <a
                href={site.academyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="chamfer group flex items-center justify-between gap-4 bg-white px-5 py-4 text-ink"
              >
                <span>
                  <span className="block font-display text-[18px] font-semibold">Serviceberry Academy</span>
                  <span className="block text-[14px] text-ink/70">Go to the training platform</span>
                </span>
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </motion.aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
