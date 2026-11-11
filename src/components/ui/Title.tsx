import { Reveal } from "@/components/motion/Reveal";
import { Kp } from "./Kp";
import type { ReactNode } from "react";

type Props = {
  kp?: string;
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  as?: "h1" | "h2";
  size?: "lg" | "md";
};

/** Section opener: KP label, headline, optional intro to the right. */
export function Title({ kp, label, title, intro, light, as: Tag = "h2", size = "lg" }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <Reveal className="lg:col-span-7">
        {kp && label && <Kp kp={kp} label={label} light={light} className="mb-5" />}
        <Tag className={`headline ${size === "lg" ? "text-[clamp(2.2rem,4.7vw,4rem)]" : "text-[clamp(1.8rem,3.4vw,2.85rem)]"} ${light ? "text-white" : "text-ink"}`}>
          {title}
        </Tag>
      </Reveal>
      {intro && (
        <Reveal delay={0.1} className={`text-[17px] leading-relaxed lg:col-span-5 lg:pb-2 ${light ? "text-white/75" : "text-steel"}`}>
          {intro}
        </Reveal>
      )}
    </div>
  );
}
