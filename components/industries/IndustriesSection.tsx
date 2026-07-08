import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const INDUSTRIES = [
  { number: "01", name: "Power Generation" },
  { number: "02", name: "Marine Transportation" },
  { number: "03", name: "Cruise Industry" },
  { number: "04", name: "Hotels & Resorts" },
  { number: "05", name: "Commercial Businesses" },
  { number: "06", name: "Dive Operations" },
  { number: "07", name: "Construction" },
  { number: "08", name: "Fishing Industry" },
  { number: "09", name: "Fuel Retailers" },
  { number: "10", name: "Government Projects" },
] as const;

function IndustryRow({
  number,
  name,
}: {
  number: string;
  name: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-petroa-text/[0.08] py-5">
      <div className="flex items-center gap-5">
        <span className="font-mono text-xs text-petroa-text/25">{number}</span>
        <span className="text-[13px] font-semibold uppercase leading-[19.5px] tracking-label text-petroa-text/70">
          {name}
        </span>
      </div>
      <Image
        src="/images/chevron-right.svg"
        alt=""
        width={14}
        height={14}
        aria-hidden
        className="size-3.5 shrink-0 opacity-80"
      />
    </div>
  );
}

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="border-b border-petroa-text/10 bg-petroa-bg"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-14 lg:py-36">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
          <p className="pt-1 text-2xs font-semibold uppercase tracking-widest text-petroa-text/40 lg:col-span-3">
            Sectors We Serve
          </p>
          <Reveal className="lg:col-span-9">
            <h2
              id="industries-heading"
              className="font-display text-[2rem] font-bold uppercase leading-[1.02] tracking-tighter text-petroa-primary lg:text-2xl lg:leading-[0.92] lg:tracking-tightest"
            >
              Powering Every Industry
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="hidden lg:col-span-3 lg:block" aria-hidden="true" />
          <div className="border-t border-petroa-text/10 lg:col-span-9">
            <Stagger className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-petroa-text/[0.08]">
              <div className="md:pr-8">
                {INDUSTRIES.filter((_, index) => index % 2 === 0).map(
                  (industry) => (
                    <StaggerItem key={industry.number}>
                      <IndustryRow
                        number={industry.number}
                        name={industry.name}
                      />
                    </StaggerItem>
                  ),
                )}
              </div>
              <div className="md:pl-8">
                {INDUSTRIES.filter((_, index) => index % 2 === 1).map(
                  (industry) => (
                    <StaggerItem key={industry.number}>
                      <IndustryRow
                        number={industry.number}
                        name={industry.name}
                      />
                    </StaggerItem>
                  ),
                )}
              </div>
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
