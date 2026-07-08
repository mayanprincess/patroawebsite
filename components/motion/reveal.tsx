"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  viewport,
} from "@/lib/animations";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  initial?: "hidden" | false;
  whileInView?: "visible";
  viewport?: typeof viewport;
};

export function Reveal({
  children,
  className,
  variants = fadeInUp,
  initial = "hidden",
  whileInView = "visible",
  viewport: viewportProp = viewport,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewportProp}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  variants = staggerContainer,
  initial = "hidden",
  whileInView = "visible",
  viewport: viewportProp = viewport,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewportProp}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variants = staggerItem,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
