import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Illustrative } from "@/components/ui/Illustrative";
import { Reveal } from "@/components/motion/Reveal";
import { PartnerTile } from "@/components/sections/PartnerTile";
import { StartQuote } from "@/components/sections/StartQuote";
import { partners } from "@/content/partners";
import { img } from "@/content/images";

export const metadata: Metadata = { title: "Technology Partners & Strategic Alliances", description: "The technology owners, specialist service providers and suppliers Serviceberry works with." };

export default function PartnersPage() {
  return (
    <>
      <PageHero
        kp="5+500"
        label="Partners"
        title={<>Technology partners <span className="text-brand">& strategic alliances.</span></>}
        intro="We collaborate with technology owners, specialist service providers and equipment suppliers to give clients access to the right products, expertise and technical solutions."
        image={img.blueprints}
        stat={{ value: "3", label: "Technology partners, supported locally by our team." }}
      />
      <section className="bg-mist py-24">
        <div className="container-x">
          <div className="grid gap-3 sm:grid-cols-3">{partners.map((p) => <PartnerTile key={p.slug} partner={p} />)}</div>
          <div className="mt-12 space-y-3">
            {partners.map((p, i) => (
              <Reveal key={p.slug}>
                <article id={p.slug} className="grid scroll-mt-24 gap-8 rounded-[30px] bg-white p-7 ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_30px_60px_-34px_rgba(12,26,43,0.4)] sm:p-10 lg:grid-cols-[0.8fr_1.4fr]">
                  <div>
                    <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-brand uppercase">Partner {String(i + 1).padStart(2, "0")}</p>
                    <h2 className="headline mt-2 text-[37px]">{p.name}</h2>
                    {!p.verified && <Illustrative className="mt-3" />}
                  </div>
                  <dl className="grid gap-6 sm:grid-cols-2">
                    {[{ k: "Technology / product", v: p.technology }, { k: "Relationship", v: p.relationship }, { k: "Territory", v: p.territory }, { k: "Serviceberry role", v: p.role }].map((d) => (
                      <div key={d.k} className="rounded-2xl bg-mist p-4">
                        <dt className="font-display text-[14px] font-semibold text-steel">{d.k}</dt>
                        <dd className="mt-1.5 text-[16px]">{d.v}</dd>
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <Button href={`/request-a-quote?type=Services&subject=${encodeURIComponent(`Enquiry about ${p.name}`)}`} variant="line">Enquire about this technology</Button>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <StartQuote type="Services" title={<>Ask about a <span className="text-brand-light">technology.</span></>} />
    </>
  );
}
