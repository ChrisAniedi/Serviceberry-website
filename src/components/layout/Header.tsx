"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { services } from "@/content/services";
import { MenuOverlay } from "./MenuOverlay";

const ease = [0.16, 1, 0.3, 1] as const;

/** The few links people reach for most; everything else lives in the Menu. */
const primary = [
  { label: "Services", href: "/services", drop: true },
  { label: "Equipment", href: "/equipment" },
  { label: "Projects", href: "/projects" },
  { label: "Academy", href: "/academy" },
];

/**
 * Top bar: four primary links on the left, the logo centred (Services opens a panel), "Get a quote" and a Menu
 * button that opens the full-screen menu. Clear over the home hero, dark glass once the
 * page moves, white past the hero. Tucks away while reading down, returns on the way up.
 */
export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [moved, setMoved] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [drop, setDrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setMoved(y > 8);
    setPastHero(y > window.innerHeight - 90);
    if (y > 600 && y > prev + 2 && !drop) setHidden(true);
    else if (y < prev - 2 || y <= 600) setHidden(false);
  });
  useEffect(() => {
    setPastHero(window.scrollY > window.innerHeight - 90);
    setOpen(false);
    setDrop(false);
  }, [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) setDrop(false);
  }, [open]);
  const close = useCallback(() => setOpen(false), []);

  const dark = open || (pathname === "/" && !pastHero && !drop);
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const linkCls = (on: boolean) =>
    `relative flex h-[74px] items-center gap-0.5 px-2.5 font-display text-[14.5px] font-medium transition-colors ${on ? (dark ? "text-brand-light" : "text-brand") : dark ? "text-white/85 hover:text-white" : "text-ink hover:text-brand"}`;

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          open
            ? "bg-transparent"
            : dark
              ? moved
                ? "bg-ink/75 shadow-[0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md"
                : "bg-transparent shadow-[0_1px_0_rgba(255,255,255,0.14)]"
              : `bg-white/95 backdrop-blur ${moved ? "shadow-[0_1px_0_#dde3ea,0_10px_30px_-18px_rgba(12,26,43,0.35)]" : "shadow-[0_1px_0_#dde3ea]"}`
        }`}
        animate={{ y: hidden && !open ? -80 : 0 }}
        transition={{ duration: 0.45, ease }}
        onMouseLeave={() => setDrop(false)}
      >
        <div className="container-x grid h-[74px] grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <motion.nav
            aria-label="Main"
            className="-ml-2.5 hidden items-center lg:flex"
            animate={{ opacity: open ? 0 : 1 }}
            style={{ pointerEvents: open ? "none" : "auto" }}
            transition={{ duration: 0.3 }}
          >
            {primary.map((l) =>
              l.drop ? (
                <button
                  key={l.href}
                  type="button"
                  aria-expanded={drop}
                  onMouseEnter={() => setDrop(true)}
                  onClick={() => setDrop((v) => !v)}
                  className={linkCls(active(l.href) || drop)}
                >
                  {l.label} <ChevronDown className={`size-4 transition-transform ${drop ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link key={l.href} href={l.href} onMouseEnter={() => setDrop(false)} className={linkCls(active(l.href))}>
                  {l.label}
                  {active(l.href) && <span className="absolute inset-x-2.5 bottom-0 h-[3px] bg-current" />}
                </Link>
              ),
            )}
          </motion.nav>

          <Logo light={dark} compact className="lg:justify-self-center" />

          <div className="flex items-center justify-self-end gap-2 sm:gap-3">
            <Button href="/request-a-quote" size="sm" className="hidden sm:inline-flex">
              Get a quote
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`flex min-h-11 items-center gap-3 rounded-full pr-4 pl-5 font-display text-[15px] font-semibold transition-colors ${
                dark ? "bg-white/10 text-white ring-1 ring-white/20 ring-inset hover:bg-white/20" : "bg-ink text-white hover:bg-brand-deep"
              }`}
            >
              <span aria-hidden className="relative block h-5 overflow-hidden">
                <motion.span className="block" animate={{ y: open ? "-50%" : "0%" }} transition={{ duration: 0.4, ease }}>
                  <span className="block h-5 leading-5">Menu</span>
                  <span className="block h-5 leading-5">Close</span>
                </motion.span>
              </span>
              <span aria-hidden className="relative block h-3 w-5">
                <motion.span className="absolute left-0 h-[2px] w-5 bg-current" animate={open ? { top: 5, rotate: 45 } : { top: 1, rotate: 0 }} transition={{ duration: 0.4, ease }} />
                <motion.span className="absolute right-0 h-[2px] bg-berry" animate={open ? { top: 5, rotate: -45, width: 20 } : { top: 9, rotate: 0, width: 12 }} transition={{ duration: 0.4, ease }} />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {drop && !open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease }}
              className="absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_30px_60px_-30px_rgba(12,26,43,0.35)] lg:block"
            >
              <div className="container-x grid grid-cols-[1fr_300px] gap-10 py-8">
                <ul className="grid grid-cols-2 gap-x-8">
                  {services.map((s, i) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group flex items-start gap-4 border-b border-line py-4">
                        <span className="pt-1 font-display text-[13px] font-semibold text-steel-2 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span>
                          <span className="block font-display text-[18px] font-semibold tracking-[-0.01em] group-hover:text-brand">{s.title}</span>
                          <span className="mt-0.5 line-clamp-1 block text-[14px] text-steel">{s.short}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="group relative block overflow-hidden bg-ink">
                  <Image src={services[0].image} alt="" fill sizes="300px" className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-x-5 bottom-5 text-white">
                    <span className="block font-display text-[24px] leading-none font-semibold">All services</span>
                    <span className="mt-2 inline-flex items-center gap-1 text-[14px] text-brand-light">Overview <ArrowUpRight className="size-4" /></span>
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <MenuOverlay open={open} onClose={close} pathname={pathname} />
    </>
  );
}
