"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Endless strip that drifts on its own and speeds up (or turns round) with the scroll.
 * Content is repeated so the loop is seamless. Static with reduced motion.
 */
export function VelocityMarquee({ children, speed = 2.2, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(v, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(base, (b) => `${wrap(-25, -50, b)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    base.set(base.get() + dir.current * speed * (delta / 1000) * (1 + Math.abs(b)));
  });

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
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
