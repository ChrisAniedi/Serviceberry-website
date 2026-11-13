import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, Mail, MapPin, Phone, Ruler, Timer } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { brochure } from "@/content/images";
import { site, telLink, waLink } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: `Contact Serviceberry Global Limited. ${site.address.oneLine}.` };

type Props = { searchParams: Promise<{ type?: string; subject?: string; need?: string; where?: string }> };

const include = [
  { icon: Ruler, t: "Line size, length and product" },
  { icon: MapPin, t: "Where the asset is" },
  { icon: Timer, t: "When you need the work" },
  { icon: FileText, t: "Drawings, datasheets or photos" },
];

export default async function ContactPage({ searchParams }: Props) {
  const { type, subject, need, where } = await searchParams;
  const message = [need && `Requirement: ${need}`, where && `Location: ${where}`].filter(Boolean).join("\n");
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address.mapQuery)}`;
  const lines = [
    { icon: WhatsAppIcon, k: "WhatsApp", v: site.whatsapp, href: waLink(), ext: true, wa: true },
    { icon: Phone, k: "Call", v: site.phones[0], href: telLink(site.phones[0]), ext: false, wa: false },
    { icon: Phone, k: "Call", v: site.phones[1], href: telLink(site.phones[1]), ext: false, wa: false },
    { icon: Mail, k: "Email", v: site.email, href: `mailto:${site.email}`, ext: false, wa: false },
  ];

  return (
    <>
      <PageHero
        compact
        kp="7+000"
        label="Contact"
        title={<>Talk to the team <span className="text-brand">behind the line.</span></>}
        intro="Engineers, technicians and project leads in Port Harcourt. Message, call or visit, whichever is quickest for you."
      />

      <section className="bg-white pb-20">
        <div className="container-x">
          <Reveal className="grid overflow-hidden rounded-[36px] bg-white ring-1 ring-line lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            {/* direct lines, over a crew photo */}
            <div data-nav="dark" className="relative isolate flex flex-col justify-between gap-10 overflow-hidden bg-[#061230] p-7 text-white sm:p-10">
              <Image src={brochure.crewPigging} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="-z-10 object-cover opacity-45" />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,18,48,0.55),rgba(6,18,48,0.92))]" />
              <div>
                <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand-light uppercase">Reach us directly</p>
                <p className="headline mt-4 text-[clamp(1.8rem,2.8vw,2.5rem)] leading-[1.05]">A person answers, not a menu.</p>
              </div>
              <ul className="space-y-2">
                {lines.map((l) => (
                  <li key={l.v}>
                    <a
                      href={l.href}
                      target={l.ext ? "_blank" : undefined}
                      rel={l.ext ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-[18px] bg-white/[0.07] p-3 pr-4 ring-1 ring-white/12 backdrop-blur-xl transition-colors hover:bg-white/[0.14]"
                    >
                      <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${l.wa ? "bg-[#25d366] text-[#06281a]" : "bg-white/12 text-brand-light"}`}>
                        <l.icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12.5px] text-white/60">{l.k}</span>
                        <span className="block truncate text-[16px] font-medium">{l.v}</span>
                      </span>
                      <ArrowUpRight className="size-5 shrink-0 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* the form */}
            <div className="min-w-0 p-6 sm:p-10 lg:p-12">
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* the office, on the map */}
      <section className="bg-white pb-20">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[36px] bg-mist ring-1 ring-line">
            {/* TODO(verify): Serviceberry must confirm the map pin before launch. */}
            <iframe title="Map showing the Serviceberry office in Elelenwo, Port Harcourt" src={mapSrc} className="h-[420px] w-full grayscale-[0.6] sm:h-[480px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div className="p-5 sm:absolute sm:top-6 sm:left-6 sm:max-w-sm sm:p-0">
              <div className="rounded-[26px] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(11,26,62,0.5)] ring-1 ring-line sm:p-7">
                <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">Visit our office</p>
                <address className="mt-3 text-[17px] leading-relaxed not-italic">{site.address.lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
                <a href={directions} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 font-display text-[14.5px] font-medium text-white transition-colors hover:bg-brand-deep">
                  Get directions <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* what helps */}
      <section className="bg-mist py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
          <Reveal>
            <h2 className="headline text-[clamp(1.8rem,3vw,2.6rem)]">For a faster <span className="text-brand">answer</span></h2>
            <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-steel">Include what you can. Whatever is missing, we will ask.</p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {include.map((x, i) => (
              <Reveal key={x.t} delay={i * 0.06} className="rounded-[24px] bg-white p-6 ring-1 ring-line">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand"><x.icon className="size-5" strokeWidth={1.7} /></span>
                <p className="mt-6 text-[16px] font-semibold leading-snug">{x.t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
