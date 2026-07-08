import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { fadeIn, fadeInUp } from "@/lib/animations";

export default function AerialBanner() {
  return (
    <section
      aria-label="Industrial fuel terminal aerial view"
      className="relative w-full overflow-hidden"
    >
      <Reveal variants={fadeIn} className="relative aspect-[393/339] w-full min-h-[18.75rem] lg:aspect-[1425/700] lg:max-h-[43.75rem]">
        <Image
          src="/images/aerial-fuel-terminal.jpg"
          alt="Industrial fuel terminal aerial view"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-petroa-navy/30"
        />
        <Reveal
          variants={fadeInUp}
          className="absolute bottom-4 left-5 max-w-[calc(100%-2.5rem)] lg:bottom-10 lg:left-14"
        >
          <p className="text-2xs font-medium uppercase leading-[1.5] tracking-widest text-white/50">
            Complete Energy &amp; Logistics Solutions
          </p>
        </Reveal>
      </Reveal>
    </section>
  );
}
