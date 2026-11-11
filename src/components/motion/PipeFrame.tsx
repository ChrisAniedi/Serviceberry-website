"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** shown on top of the photo */
  children?: ReactNode;
  video?: string | null;
};

/**
 * Photo inside a pipe-shaped (capsule) frame. As it scrolls up the screen the
 * frame opens out to a full-width rectangle, and a pig runs along its bottom edge.
 */
export function PipeFrame({ src, alt, priority, className = "", children, video }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const inset = useTransform(scrollYProgress, [0.25, 0.55], [5, 0], { clamp: true });
  const radius = useTransform(scrollYProgress, [0.25, 0.55], [400, 0], { clamp: true });
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(0 ${i}% round ${r}px)`);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const pig = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"], { clamp: true });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div className="relative h-full w-full overflow-hidden bg-ink" style={{ clipPath }}>
        <motion.div className="absolute inset-[-9%_0]" style={{ y: imgY }}>
          {video ? (
            <video className="h-full w-full object-cover" src={video} poster={src} autoPlay muted loop playsInline aria-hidden />
          ) : (
            <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        {children}
        <div aria-hidden className="absolute inset-x-[8%] bottom-0 h-[3px] bg-white/25">
          <motion.span className="absolute top-1/2 h-[9px] w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-berry" style={{ left: pig }} />
        </div>
      </motion.div>
    </div>
  );
}
