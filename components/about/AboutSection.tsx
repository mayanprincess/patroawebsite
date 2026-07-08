import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const CORE_VALUES = [
  { number: "01", label: "Integrity" },
  { number: "02", label: "Safety" },
  { number: "03", label: "Reliability" },
  { number: "04", label: "Operational Excellence" },
  { number: "05", label: "Customer Commitment" },
  { number: "06", label: "Environmental Responsibility" },
  { number: "07", label: "Innovation" },
] as const;

const sectionLabelClassName =
  "text-2xs font-semibold uppercase leading-[1.5] tracking-widest text-petroa-text/60";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-black/10 bg-petroa-bg"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-14 lg:py-36">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8">
          <p className={`${sectionLabelClassName} lg:col-span-3`}>
            About PETROA
          </p>

          <div className="flex flex-col gap-10 lg:col-span-9 lg:col-start-4">
            <Reveal>
              <h2
                id="about-heading"
                className="font-display text-xl font-bold uppercase leading-[0.92] tracking-tighter text-petroa-primary sm:text-2xl lg:leading-[0.92]"
              >
                <span className="block">A Trusted Energy</span>
                <span className="block">Partner Since 2009</span>
              </h2>
            </Reveal>

            <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8">
              <p className="text-base leading-[1.625] text-petroa-text">
                Founded in 2009, PETROA has grown into one of the leading
                wholesale fuel suppliers in the Bay Islands of Honduras.
                Originally established to support the McNab Group&apos;s maritime
                operations, we now serve power generation, marine transportation,
                tourism, construction, fishing fleets, and fuel distributors.
              </p>
              <p className="text-base leading-[1.625] text-petroa-text">
                Today, PETROA continues expanding through innovative fuel
                solutions, specialized logistics services, and comprehensive
                support for domestic and international operations across
                Honduras and the Caribbean.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 border-t border-black/8 pt-10 lg:mt-16 lg:pt-16">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
            <p className={`${sectionLabelClassName} lg:col-span-3`}>
              Core Values
            </p>

            <Stagger className="flex flex-col gap-[30px] lg:col-span-9 lg:col-start-4 lg:flex-row lg:flex-wrap lg:gap-x-6 lg:gap-y-4">
              {CORE_VALUES.map((value) => (
                <StaggerItem key={value.number} className="flex items-center gap-3">
                  <span className="font-mono text-2xs font-medium uppercase leading-[1.5] tracking-wide text-petroa-text/30">
                    {value.number}
                  </span>
                  <span className="text-[13px] font-medium uppercase leading-[1.5] tracking-micro text-petroa-text">
                    {value.label}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
