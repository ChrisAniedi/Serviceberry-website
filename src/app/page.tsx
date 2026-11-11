import { Hero } from "@/components/home/Hero";
import { ServicesBand } from "@/components/home/ServicesBand";
import { ServicesRail } from "@/components/home/ServicesRail";
import { PiggingStory } from "@/components/home/PiggingStory";
import { TechPanels } from "@/components/home/TechPanels";
import { FieldStrip } from "@/components/home/FieldStrip";
import { WhyUs } from "@/components/home/WhyUs";
import { EquipmentShelf } from "@/components/home/EquipmentShelf";
import { ProjectStack } from "@/components/home/ProjectStack";
import { AcademyBlock } from "@/components/home/AcademyBlock";
import { Closing } from "@/components/home/Closing";

/**
 * Homepage. Order follows the redesign workbook (hero, services, equipment, projects,
 * partners, academy, contact), with the brochure's technologies, field photos and
 * "why clients work with us" woven in. Partners sit in the hero's lower row.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ServicesBand />
      <ServicesRail />
      <PiggingStory />
      <TechPanels />
      <FieldStrip />
      <WhyUs />
      <EquipmentShelf />
      <ProjectStack />
      <AcademyBlock />
      <Closing />
    </>
  );
}
