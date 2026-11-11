import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteFlow } from "@/components/forms/QuoteFlow";

export const metadata: Metadata = {
  title: "Request a quote",
  description: "Tell Serviceberry what you need: pigging, commissioning, integrity, chemicals, equipment or training. We reply with questions, a scope or a priced quote.",
};

type Props = { searchParams: Promise<{ type?: string; subject?: string }> };

export default async function QuotePage({ searchParams }: Props) {
  const { type, subject } = await searchParams;
  return (
    <>
      <PageHero
        kp="7+000"
        label="Request a quote"
        title={<>Tell us what you need.<br /><span className="text-brand">We will scope it with you.</span></>}
        intro="Four short steps. An engineer reads every request and replies with questions, a scope or a priced quote."
      />
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-x">
          <QuoteFlow initialType={type} initialSubject={subject} />
        </div>
      </section>
    </>
  );
}
