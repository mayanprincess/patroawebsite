"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef } from "react";
import type { ContactFormType } from "@/lib/contact/types";
import { getFormTitle } from "@/lib/contact/validation";
import QuoteForm from "./QuoteForm";
import TeamForm from "./TeamForm";

type ContactModalsProps = {
  activeModal: ContactFormType | null;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function ContactModals({ activeModal, onClose }: ContactModalsProps) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeModal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    const firstField = panelRef.current?.querySelector<HTMLElement>(
      "input, textarea, select, button",
    );
    firstField?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal, onClose]);

  return (
    <AnimatePresence>
      {activeModal ? (
        <motion.div
          key="contact-modal"
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="presentation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-petroa-navy/60 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="relative flex max-h-[92dvh] w-full max-w-xl flex-col overflow-y-auto bg-petroa-bg shadow-2xl sm:rounded-sm"
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-black/10 bg-petroa-bg px-6 py-6 sm:px-8">
              <div className="flex flex-col gap-2">
                <p className="text-2xs font-semibold uppercase tracking-widest text-petroa-text/40">
                  Contact PETROA
                </p>
                <h2
                  id={titleId}
                  className="font-display text-xl font-bold uppercase leading-[0.92] tracking-tighter text-petroa-primary sm:text-2xl"
                >
                  {getFormTitle(activeModal)}
                </h2>
                <p id={descriptionId} className="text-sm leading-[1.5] text-petroa-text/60">
                  {activeModal === "quote"
                    ? "Tell us about your fuel or logistics needs and our team will follow up with a tailored quote."
                    : "Share a few details and we will connect you with the right PETROA specialist."}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-petroa-text/60 transition-colors hover:bg-black/5 hover:text-petroa-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-bg active:bg-black/10"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              {activeModal === "quote" ? (
                <QuoteForm onClose={onClose} />
              ) : (
                <TeamForm onClose={onClose} />
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
