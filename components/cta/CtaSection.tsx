import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { fadeInScale } from "@/lib/animations";
import CtaActions from "./CtaActions";

export default function CtaSection() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative border-b border-black/10"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/cta-background.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-petroa-white/86" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-24 pb-20 lg:px-14 lg:py-48">
        <Reveal variants={fadeInScale}>
          <h2
            id="cta-heading"
            className="max-w-5xl font-display text-[2.5rem] font-bold uppercase leading-[0.88] tracking-[-0.025em] text-petroa-primary sm:text-5xl lg:text-[100.8px] lg:leading-[88.704px] lg:tracking-[-2.52px]"
          >
            <span className="block">Let&apos;s Fuel Your</span>
            <span className="block text-petroa-cta">Next Operation.</span>
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="max-w-md text-base leading-[1.625] text-petroa-text lg:col-span-4 lg:col-start-4">
            Whether you require bulk fuel supply, marine bunkering, LNG project
            support, or regulatory assistance, PETROA is ready to become your
            trusted energy partner.
          </Reveal>

          <CtaActions />
        </div>
      </div>
    </section>
  );
}
