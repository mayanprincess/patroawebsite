import { Reveal } from "@/components/motion/reveal";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

const sectionLabelClassName =
  "text-2xs font-semibold uppercase leading-[1.5] tracking-widest text-petroa-text/60";

export default function MissionSection() {
  return (
    <section
      aria-label="Mission and Vision"
      className="border-b border-black/10 bg-petroa-bg"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-14 lg:py-32">
        <div className="flex flex-col divide-y divide-black/10 bg-black/10 lg:grid lg:grid-cols-2 lg:divide-y-0 lg:gap-px">
          <Reveal variants={fadeInLeft} className="bg-petroa-bg px-5 py-10 lg:px-0 lg:py-12 lg:pr-10">
            <h2 id="mission-heading" className={sectionLabelClassName}>
              Mission
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.625] text-petroa-text">
              To provide reliable energy solutions through operational
              excellence, integrity, efficiency, and environmental responsibility
              while building long-term relationships with our customers.
            </p>
          </Reveal>

          <Reveal variants={fadeInRight} className="bg-petroa-bg px-5 py-10 lg:px-10 lg:py-12">
            <h2 id="vision-heading" className={sectionLabelClassName}>
              Vision
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.625] text-petroa-text">
              To become the leading energy distribution company in the Bay
              Islands and a strategic partner for national and international
              energy operations through quality products, competitive pricing,
              and world-class service.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
