/**
 * Marks unverified content. Shown only while developing (npm run dev), never on the
 * live site. Every item must be verified before launch: see README "Before launch".
 */
export function Illustrative({ className = "" }: { className?: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span className={`inline-flex items-center bg-berry px-2 py-1 font-display text-[11px] font-bold tracking-[0.08em] text-white uppercase ${className}`} title="Placeholder content. Verify before launch.">
      To verify
    </span>
  );
}
