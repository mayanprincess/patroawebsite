"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const learnMoreClassName =
  "inline-flex min-h-11 items-center gap-2 border-b border-white pb-0.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:text-white/80 active:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transition-none";

export default function MarineLearnMoreLink() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { x: 4 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      <Link href="#contact" className={learnMoreClassName}>
        Learn More
        <Image
          src="/images/arrow-right.svg"
          alt=""
          width={12}
          height={12}
          aria-hidden
          className="size-3 brightness-0 invert"
        />
      </Link>
    </motion.div>
  );
}
