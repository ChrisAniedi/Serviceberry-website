"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, waLink } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;
const SEEN = "sb-wa-hint";

/**
 * A round WhatsApp button that stays in the corner on every page. The label slides out on
 * hover, and once a visit a small note pops up beside it for a few seconds.
 */
export function WhatsAppFloat() {
  const [hint, setHint] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === "1";
    } catch {}
    if (seen) return;
    const show = setTimeout(() => {
      setHint(true);
      try {
        sessionStorage.setItem(SEEN, "1");
      } catch {}
    }, 9000);
    const hide = setTimeout(() => setHint(false), 17000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.5, ease }}
            className="relative mb-2 hidden max-w-[240px] rounded-2xl rounded-br-md bg-white p-4 pr-9 text-[14px] text-ink shadow-[0_20px_50px_-20px_rgba(11,26,62,0.5)] ring-1 ring-line sm:block"
          >
            <p className="font-semibold">Questions about a job?</p>
            <p className="mt-1 text-steel">Message our team on WhatsApp.</p>
            <button type="button" onClick={() => setHint(false)} aria-label="Dismiss" className="absolute top-2 right-2 grid size-7 place-items-center rounded-full text-steel hover:bg-mist">
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Serviceberry on WhatsApp, ${site.whatsapp} (opens WhatsApp)`}
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease }}
        className="group relative flex h-14 items-center rounded-full bg-ink pr-[18px] pl-[18px] text-white shadow-[0_18px_40px_-14px_rgba(11,26,62,0.7)] ring-1 ring-white/10 transition-[padding,background-color] duration-500 ease-out-expo hover:bg-brand-deep hover:pr-6"
      >
        <span aria-hidden className="absolute top-1/2 left-[28px] size-8 -translate-1/2 animate-ping rounded-full bg-[#25d366]/25 [animation-duration:2.6s]" />
        <span className="relative grid size-[22px] place-items-center text-[#25d366]">
          <WhatsAppIcon className="size-[22px]" />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-display text-[14.5px] font-medium opacity-0 transition-[max-width,opacity,margin] duration-500 ease-out-expo group-hover:ml-3 group-hover:max-w-[160px] group-hover:opacity-100 group-focus-visible:ml-3 group-focus-visible:max-w-[160px] group-focus-visible:opacity-100">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
