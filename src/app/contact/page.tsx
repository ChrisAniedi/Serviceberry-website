import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: `Contact Serviceberry Global Limited. ${site.address.oneLine}.` };

type Props = { searchParams: Promise<{ type?: string; subject?: string; need?: string; where?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { type, subject, need, where } = await searchParams;
  const message = [need && `Requirement: ${need}`, where && `Location: ${where}`].filter(Boolean).join("\n");
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;

  return (
    <>
      <PageHero kp="7+000" label="Receiver" title={<>Start a job<br /><span className="text-brand">with our team</span></>} intro="Tell us about your technical requirement, equipment need or potential collaboration." />
      <section className="bg-white pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="min-w-0 bg-mist p-6 sm:p-10">
            <h2 className="headline mb-8 text-[29px]">Send an enquiry</h2>
            <ContactForm defaultType={type} defaultSubject={subject} defaultMessage={message} />
          </Reveal>
          <Reveal delay={0.1} className="min-w-0 space-y-3">
            <div className="bg-brand p-7 text-white">
              <ul className="space-y-5 text-[16px]">
                <li className="flex gap-4"><MapPin className="mt-0.5 size-5 shrink-0 text-brand-light" /><address className="not-italic">{site.address.lines.map((l) => <span key={l} className="block">{l}</span>)}</address></li>
                {site.phones.map((p) => <li key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="flex gap-4 hover:text-brand-light"><Phone className="size-5 text-brand-light" /> {p}</a></li>)}
                <li><a href={`mailto:${site.email}`} className="flex gap-4 break-all hover:text-brand-light"><Mail className="size-5 shrink-0 text-brand-light" /> {site.email}</a></li>
              </ul>
            </div>
            {/* TODO(verify): Serviceberry must confirm the map pin before launch. */}
            <iframe title="Map showing the Serviceberry office in Elelenwo, Port Harcourt" src={mapSrc} className="aspect-square w-full grayscale" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
