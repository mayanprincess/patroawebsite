import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { fadeInLeft, fadeInUp } from "@/lib/animations";
import MarineLearnMoreLink from "./MarineLearnMoreLink";

export default function MarineBunkeringSection() {
  return (
    <section
      id="marine-bunkering"
      aria-labelledby="marine-bunkering-heading"
      className="border-b border-petroa-text/10"
    >
      <div className="relative min-h-[350px] w-full lg:min-h-[min(52vw,750px)]">
        <Image
          src="/images/marine-bunkering-vessel.jpg"
          alt="Marine bunkering fuel supply vessel at port"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0c1e38] via-[#0c1e38]/20 to-transparent"
        />

        <div className="relative flex min-h-[inherit] w-full flex-col justify-end px-5 pb-12 pt-32 lg:px-14 lg:pb-12 lg:pt-32">
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-x-8">
              <Reveal variants={fadeInLeft}>
                <p className="text-2xs font-semibold uppercase tracking-widest text-white/40 lg:col-span-3">
                  Marine Services
                </p>
              </Reveal>

              <Reveal
                variants={fadeInUp}
                className="flex flex-col gap-6 lg:col-span-9"
              >
                <h2
                  id="marine-bunkering-heading"
                  className="font-display text-[2rem] font-bold uppercase leading-[0.9] tracking-tighter text-white lg:text-2xl lg:leading-[0.9] lg:tracking-tightest"
                >
                  Marine Fuel Supply
                  <br />
                  &amp; Bunkering Services
                </h2>

                <p className="max-w-lg text-[14px] font-light leading-[22.75px] text-white/60">
                  Dependable marine fuel supply for commercial vessels, passenger
                  ferries, cargo ships, fishing fleets, private yachts, and
                  cruise operations — compliant with international safety and
                  environmental standards.
                </p>

                <MarineLearnMoreLink />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
