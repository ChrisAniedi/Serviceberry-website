"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { brochure } from "@/content/images";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Closing call to action, after the back page of the brochure: "Achieve more with Efficient
 * Engineering." in the crimson-to-blue gradient over a faded aerial of an industrial
 * waterfront, then a navy sweep with a fine crimson line running into the footer.
 */
export function Closing({ id = "kp-7" }: { id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "0%"]);
  const sweep = useTransform(scrollYProgress, [0.35, 0.9], reduce ? [0, 0] : [80, 0]);

  return (
    <section ref={ref} id={id} className="relative isolate scroll-mt-20 overflow-hidden bg-white">
      <motion.div className="absolute inset-x-0 top-[18%] -z-10 h-[70%]" style={{ y: photoY }}>
        <Image src={brochure.aerialPlant} alt="" fill sizes="100vw" className="object-cover opacity-45 [mask-image:linear-gradient(to_bottom,transparent,black_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff_0%,rgba(255,255,255,0.4)_35%,rgba(255,255,255,0.1)_70%,rgba(255,255,255,0.2))]" />
      </motion.div>

      <div className="container-x pt-28 pb-[min(26vw,320px)] sm:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-light tracking-[-0.02em] text-brand"
        >
          Achieve more with
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.1, ease }}
          className="headline mt-1 bg-[linear-gradient(100deg,#0a2a57_0%,#0b4fbf_55%,#6a3fa8_85%,#c4205a_110%)] bg-clip-text pb-2 text-[clamp(3rem,8vw,7.4rem)] leading-[0.95] font-medium text-transparent"
        >
          Efficient
          <br />
          Engineering.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5"
        >
          <span className="flex items-center gap-4 text-[clamp(1.1rem,1.6vw,1.4rem)] text-brand-deep">
            <span className="h-[3px] w-16 bg-berry" /> Let&apos;s create value together today!
          </span>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Start a job</Button>
            <Button href="/contact?type=Equipment%20Sourcing" variant="line">Source equipment</Button>
          </div>
        </motion.div>
      </div>

      {/* the navy sweep */}
      <motion.div style={{ y: sweep }} className="relative -mt-[min(22vw,280px)] -mb-px">
        <svg aria-hidden viewBox="0 0 1440 260" preserveAspectRatio="none" className="block h-[min(20vw,260px)] w-full">
          <path d="M0 176 C 420 88, 900 66, 1440 26" fill="none" stroke="#c4205a" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          <path d="M0 180 C 420 92, 900 70, 1440 30 L1440 260 L0 260 Z" fill="#0a2a57" />
        </svg>
      </motion.div>
    </section>
  );
}
