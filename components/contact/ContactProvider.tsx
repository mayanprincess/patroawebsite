"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ContactFormType } from "@/lib/contact/types";
import ContactModals from "./ContactModals";

type ContactModalContextValue = {
  openQuote: () => void;
  openTeam: () => void;
  close: () => void;
  activeModal: ContactFormType | null;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ContactFormType | null>(null);

  const openQuote = useCallback(() => setActiveModal("quote"), []);
  const openTeam = useCallback(() => setActiveModal("team"), []);
  const close = useCallback(() => setActiveModal(null), []);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#quote") {
        setActiveModal("quote");
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const value = useMemo(
    () => ({ openQuote, openTeam, close, activeModal }),
    [openQuote, openTeam, close, activeModal],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModals activeModal={activeModal} onClose={close} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);

  if (!context) {
    throw new Error("useContactModal must be used within ContactProvider");
  }

  return context;
}
