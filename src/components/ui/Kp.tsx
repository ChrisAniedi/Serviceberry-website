/**
 * Chainage label. Pipeline engineers mark distance along a line as "KP 1+250"
 * (kilometre point). Each section of the site is a station on Serviceberry's line.
 */
export function Kp({ kp, label, light = false, className = "" }: { kp: string; label: string; light?: boolean; className?: string }) {
  return (
    <p className={`flex items-center gap-3 font-display text-[12px] font-semibold tracking-[0.12em] uppercase ${light ? "text-white/70" : "text-steel"} ${className}`}>
      <span className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[12px] ${light ? "bg-white/10 text-berry-light" : "bg-brand-soft text-brand"}`}>
        <span className={`size-1.5 rounded-full ${light ? "bg-berry" : "bg-brand"}`} />
        KP {kp}
      </span>
      {label}
    </p>
  );
}
