import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { PiggingStory } from "@/components/home/PiggingStory";
import { Capabilities } from "@/components/home/Capabilities";
import { StartQuote } from "@/components/sections/StartQuote";
import { img } from "@/content/images";

export const metadata: Metadata = {
  title: "Services",
  description: "Pipeline integrity and pigging, commissioning, asset and process integrity, specialty chemicals, remote monitoring, valve services and equipment procurement.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kp="1+000"
        label="Services"
        title={<>Process & <span className="text-brand">pipeline services.</span></>}
        intro="Integrated services for onshore and offshore oil and gas, energy, construction and process industries, delivered directly and through specialist technology partners."
        image={img.commissioning}
        after="bg-paper"
      />
      <ServiceIndex />
      <PiggingStory />
      <Capabilities />
      <StartQuote />
    </>
  );
}
