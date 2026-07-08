"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useContactModal } from "./ContactProvider";

type ContactCtaButtonProps = {
  modal: "quote" | "team";
  className?: string;
  children: ReactNode;
};

export default function ContactCtaButton({
  modal,
  className = "",
  children,
}: ContactCtaButtonProps) {
  const { openQuote, openTeam } = useContactModal();
  const reduceMotion = useReducedMotion();

  const handleClick = () => {
    if (modal === "quote") {
      openQuote();
      return;
    }
    openTeam();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={className}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
