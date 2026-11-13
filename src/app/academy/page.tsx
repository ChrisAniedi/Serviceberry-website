import type { Metadata } from "next";
import Image from "next/image";
import { Award, Briefcase, GraduationCap, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { img } from "@/content/images";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Serviceberry Academy",
  description: "Serviceberry Academy: professional, business and technical learning for the energy industry, online at academy.serviceberryglobal.com.",
};

/** TODO(verify): replace track text with the real catalogue once the LMS provider confirms it. */
const tracks = [
  { title: "Technical", body: "Practical skills for oil and gas operations, pipelines, process systems and maintenance.", image: img.workerPole },
  { title: "Professional", body: "Safety culture, project skills and the habits that move careers forward.", image: img.engPhone },
  { title: "Business", body: "Commercial, management and entrepreneurship learning for the energy value chain.", image: img.blueprints },
];
const audience = [
  { icon: GraduationCap, title: "Graduates & new entrants", body: "Get industry-ready with grounded, practical learning." },
  { icon: Users, title: "Working professionals", body: "Upskill around your rota and keep your competence current." },
  { icon: Briefcase, title: "Companies & teams", body: "Train crews and staff together. Ask us about group enrolment." },
];
const steps = ["Create your account", "Pick a course", "Learn online, at your pace", "Get your certificate"];
const topics = ["Pipeline basics", "Pigging operations", "HSE awareness", "Process systems", "Asset integrity", "Project delivery", "Leadership", "Business skills"];

export default function AcademyPage() {
  return (
    <>
      <PageHero
        kp="6+000"
        label="Serviceberry Academy"
        title={<>Learn on the line. <span className="text-brand">Grow in the field.</span></>}
        intro="Building technical competence. Developing industry professionals. Professional, business and technical learning, online."
        image={img.engHardhat}
        stat={{ value: "3", label: "Learning tracks: technical, professional and business." }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={site.academyUrl} external variant="hivis">Visit Serviceberry Academy</Button>
          <Button href="/request-a-quote?type=Academy" variant="glass">Enrol a team</Button>
        </div>
      </PageHero>

      <div className="bg-ink py-5 text-white">
        <Marquee duration={40}>
          {topics.map((t) => <span key={t} className="headline flex items-center px-7 text-[25px] whitespace-nowrap">{t}<span className="ml-14 inline-block h-2.5 w-6 rounded-full bg-brand-light" /></span>)}
        </Marquee>
      </div>

      <section className="bg-white py-24 sm:py-28">
        <div className="container-x">
          <Title kp="6+100" label="Tracks" title={<>Three ways<br /><span className="text-brand">to grow</span></>} intro="Courses are grouped so you can build the exact mix your role needs." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {tracks.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08} className="group overflow-hidden rounded-[28px] bg-mist ring-1 ring-line">
                <div className="relative m-2 aspect-[4/3] overflow-hidden rounded-[22px]">
                  <Image src={t.image} alt="" fill sizes="33vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="headline text-[34px]">{t.title}</p>
                  <p className="mt-2 text-[16px] text-steel">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-nav="dark" className="bg-brand-deep py-24 text-white">
        <div className="container-x">
          <Title light kp="6+200" label="How it works" title={<>Sign-up to<br /><span className="text-brand-light">certificate</span></>} />
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s} className="rounded-[26px] bg-white/[0.06] p-7 ring-1 ring-white/12 backdrop-blur-xl">
                <Reveal delay={i * 0.08}>
                  <span className="headline text-[54px] text-brand-light">{String(i + 1).padStart(2, "0")}</span>
                  <p className="headline mt-4 text-[22px]">{s}</p>
                  {i === 3 && <Award className="mt-4 size-6 text-brand-light" />}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-x">
          <Title size="md" title={<>Made for people who<br /><span className="text-brand">keep energy moving</span></>} />
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {audience.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08} className="group rounded-[26px] bg-white p-7 ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(11,26,62,0.4)]">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand transition-transform duration-500 group-hover:-rotate-6"><a.icon className="size-7" strokeWidth={1.5} /></span>
                <p className="headline mt-8 text-[24px]">{a.title}</p>
                <p className="mt-2 text-[16px] text-steel">{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist pb-24">
        <div data-nav="dark" className="container-x">
          <div className="relative isolate flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[36px] bg-brand-deep p-8 text-white sm:p-12 lg:p-16">
            <div aria-hidden className="absolute -right-24 -bottom-40 -z-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(143,180,255,0.3),transparent)]" />
          <div>
            <p className="headline text-[clamp(1.85rem,3.86vw,3.36rem)]">Your next skill is one click away.</p>
            <p className="mt-2 text-[15px] text-white/80">Opens academy.serviceberryglobal.com</p>
          </div>
          <Button href={site.academyUrl} external variant="white">Go to the Academy</Button>
          </div>
        </div>
      </section>
    </>
  );
}
