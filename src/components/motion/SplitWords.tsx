"use client";

import { motion } from "motion/react";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** Words (lower-case, no punctuation) painted in the accent colour. */
  highlight?: string[];
  as?: "h1" | "h2" | "p";
  animateOnMount?: boolean;
};

/** Headline that rises in word by word from behind a mask. */
export function SplitWords({ text, className, delay = 0, highlight = [], as = "h2", animateOnMount }: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -80px 0px" } };

  return (
    <Tag className={className} initial="hide" {...trigger} aria-label={text}>
      {words.map((w, i) => {
        const hot = highlight.includes(w.toLowerCase().replace(/[^a-z&]/g, ""));
        return (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${hot ? "text-accent" : ""}`}
              variants={{
                hide: { y: "110%", rotate: 4 },
                show: {
                  y: "0%",
                  rotate: 0,
                  transition: { duration: 1, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
