import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { EquipmentShelf } from "@/components/home/EquipmentShelf";
import { StartJob } from "@/components/sections/StartJob";
import { img } from "@/content/images";

export const metadata: Metadata = {
  title: "Equipment for Sale & Equipment Supply",
  description: "Selected oil and gas equipment for sale, plus equipment sourcing and procurement for project and operational requirements.",
};

export default function EquipmentPage() {
  return (
    <>
      <PageHero
        kp="4+000"
        label="Equipment"
        title={<>Equipment for sale<br /><span className="text-brand">& equipment supply</span></>}
        intro="Serviceberry markets selected equipment and sources equipment for project and operational requirements. Browse available items or send an equipment enquiry."
        image={img.procurement}
      />
      <EquipmentShelf id="equipment" withTitle={false} />
      <StartJob />
    </>
  );
}
