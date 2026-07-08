import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const SERVICES = [
  { number: "01", title: "Government Permits" },
  { number: "02", title: "Customs Procedures" },
  { number: "03", title: "Maritime Regulations" },
  { number: "04", title: "Energy Permits" },
  { number: "05", title: "Environmental Compliance" },
  { number: "06", title: "Port Coordination" },
  { number: "07", title: "Local Logistics" },
  { number: "08", title: "Agency Representation" },
] as const;

const sectionLabelClassName =
  "text-2xs font-semibold uppercase leading-[1.5] tracking-widest text-petroa-text/40";

export default function MoreThanFuelSection() {
  return (
    <section
      aria-labelledby="more-than-fuel-heading"
      className="border-b border-black/10 bg-petroa-bg"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-14 lg:py-36">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <Reveal>
            <p className={`${sectionLabelClassName} lg:col-span-3`}>
              Full-Service Partner
            </p>
          </Reveal>

          <Reveal className="flex flex-col gap-2 lg:col-span-9 lg:col-start-4">
            <h2
              id="more-than-fuel-heading"
              className="font-display text-xl font-bold uppercase leading-[0.92] tracking-tighter text-petroa-primary lg:text-2xl lg:leading-[0.92]"
            >
              More Than Fuel
            </h2>
            <p className="text-base font-light italic leading-6 text-petroa-text/95">
              Your Local Partner in Honduras
            </p>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-black/10 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="hidden lg:col-span-3 lg:block" aria-hidden="true" />
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:col-span-9">
            {SERVICES.map((service) => (
              <StaggerItem key={service.number}>
                <div className="flex items-center gap-5 border-b border-black/8 py-5">
                  <span className="shrink-0 font-mono text-xs leading-[1.5] text-petroa-text/25">
                    {service.number}
                  </span>
                  <span className="text-sm font-semibold uppercase leading-[1.5] tracking-label text-petroa-text/65">
                    {service.title}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
