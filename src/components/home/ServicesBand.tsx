import { VelocityMarquee } from "@/components/motion/VelocityMarquee";

// The service list from the front of the Serviceberry brochure.
const lines = [
  "Operational pigging",
  "Intelligent pigging",
  "Integrity assessment",
  "Commissioning",
  "Chemical cleaning",
  "Flow assurance chemicals",
  "HDPE-lined seawater pipe",
  "CP remote monitoring",
];

function Drop() {
  return (
    <svg viewBox="0 0 12 16" className="mx-[0.45em] h-[0.42em] w-auto shrink-0 fill-berry" aria-hidden>
      <path d="M6 0C9.6 4.6 12 8 12 10.5A6 6 0 0 1 0 10.5C0 8 2.4 4.6 6 0Z" />
    </svg>
  );
}

/** Two bands of the service list, moving opposite ways and reacting to the scroll. */
export function ServicesBand() {
  return (
    <section aria-label="What we do" className="overflow-hidden bg-white py-12 sm:py-16">
      <VelocityMarquee className="headline text-[clamp(2.2rem,5.4vw,4.6rem)] text-ink/90">
        {lines.map((l) => (
          <span key={l} className="flex items-center">
            {l}
            <Drop />
          </span>
        ))}
      </VelocityMarquee>
      <VelocityMarquee speed={-0.6} className="headline mt-1 text-[clamp(2.2rem,5.4vw,4.6rem)] text-transparent opacity-50 [-webkit-text-stroke:1px_#0b4fbf]">
        {[...lines].reverse().map((l) => (
          <span key={l} className="flex items-center">
            {l}
            <Drop />
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}
