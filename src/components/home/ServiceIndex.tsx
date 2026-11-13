"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";

/** Big numbered list of service lines. On desktop a photo follows the cursor over the list. */
export function ServiceIndex() {
  const box = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.5 });
  const y = useSpring(my, { stiffness: 220, damping: 26, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section id="kp-1" className="scroll-mt-20 bg-paper py-24 sm:py-32">
      <div className="container-x">
        <Title
          kp="1+000"
          label="Services"
          title={<>Seven service lines.<br /><span className="text-brand">One accountable team.</span></>}
          intro="Delivered by our own crews and equipment, and through specialist technology partners where the job needs them. Every scope says who does what."
        />

        <div ref={box} onMouseMove={onMove} onMouseLeave={() => setHover(null)} className="relative mt-14">
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 z-20 hidden h-[230px] w-[330px] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-24px_rgba(11,26,62,0.55)] lg:block"
                style={{ x, y, translateX: "-50%", translateY: "-50%" }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25 }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div key={hover} className="absolute inset-0" initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                    <Image src={services[hover].image} alt="" fill sizes="330px" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <ul className="border-t border-ink/15">
          {services.map((s, i) => (
            <li key={s.slug} className="border-b border-ink/15">
              <Reveal delay={i * 0.04}>
                <Link
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setHover(i)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 py-6 sm:gap-x-8 lg:grid-cols-[60px_1.3fr_1fr_auto] lg:py-7"
                >
                  <span className="relative row-span-2 size-16 overflow-hidden rounded-2xl sm:size-20 lg:hidden">
                    <Image src={s.image} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                  <span className="hidden font-display text-[18px] font-semibold text-steel-2 lg:block">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`headline text-[clamp(1.34rem,2.86vw,2.44rem)] transition-colors duration-300 ${hover === i ? "text-brand" : ""}`}>{s.title}</span>
                  <span className="col-start-2 text-[15px] leading-snug text-steel lg:col-start-auto">{s.short}</span>
                  <span className={`col-start-3 row-span-2 row-start-1 grid size-12 place-items-center rounded-full transition-colors duration-300 lg:col-start-auto lg:row-span-1 ${hover === i ? "bg-brand text-white" : "bg-white text-ink ring-1 ring-ink/15"}`}>
                    <ArrowUpRight className="size-5" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
