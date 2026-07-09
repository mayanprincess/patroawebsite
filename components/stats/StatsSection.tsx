import type { ReactNode } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

type StatItem = {
  id: string;
  value: ReactNode;
  label: string | readonly string[];
};

const STATS: StatItem[] = [
  {
    id: "years",
    value: "15+",
    label: ["Years of", "Experience"],
  },
  {
    id: "wholesale",
    value: (
      <>
        100<span className="font-extrabold">%</span>
      </>
    ),
    label: "Wholesale Fuel Distribution",
  },
  {
    id: "bunkering",
    value: "24/7",
    label: ["Marine", "Bunkering"],
  },
  {
    id: "lng",
    value: "5+",
    label: ["LNG Operations", "Managed"],
  },
];

const sectionLabelClassName =
  "text-2xs font-semibold uppercase leading-[1.5] tracking-widest text-petroa-text/60";

function StatLabel({ label }: { label: string | readonly string[] }) {
  if (Array.isArray(label)) {
    return (
      <p className="text-sm font-medium uppercase leading-[1.375] tracking-badge text-petroa-text">
        {label.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p className="text-sm font-medium uppercase leading-[1.375] tracking-badge text-petroa-text">
      {label}
    </p>
  );
}

export default function StatsSection() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="border-b border-black/10 bg-petroa-bg"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-14 lg:py-32">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
          <h2 id="stats-heading" className={sectionLabelClassName}>
            By the Numbers
          </h2>

          <Stagger className="grid grid-cols-2 gap-x-10 gap-y-10 lg:col-span-9 lg:col-start-4 lg:grid-cols-4 lg:gap-y-0">
            {STATS.map((stat) => (
              <StaggerItem key={stat.id} className="flex flex-col items-center text-center">
                <p className="font-display text-2xl font-semibold leading-none text-petroa-primary lg:text-3xl lg:leading-none">
                  {stat.value}
                </p>
                <div className="mt-2">
                  <StatLabel label={stat.label} />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
