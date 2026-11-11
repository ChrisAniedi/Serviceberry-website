import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactWays } from "@/components/sections/ContactWays";
import { img } from "@/content/images";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: `Contact Serviceberry Global Limited. ${site.address.oneLine}.` };

type Props = { searchParams: Promise<{ type?: string; subject?: string; need?: string; where?: string }> };

const include = ["Line size, length and product", "Where the asset is (field, facility, offshore)", "When you need the work done", "Drawings, a datasheet or photos if you have them"];

export default async function ContactPage({ searchParams }: Props) {
  const { type, subject, need, where } = await searchParams;
  const message = [need && `Requirement: ${need}`, where && `Location: ${where}`].filter(Boolean).join("\n");
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;

  return (
    <>
      <PageHero
        compact
        after="bg-stone"
        kp="7+000"
        label="Contact"
        title={<>Talk to the team <span className="text-brand">behind the line.</span></>}
        intro="Engineers, technicians and project leads in Port Harcourt. Message, call or visit; whichever is quickest for you."
        image={img.engPhone}
      />

      <section className="bg-stone pt-14 pb-24 sm:pt-20">
        <div className="container-x">
          <ContactWays />

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)] lg:items-start">
            <Reveal className="min-w-0 rounded-[30px] bg-white p-6 ring-1 ring-line sm:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="headline text-[clamp(1.8rem,2.8vw,2.4rem)]">Send a message</h2>
                  <p className="mt-2 text-[15.5px] text-steel">We read every enquiry and reply as soon as we can.</p>
                </div>
                <Link href="/request-a-quote" className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-brand">
                  Need a price? Request a quote <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="mt-8">
                <ContactForm defaultType={type} defaultSubject={subject} defaultMessage={message} />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="min-w-0 space-y-3 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[30px] bg-white ring-1 ring-line">
                {/* TODO(verify): Serviceberry must confirm the map pin before launch. */}
                <iframe title="Map showing the Serviceberry office in Elelenwo, Port Harcourt" src={mapSrc} className="aspect-[4/3] w-full grayscale-[0.7]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div className="p-6">
                  <p className="font-display text-[13px] font-semibold tracking-[0.12em] text-brand uppercase">Our office</p>
                  <address className="mt-2 text-[16px] leading-relaxed not-italic">{site.address.lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 font-display text-[14.5px] font-medium text-white transition-colors hover:bg-brand-deep"
                  >
                    Get directions <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
              <div className="rounded-[30px] bg-[#070b16] p-7 text-white">
                <p className="font-display text-[18px] font-semibold">For a faster answer, include</p>
                <ul className="mt-4 space-y-2.5">
                  {include.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[15px] text-white/80">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-light/15 text-brand-light"><Check className="size-3" strokeWidth={3} /></span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
