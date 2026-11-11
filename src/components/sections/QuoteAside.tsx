import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, telLink, waLink } from "@/content/site";

const next = [
  { t: "Tell us what you need", b: "By this form, email or WhatsApp. A line list, a datasheet or a photo of the problem all help." },
  { t: "We ask, then scope it", b: "An engineer reads it, asks what is missing and proposes a method, equipment and crew." },
  { t: "A clear quote", b: "Scope, schedule and price in writing, with the roles of any partner made clear." },
  { t: "We mobilise and report", b: "Our crews do the work safely and you get a clear report at the end." },
];

/** Beside the quote form: what happens after you send, and the direct lines. */
export function QuoteAside() {
  return (
    <div className="space-y-3 lg:sticky lg:top-24">
      <div className="rounded-[30px] bg-[#070b16] p-7 text-white sm:p-8">
        <p className="font-display text-[20px] font-semibold">What happens next</p>
        <ol className="mt-6 space-y-5">
          {next.map((s, i) => (
            <li key={s.t} className="grid grid-cols-[38px_1fr] gap-2">
              <span className="font-display text-[22px] leading-none font-light text-brand-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block text-[15.5px] font-semibold">{s.t}</span>
                <span className="mt-1 block text-[14px] leading-relaxed text-white/60">{s.b}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-[30px] bg-white p-7 ring-1 ring-line sm:p-8">
        <p className="font-display text-[20px] font-semibold">Prefer to talk?</p>
        <ul className="mt-5 space-y-1 text-[15px]">
          {site.phones.map((p) => (
            <li key={p}>
              <a href={telLink(p)} className="flex items-center gap-3 rounded-xl py-2 transition-colors hover:text-brand"><Phone className="size-4 text-brand" /> {p}</a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-xl py-2 break-all transition-colors hover:text-brand"><Mail className="size-4 shrink-0 text-brand" /> {site.email}</a>
          </li>
          <li className="flex items-start gap-3 py-2 text-steel"><MapPin className="mt-0.5 size-4 shrink-0 text-brand" /> {site.address.oneLine}</li>
        </ul>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#25d366] font-display text-[15px] font-semibold text-[#06281a] transition-colors hover:bg-[#2fe072]">
          <WhatsAppIcon /> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
