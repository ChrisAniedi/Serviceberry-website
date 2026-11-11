import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { EquipmentShelf } from "@/components/home/EquipmentShelf";
import { StartJob } from "@/components/sections/StartJob";
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
        title={<>Equipment supply<br /><span className="text-brand">& equipment for sale</span></>}
        intro="Serviceberry markets selected equipment and sources equipment for project and operational requirements. Browse available items or send an equipment enquiry."
        image={img.procurement}
      />
      <EquipmentShelf id="equipment" withTitle={false} />
      <StartJob />
    </>
  );
}
