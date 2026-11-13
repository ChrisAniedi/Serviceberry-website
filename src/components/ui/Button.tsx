import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Pill button (shadcn-style, cva variants). On hover a darker fill sweeps in from the left
 * and the arrow in the round chip slides out and back in from the other side.
 */
export const buttonVariants = cva(
  "group relative isolate inline-flex items-center justify-between gap-4 overflow-hidden rounded-full font-display font-medium tracking-[-0.01em] whitespace-nowrap transition-[color,box-shadow,transform] duration-500 ease-out-expo before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:rounded-full before:transition-transform before:duration-500 before:ease-out-expo hover:before:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-berry text-white shadow-[0_14px_30px_-14px_rgba(182,52,75,0.85)] before:bg-berry-deep",
        brand: "bg-brand text-white shadow-[0_14px_30px_-14px_rgba(7,76,189,0.8)] before:bg-brand-deep",
        white: "bg-white text-ink before:bg-mist",
        line: "text-ink ring-1 ring-ink/20 ring-inset before:bg-brand-deep hover:text-white hover:ring-brand-deep",
        glass: "bg-white/10 text-white ring-1 ring-white/30 ring-inset backdrop-blur-md before:bg-white hover:text-ink",
      },
      size: {
        md: "min-h-12 py-1.5 pr-1.5 pl-6 text-[15px]",
        sm: "min-h-11 py-1 pr-1 pl-5 text-[14px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

const chipVariants = cva("relative grid shrink-0 place-items-center overflow-hidden rounded-full transition-colors duration-500", {
  variants: {
    variant: {
      primary: "bg-white text-berry",
      brand: "bg-white text-brand",
      white: "bg-brand-deep text-white",
      line: "bg-brand-deep text-white group-hover:bg-white group-hover:text-brand-deep",
      glass: "bg-white text-ink group-hover:bg-ink group-hover:text-white",
    },
    size: { md: "size-9", sm: "size-8" },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

// Older names still used around the site.
const alias = { hivis: "primary", "line-light": "glass" } as const;
type Variant = NonNullable<VariantProps<typeof buttonVariants>["variant"]> | keyof typeof alias;

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  external?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", size = "md", external, className }: Props) {
  const v = variant in alias ? alias[variant as keyof typeof alias] : (variant as Exclude<Variant, keyof typeof alias>);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const cls = cn(buttonVariants({ variant: v, size }), className);
  const inner = (
    <>
      <span>{children}</span>
      <span className={chipVariants({ variant: v, size })}>
        <Icon className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-[180%]" />
        <Icon aria-hidden className="absolute size-4 -translate-x-[180%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
