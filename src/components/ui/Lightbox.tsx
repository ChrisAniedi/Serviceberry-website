"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { lockScroll } from "@/lib/scroll";

export type LightboxItem = { src: string; label: string };

const ease = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};

/**
 * Full-screen photo viewer. Arrows, the keyboard (← → Esc) and a sideways swipe move
 * between photos; the page stays still underneath. Focus moves in on open and back on close.
 */
export function Lightbox({ items, index, onClose, onIndex }: { items: LightboxItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const [dir, setDir] = useState(1);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const back = useRef<HTMLElement | null>(null);
  const open = index !== null;
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setDir(d);
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    back.current = document.activeElement as HTMLElement;
    lockScroll(true);
    closeBtn.current?.focus();
    return () => {
      lockScroll(false);
      back.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, go, onClose]);

  if (!mounted) return null;
  const it = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {it && index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} of ${items.length}: ${it.label}`}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[70] flex flex-col bg-[#05070c]/92 text-white backdrop-blur-xl"
          onClick={onClose}
        >
          <div className="flex items-center justify-between gap-4 px-[var(--gutter)] py-5" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-[13px] font-semibold tracking-[0.12em] text-white/60 tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              aria-label="Close photo"
              className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={index}
                custom={dir}
                variants={{
                  in: (d: number) => ({ opacity: 0, x: d * 80, scale: 0.97 }),
                  on: { opacity: 1, x: 0, scale: 1 },
                  out: (d: number) => ({ opacity: 0, x: d * -80, scale: 0.97 }),
                }}
                initial="in"
                animate="on"
                exit="out"
                transition={{ duration: 0.5, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-x-[var(--gutter)] inset-y-0 cursor-grab active:cursor-grabbing"
              >
                <Image src={it.src} alt={it.label} fill sizes="100vw" className="pointer-events-none object-contain" />
              </motion.div>
            </AnimatePresence>

            {(
              [
                [-1, "Previous photo", ChevronLeft, "left-[var(--gutter)]"],
                [1, "Next photo", ChevronRight, "right-[var(--gutter)]"],
              ] as const
            ).map(([d, label, Icon, pos]) => (
              <button
                key={d}
                type="button"
                aria-label={label}
                onClick={(e) => {
                  e.stopPropagation();
                  go(d);
                }}
                className={`absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/20 sm:grid ${pos}`}
              >
                <Icon className="size-6" />
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 px-[var(--gutter)] py-5" onClick={(e) => e.stopPropagation()}>
            <motion.p key={it.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="text-[16px] font-medium">
              {it.label}
            </motion.p>
            <div className="flex gap-2 sm:hidden">
              <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                <ChevronLeft className="size-5" />
              </button>
              <button type="button" aria-label="Next photo" onClick={() => go(1)} className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
