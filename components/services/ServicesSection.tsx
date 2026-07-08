import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const SERVICES = [
  {
    number: "01/",
    title: "Fuel Supply & Distribution",
    description:
      "Reliable wholesale fuel supply supported by dependable logistics and competitive pricing for commercial and industrial clients.",
  },
  {
    number: "02/",
    title: "Marine Bunkering",
    description:
      "Safe, efficient, and compliant fuel delivery for commercial vessels, ferries, fishing fleets, private yachts, and cruise operations.",
  },
  {
    number: "03/",
    title: "LNG Operations Management",
    description:
      "Strategic support for complex LNG projects including planning, government permitting, customs coordination, and full execution.",
  },
  {
    number: "04/",
    title: "Regulatory & Government Support",
    description:
      "End-to-end assistance navigating permits, customs procedures, environmental compliance, and maritime regulations in Honduras.",
  },
] as const;

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full bg-petroa-navy"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-16 lg:flex-row lg:gap-20 lg:pl-[57px] lg:pr-20 lg:py-20">
        <Reveal className="flex flex-1 flex-col gap-6 uppercase">
          <p className="text-2xs font-semibold uppercase tracking-widest text-white/40">
            What We Do
          </p>
          <h2
            id="services-heading"
            className="font-display text-xl font-bold uppercase leading-[0.92] tracking-tighter text-petroa-accent lg:whitespace-nowrap lg:text-2xl lg:leading-[0.92]"
          >
            <span className="block">Complete Energy &amp;</span>
            <span className="block">Logistics Solutions</span>
          </h2>
        </Reveal>

        <Stagger className="flex flex-1 flex-col">
          {SERVICES.map((service, index) => (
            <StaggerItem key={service.number}>
            <article
              className={`flex flex-col gap-4 py-8 lg:py-10 ${
                index === 0
                  ? "lg:border-y lg:border-white/10"
                  : "lg:border-b lg:border-white/10"
              }`}
            >
              <div className="flex items-baseline gap-4">
                <span className="shrink-0 font-mono text-[13px] font-medium text-petroa-slate/50">
                  {service.number}
                </span>
                <h3 className="flex-1 font-display text-lg font-medium uppercase leading-8 text-petroa-accent">
                  {service.title}
                </h3>
              </div>
              <p className="text-base leading-[1.47] text-petroa-slate">
                {service.description}
              </p>
            </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
