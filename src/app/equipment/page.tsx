import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { EquipmentShelf } from "@/components/home/EquipmentShelf";
import { StartQuote } from "@/components/sections/StartQuote";
import { img } from "@/content/images";

export const metadata: Metadata = {
  title: "Equipment for Sale & Equipment Supply",
  description: "Equipment sourcing, procurement and rental for oil and gas projects and operations, plus selected equipment for sale.",
};

export default function EquipmentPage() {
  return (
    <>
      <PageHero
        kp="4+000"
        label="Equipment"
        title={<>Equipment supply <span className="text-brand">& equipment for sale.</span></>}
        intro="Serviceberry markets selected equipment and sources equipment for project and operational requirements. Browse available items or send an equipment enquiry."
        image={img.procurement}
        after="bg-mist"
      />
      <EquipmentShelf id="equipment" withTitle={false} />
      <StartQuote type="Equipment Sourcing" title={<>Need equipment? <span className="text-brand-light">Start here.</span></>} intro="Tell us the duty, specification and timeline. We source it, check the technical fit and coordinate delivery to your base." />
    </>
  );
}
