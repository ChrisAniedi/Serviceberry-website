import type { ReactNode } from "react";

/** Endless sideways strip. Content is doubled so the loop is seamless. */
export function Marquee({ children, duration = 40, className = "" }: { children: ReactNode; duration?: number; className?: string }) {
  return (
    <div className={`group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}>
      <div
        className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
