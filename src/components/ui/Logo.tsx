import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Serviceberry mark redrawn from the brochure: a blue S drawn as a run of pipe with a riser,
 * and the crimson drop. TODO(brand): replace with the official logo file
 * (public/images/serviceberry/logo.svg) once supplied.
 */
export function LogoMark({ light = false, className }: { light?: boolean; className?: string }) {
  const blue = light ? "#ffffff" : "#0b4fbf";
  return (
    <svg viewBox="0 0 48 48" className={cn("size-10 shrink-0", className)} aria-hidden>
      <path d="M33 10.5H17.5a7.75 7.75 0 0 0 0 15.5h9a7.75 7.75 0 0 1 0 15.5H6" fill="none" stroke={blue} strokeWidth="7" />
      <rect x="31" y="3" width="6" height="12" fill={blue} />
      <rect x="29.5" y="3" width="9" height="2.6" fill={blue} />
      <path d="M41 25.5c3.6 4.6 5.4 8 5.4 10.7a5.4 5.4 0 0 1-10.8 0c0-2.7 1.8-6.1 5.4-10.7Z" fill="#c4205a" />
      <path d="M43.2 34.2c.9 1.2 1.4 2.1 1.4 2.8a1.4 1.4 0 0 1-2.8 0c0-.7.5-1.6 1.4-2.8Z" fill="#fff" />
    </svg>
  );
}

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Serviceberry Global Limited, home" className={cn("flex items-center gap-2.5", className)}>
      <LogoMark light={light} />
      <span className="leading-none">
        <span className={cn("block font-display text-[19px] font-bold tracking-[-0.01em] uppercase [font-stretch:112%]", light ? "text-white" : "text-brand")}>
          Serviceberry
        </span>
        <span className={cn("mt-1 block text-[9.5px] font-semibold tracking-[0.42em] uppercase", light ? "text-white/70" : "text-brand/80")}>
          Global Limited
        </span>
      </span>
    </Link>
  );
}
