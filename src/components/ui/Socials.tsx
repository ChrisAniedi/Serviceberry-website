import { cn } from "@/lib/utils";
import { socials } from "@/content/site";

const icons: Record<string, React.ReactNode> = {
  LinkedIn: (
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z"
    />
  ),
  Instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </g>
  ),
  Facebook: (
    <path
      fill="currentColor"
      d="M13.5 21.5v-7.6h2.55l.4-3h-2.95V9.03c0-.86.24-1.45 1.48-1.45h1.57V4.9a21 21 0 0 0-2.3-.12c-2.27 0-3.83 1.39-3.83 3.94v2.2H7.85v3h2.57v7.6h3.08Z"
    />
  ),
};

/** Round social buttons. Links live in `socials` (src/content/site.ts). */
export function Socials({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.name} (opens in a new tab)`}
            className={cn(
              "grid size-11 place-items-center rounded-full ring-1 transition-colors duration-300",
              tone === "dark" ? "text-white ring-white/20 hover:bg-white hover:text-ink" : "text-ink ring-ink/15 hover:bg-ink hover:text-white",
            )}
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
              {icons[s.name]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
