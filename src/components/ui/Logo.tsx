import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The official Serviceberry Global Limited logo (public/images/brand/). `logo.png` drops the
 * RC number, which is unreadable at top-bar size; `logo-full.png` keeps it. The `-white`
 * versions are for dark backgrounds: everything white except the crimson drop.
 */
const files = {
  short: { src: "/images/brand/logo.png", white: "/images/brand/logo-white.png", w: 443, h: 101 },
  full: { src: "/images/brand/logo-full.png", white: "/images/brand/logo-full-white.png", w: 532, h: 101 },
};

/** `compact` is the smaller size used in the top bar; `full` adds the RC number (footer). */
export function Logo({ light = false, compact = false, full = false, className = "" }: { light?: boolean; compact?: boolean; full?: boolean; className?: string }) {
  const f = full ? files.full : files.short;
  const height = compact ? 38 : full ? 60 : 46;
  const width = Math.round((f.w / f.h) * height);
  return (
    <Link href="/" aria-label="Serviceberry Global Limited, home" className={cn("relative block shrink-0", className)} style={{ width, height }}>
      <Image src={f.src} alt="" width={width} height={height} priority className={cn("absolute inset-0 h-full w-full transition-opacity duration-500", light ? "opacity-0" : "opacity-100")} />
      <Image src={f.white} alt="" width={width} height={height} priority className={cn("absolute inset-0 h-full w-full transition-opacity duration-500", light ? "opacity-100" : "opacity-0")} />
    </Link>
  );
}
