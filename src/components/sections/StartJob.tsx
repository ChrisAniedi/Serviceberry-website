import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { site, enquiryTypes } from "@/content/site";

const field = "w-full bg-mist px-4 py-3.5 text-[16px] text-ink outline-none ring-1 ring-transparent transition placeholder:text-steel-2 focus:bg-white focus:ring-brand";

/** Receiver station: blue panel with contact lines and a quick form that continues to /contact. */
export function StartJob({ id = "kp-7" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 bg-brand py-24 text-white sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <p className="flex items-center gap-3 font-display text-[12px] font-semibold tracking-[0.12em] text-white/70 uppercase">
            <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-white/10 px-2.5 text-[12px] text-brand-light"><span className="size-1.5 rounded-full bg-berry" />KP 7+000</span>
            Receiver
          </p>
          <h2 className="headline mt-6 text-[clamp(2.52rem,5.88vw,5.04rem)]">Start a job</h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/80">
            Have a project or equipment requirement? Tell us what you need and where. We&apos;ll come back with a method, a scope and a price.
          </p>
          <ul className="mt-10 border-t border-white/20 text-[17px]">
            {site.phones.map((p) => (
              <li key={p} className="border-b border-white/20">
                <a href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-4 py-4 hover:text-brand-light"><Phone className="size-5 text-brand-light" /> {p}</a>
              </li>
            ))}
            <li className="border-b border-white/20">
              <a href={`mailto:${site.email}`} className="flex items-center gap-4 py-4 break-all hover:text-brand-light"><Mail className="size-5 shrink-0 text-brand-light" /> {site.email}</a>
            </li>
            <li className="border-b border-white/20">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 py-4 hover:text-brand-light">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand-light" /> {site.address.oneLine}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form action="/contact" method="get" className="chamfer-lg bg-white p-6 text-ink sm:p-9">
            <p className="headline text-[25px]">Quick enquiry</p>
            <p className="mt-1 text-[15px] text-steel">Add your contact details on the next step.</p>
            <label htmlFor="sj-type" className="mt-7 mb-2 block font-display text-[14px] font-semibold">Enquiry type</label>
            <select id="sj-type" name="type" defaultValue="Services" className={`${field} appearance-none`}>
              {enquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <label htmlFor="sj-need" className="mt-5 mb-2 block font-display text-[14px] font-semibold">What do you need?</label>
            <textarea id="sj-need" name="need" rows={3} placeholder="e.g. cleaning pig runs on a 12-inch, 8 km flowline" className={`${field} resize-none`} />
            <label htmlFor="sj-where" className="mt-5 mb-2 block font-display text-[14px] font-semibold">Location</label>
            <input id="sj-where" name="where" placeholder="Field, facility or city" className={field} />
            <button type="submit" className="chamfer mt-7 flex min-h-13 w-full items-center justify-between bg-berry px-5 py-3.5 font-display text-[17px] font-semibold transition-colors hover:bg-berry-deep">
              Continue <ArrowRight className="size-5" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
