"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts from 0 to `to` the first time it is seen. Pads to two digits for the technical look. */
export function CountUp({ to, pad = 1, className }: { to: number; pad?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = String(Math.round(v)).padStart(pad, "0")),
    });
    return () => controls.stop();
  }, [inView, to, pad]);

  return (
    <span ref={ref} className={className}>
      {String(to).padStart(pad, "0")}
    </span>
  );
}
