import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { QuoteAside } from "@/components/sections/QuoteAside";
import { img } from "@/content/images";

export const metadata: Metadata = {
  title: "Request a quote",
  description: "Tell Serviceberry what you need: pigging, commissioning, integrity, chemicals, equipment or training. We reply with questions, a scope or a priced quote.",
};

type Props = { searchParams: Promise<{ type?: string; subject?: string; details?: string; location?: string }> };

export default async function QuotePage({ searchParams }: Props) {
  const { type, subject, details, location } = await searchParams;
  return (
    <>
      <PageHero
        compact
        kp="7+000"
        label="Request a quote"
        title={<>Request <span className="text-brand">a quote</span></>}
        intro="One page, one send. Tell us what you need and where; an engineer reads every request and replies with questions, a scope or a priced quote."
        image={img.pipeValley}
      />
      <section className="bg-mist py-14 sm:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)] lg:items-start">
          <QuoteForm type={type} subject={subject} details={details} location={location} />
          <QuoteAside />
        </div>
      </section>
    </>
  );
}
