"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { slideFade } from "@/lib/animations";

type CaseStudyService = {
  number: string;
  label: string;
};

type CaseStudy = {
  title: string;
  services: CaseStudyService[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Carnival Jubilee LNG Operation",
    services: [
      { number: "01", label: "Government Permits" },
      { number: "02", label: "Energy Ministry Coordination" },
      { number: "03", label: "Customs Clearance" },
      { number: "04", label: "Maritime Authority Approvals" },
      { number: "05", label: "Environmental Compliance" },
      { number: "06", label: "Local Logistics" },
      { number: "07", label: "Vessel Agency Services" },
      { number: "08", label: "Operational Coordination" },
    ],
  },
  {
    title: "Roatan Port LNG Infrastructure",
    services: [
      { number: "01", label: "Project Planning & Feasibility" },
      { number: "02", label: "Regulatory Framework Design" },
      { number: "03", label: "Port Authority Liaison" },
      { number: "04", label: "Safety & Risk Assessment" },
      { number: "05", label: "Supply Chain Integration" },
      { number: "06", label: "Crew & Personnel Logistics" },
      { number: "07", label: "Equipment Import Coordination" },
      { number: "08", label: "Commissioning Support" },
    ],
  },
  {
    title: "Caribbean Cruise LNG Bunkering",
    services: [
      { number: "01", label: "Multi-Agency Permitting" },
      { number: "02", label: "Customs & Immigration" },
      { number: "03", label: "Harbor Master Coordination" },
      { number: "04", label: "Emergency Response Planning" },
      { number: "05", label: "Environmental Monitoring" },
      { number: "06", label: "Fuel Transfer Operations" },
      { number: "07", label: "Stakeholder Communication" },
      { number: "08", label: "Post-Operation Reporting" },
    ],
  },
];

const navButtonClassName =
  "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-bg motion-reduce:transition-none";

function ServiceList({ services }: { services: CaseStudyService[] }) {
  const midpoint = Math.ceil(services.length / 2);
  const columns = [services.slice(0, midpoint), services.slice(midpoint)];

  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10">
      {columns.map((column, columnIndex) => (
        <ul key={columnIndex} className="flex flex-col gap-5">
          {column.map((service) => (
            <li key={service.number} className="flex items-center gap-3">
              <span className="font-mono text-xs text-petroa-muted">
                {service.number}
              </span>
              <span className="text-[13px] font-medium text-white">
                {service.label}
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function LngCaseStudy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const totalSlides = CASE_STUDIES.length;
  const activeStudy = CASE_STUDIES[activeIndex];

  const goToPrevious = useCallback(() => {
    setActiveIndex((index) => (index === 0 ? totalSlides - 1 : index - 1));
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setActiveIndex((index) => (index === totalSlides - 1 ? 0 : index + 1));
  }, [totalSlides]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  return (
    <section
      id="lng-operations"
      aria-labelledby="lng-operations-heading"
      className="bg-petroa-bg"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-14 lg:pt-[100px] lg:pb-20">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
          <p className="pt-1 text-2xs font-semibold uppercase tracking-widest text-petroa-text/40 lg:col-span-3">
            Featured Case Study
          </p>

          <div className="flex flex-col gap-3 lg:col-span-9">
            <h2
              id="lng-operations-heading"
              className="font-display text-[2rem] font-bold uppercase leading-[1.02] tracking-tighter text-petroa-primary lg:text-2xl lg:leading-[0.92] lg:tracking-tightest"
            >
              LNG Project Management
            </h2>
            <p className="max-w-2xl text-base leading-[1.625] text-petroa-text">
              PETROA has positioned itself as a strategic partner for complex LNG
              operations, providing end-to-end coordination from initial planning
              through final execution.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:mt-12">
          <div
            className="relative overflow-hidden rounded-sm p-8 lg:p-16"
            aria-live="polite"
            aria-atomic="true"
          >
            <Image
              src="/images/lng-carousel-slide.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 1280px, 100vw"
              className="object-cover object-center"
              aria-hidden
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-sm bg-black/60"
            />

            <div className="relative flex flex-col gap-10 lg:gap-12">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  variants={reduceMotion ? undefined : slideFade}
                  initial={reduceMotion ? false : "hidden"}
                  animate={reduceMotion ? undefined : "visible"}
                  exit={reduceMotion ? undefined : "exit"}
                  className="flex flex-col gap-10 lg:gap-12"
                >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-2xs font-semibold uppercase text-white">
                    Featured Case Study
                  </p>
                  <p className="font-display text-xl font-semibold leading-[1.1] text-petroa-primary">
                    {activeStudy.title}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`${navButtonClassName} hover:bg-white/10 active:bg-white/20`}
                    aria-label="Previous case study"
                    onClick={goToPrevious}
                  >
                    <Image
                      src="/images/arrow-left.svg"
                      alt=""
                      width={20}
                      height={20}
                      aria-hidden
                      className="size-5"
                    />
                  </button>
                  <button
                    type="button"
                    className={`${navButtonClassName} border-petroa-primary bg-petroa-primary hover:bg-petroa-primary/90 active:bg-petroa-navy`}
                    aria-label="Next case study"
                    onClick={goToNext}
                  >
                    <Image
                      src="/images/arrow-right-white.svg"
                      alt=""
                      width={20}
                      height={20}
                      aria-hidden
                      className="size-5"
                    />
                  </button>
                </div>
              </div>

              <ServiceList services={activeStudy.services} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Case study slides"
          >
            {CASE_STUDIES.map((study, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={study.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to case study ${index + 1}: ${study.title}`}
                  className="inline-flex size-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-bg"
                  onClick={() => setActiveIndex(index)}
                >
                  <span
                    aria-hidden="true"
                    className={`block size-2 rounded-full transition-colors motion-reduce:transition-none ${
                      isActive ? "bg-petroa-primary" : "bg-petroa-text/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
