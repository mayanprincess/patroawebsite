import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const PRODUCTS = [
  {
    number: "01/",
    name: "Diesel Fuel",
    description:
      "Power generation, marine transportation, commercial fleets, hospitality, construction, fishing.",
  },
  {
    number: "02/",
    name: "Premium Gasoline",
    description:
      "Reliable wholesale distribution for commercial and industrial customers.",
  },
  {
    number: "03/",
    name: "Regular Gasoline",
    description:
      "Consistent supply backed by competitive pricing and dependable logistics.",
  },
  {
    number: "04/",
    name: "LPG",
    description:
      "Commercial, industrial, hospitality, and residential applications.",
  },
  {
    number: "05/",
    name: "LNG Solutions",
    description:
      "Specialized planning, logistics coordination, and operational management.",
  },
] as const;

export default function ProductsSection() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="w-full border-b border-petroa-text/10 bg-petroa-bg"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-14 lg:py-36">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <p className="pt-1 text-2xs font-semibold uppercase tracking-widest text-petroa-text/40 lg:col-span-2">
            Our Products
          </p>
          <Reveal className="lg:col-span-10">
            <h2
              id="products-heading"
              className="font-display text-xl font-bold uppercase leading-[0.92] tracking-tighter text-petroa-primary lg:text-2xl lg:leading-[0.92]"
            >
              <span className="block">Energy Solutions for</span>
              <span className="block">Every Industry</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-petroa-text/10 lg:mt-16">
          <Stagger className="flex flex-col">
            {PRODUCTS.map((product) => (
              <StaggerItem
                key={product.number}
                className="border-b border-petroa-text/10 py-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:py-8"
              >
                <span className="mb-3 block font-mono text-[13px] font-medium text-petroa-text/25 lg:col-span-1 lg:mb-0 lg:pt-1">
                  {product.number}
                </span>
                <h3 className="mb-3 font-display text-lg font-medium uppercase leading-8 text-petroa-primary lg:col-span-4 lg:mb-0">
                  {product.name}
                </h3>
                <p className="text-base leading-[1.41] text-petroa-text lg:col-span-7">
                  {product.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
