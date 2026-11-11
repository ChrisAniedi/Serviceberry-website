"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from "motion/react";
import type { ReactNode } from "react";

/**
 * Endless strip that drifts on its own and picks up a little speed while the page scrolls.
 * Content is repeated so the loop is seamless. Static with reduced motion.
 */
export function VelocityMarquee({ children, speed = 0.8, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 60, stiffness: 120 });
  // scrolling nudges it along gently (at most about 2x), never whips it
  const boost = useTransform(v, [-2000, 0, 2000], [-1.2, 0, 1.2]);
  const x = useTransform(base, (b) => `${wrap(-25, -50, b)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    base.set(base.get() + speed * (delta / 1000) * (1 + Math.abs(boost.get())));
  });

  return (
    <div className={`flex overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] ${className}`}>
      <motion.div className="flex shrink-0 flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="flex shrink-0 items-center" aria-hidden={n > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
