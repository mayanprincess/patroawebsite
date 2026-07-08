"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const ctaLinkClassName =
  "inline-flex min-h-11 items-center text-xs uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-bg motion-reduce:transition-none";

const headlineLines = [
  { text: "Powering", className: "block font-bold" },
  { text: "Industries.", className: "block font-bold" },
  { text: "Connecting", className: "block font-bold text-petroa-accent" },
  { text: "Markets.", className: "block font-bold" },
] as const;

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="hero-heading" className="bg-petroa-bg">
      <div className="flex w-full flex-col">
        <div className="w-full px-5 pb-10 pt-[72px] lg:px-14 lg:pb-10 lg:pt-[152px]">
          <div className="relative mx-auto w-full max-w-[1313px] pt-12 lg:min-h-[507px] lg:pt-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-5 -top-[72px] -bottom-10 overflow-hidden lg:-inset-x-14 lg:-top-[152px] lg:-bottom-10"
            >
              <motion.div
                className="absolute right-[-40%] top-[22%] w-[115%] max-w-none lg:right-[6%] lg:top-[-4%] lg:w-[42%] lg:max-w-[483px]"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/images/hero-vector.svg"
                  alt=""
                  width={483}
                  height={361}
                  className="h-auto w-full"
                />
              </motion.div>
            </div>

            <motion.h1
              id="hero-heading"
              className="relative font-display text-[3rem] font-black uppercase leading-[1] tracking-[-0.06em] text-petroa-primary sm:text-[3.5rem] lg:text-4xl lg:leading-[0.88] lg:tracking-tightest"
              variants={reduceMotion ? undefined : staggerContainer}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
            >
              {headlineLines.map((line) => (
                <motion.span
                  key={line.text}
                  className={line.className}
                  variants={reduceMotion ? undefined : staggerItem}
                >
                  {line.text}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              className="relative mt-8 flex max-w-xs flex-col gap-6 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:max-w-[263px] lg:pb-3"
              variants={reduceMotion ? undefined : fadeInUp}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
              transition={{ delay: 0.5 }}
            >
              <p className="text-base leading-[1.47] text-petroa-text/50 lg:text-md lg:leading-[1.47]">
                Your Strategic Energy Partner
                <br />
                in Honduras &amp; the Caribbean
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <motion.div whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
                  <Link
                    href="#quote"
                    className={`${ctaLinkClassName} border-b border-petroa-primary pb-0.5 font-semibold text-petroa-primary hover:text-petroa-navy active:text-petroa-navy`}
                  >
                    Request a Quote
                  </Link>
                </motion.div>
                <motion.div whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
                  <Link
                    href="#services"
                    className={`${ctaLinkClassName} font-medium text-petroa-text/50 hover:text-petroa-text active:text-petroa-text`}
                  >
                    Our Services →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="relative aspect-[393/280] w-full lg:aspect-[1425/573]"
          variants={reduceMotion ? undefined : fadeInUp}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          transition={{ delay: 0.35 }}
        >
          <Image
            src="/images/hero-maritime-terminal.jpg"
            alt="PETROA maritime fuel terminal operations in the Bay Islands, Honduras"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <p className="absolute bottom-4 left-5 max-w-[calc(100%-2.5rem)] text-2xs font-medium uppercase leading-[1.5] tracking-widest text-white/60 lg:bottom-10 lg:left-14">
            Fueling Growth. Delivering Confidence. — Bay Islands, Honduras
          </p>
        </motion.div>
      </div>
    </section>
  );
}
