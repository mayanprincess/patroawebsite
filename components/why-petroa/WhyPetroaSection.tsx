"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const ADVANTAGES = [
  {
    number: "01",
    title: "10+ Years Industry Experience",
    description:
      "Founded in 2009, PETROA brings over a decade of proven energy and logistics expertise across Honduras and the Caribbean.",
  },
  {
    number: "02",
    title: "Trusted Wholesale Fuel Supplier",
    description:
      "We supply commercial, industrial, and marine clients with dependable bulk fuel at competitive wholesale pricing.",
  },
  {
    number: "03",
    title: "Marine Bunkering Specialists",
    description:
      "Dedicated marine fuel operations for vessels of all types, meeting international safety and environmental standards.",
  },
  {
    number: "04",
    title: "LNG Operations Expertise",
    description:
      "Full-project support for LNG initiatives including permitting, customs coordination, and operational execution.",
  },
  {
    number: "05",
    title: "Strong Government Relationships",
    description:
      "Established relationships with energy, maritime, and regulatory authorities streamline approvals and compliance.",
  },
  {
    number: "06",
    title: "Regulatory Compliance Support",
    description:
      "End-to-end guidance on permits, customs, environmental standards, and maritime regulations.",
  },
  {
    number: "07",
    title: "Integrated Logistics Solutions",
    description:
      "Coordinated fuel supply, port services, and local logistics under one trusted partner.",
  },
  {
    number: "08",
    title: "Reliable Supply Chain Management",
    description:
      "Consistent fuel availability backed by storage infrastructure and responsive delivery networks.",
  },
  {
    number: "09",
    title: "Local Expertise, International Standards",
    description:
      "Deep local knowledge paired with world-class operational and safety practices.",
  },
] as const;

const sectionLabelClassName =
  "text-2xs font-semibold uppercase leading-[1.5] tracking-widest text-petroa-text/60";

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-6 shrink-0 items-center justify-center transition-transform duration-200 ease-out motion-reduce:transition-none ${
        expanded ? "rotate-180" : ""
      }`}
    >
      <Image
        src="/images/chevron-down.svg"
        alt=""
        width={24}
        height={24}
        className={`size-6 ${expanded ? "brightness-0" : ""}`}
      />
    </span>
  );
}

export default function WhyPetroaSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headingId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby={headingId}
      className="border-b border-black/10 bg-petroa-white"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-14 lg:py-[120px]">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          <p className={sectionLabelClassName}>Our advantages</p>

          <div className="lg:col-span-9 lg:col-start-4">
            <h2
              id={headingId}
              className="font-display text-xl font-bold uppercase leading-[0.92] tracking-tighter text-petroa-primary sm:text-2xl lg:leading-[0.92]"
            >
              <span className="block">Why Industry Leaders</span>
              <span className="block">Choose PETROA</span>
            </h2>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 lg:mt-20">
          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((advantage, index) => {
              const expanded = openIndex === index;
              const panelId = `advantage-panel-${advantage.number}`;

              return (
                <StaggerItem key={advantage.number}>
                <motion.div
                  layout={!reduceMotion}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ layout: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
                  className={`flex min-h-60 flex-col justify-between rounded-sm border p-8 transition-colors duration-200 ease-out motion-reduce:transition-none ${
                    expanded
                      ? "border-petroa-line bg-petroa-accent"
                      : "border-petroa-line bg-petroa-white"
                  }`}
                >
                  <p
                    className={`font-inter text-base font-bold leading-normal ${
                      expanded
                        ? "text-petroa-card-dark"
                        : "text-petroa-card-blue"
                    }`}
                  >
                    {advantage.number}
                  </p>

                  <div className="mt-auto flex flex-col gap-4">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      className="flex w-full items-end justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2"
                      onClick={() =>
                        setOpenIndex(expanded ? null : index)
                      }
                    >
                      <span
                        className={`flex-1 font-inter text-md font-semibold uppercase leading-normal ${
                          expanded
                            ? "text-petroa-card-dark"
                            : "text-petroa-card-text"
                        }`}
                      >
                        {advantage.title}
                      </span>
                      <ChevronIcon expanded={expanded} />
                    </button>

                    <motion.div
                      id={panelId}
                      role="region"
                      aria-hidden={!expanded}
                      initial={false}
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              height: expanded ? "auto" : 0,
                              opacity: expanded ? 1 : 0,
                            }
                      }
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className={`pt-2 font-sans text-sm leading-[1.625] ${
                          expanded
                            ? "text-petroa-card-dark/80"
                            : "text-transparent"
                        }`}
                      >
                        {advantage.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
