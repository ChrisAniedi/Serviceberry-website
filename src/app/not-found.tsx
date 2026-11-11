import { Button } from "@/components/ui/Button";
import { Kp } from "@/components/ui/Kp";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[85svh] flex-col justify-center pt-[110px] pb-16">
      <Kp kp="404" label="Line blocked" />
      <h1 className="headline mt-6 text-[clamp(2.94rem,9.24vw,7.56rem)] text-brand-deep">This page isn&apos;t<br /><span className="text-brand">on the line.</span></h1>
      <p className="mt-6 max-w-md text-[17px] text-steel">It may have moved. Head back to the start or browse our services.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/services" variant="line">Our services</Button>
      </div>
    </section>
  );
}
