"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { SVGProps } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  menuLinkItem,
  menuLinkList,
  menuOverlay,
  menuSection,
} from "@/lib/animations";

const NAV_LINKS = [
  { label: "About", mobileLabel: "About", href: "#about" },
  { label: "Services", mobileLabel: "Services", href: "#services" },
  { label: "Products", mobileLabel: "Products", href: "#products" },
  { label: "Industries", mobileLabel: "Industries", href: "#industries" },
  {
    label: "Marine Bunkering",
    mobileLabel: "Marine Bunkering",
    href: "#marine-bunkering",
  },
  {
    label: "LNG Operations",
    mobileLabel: "LNG Operations",
    href: "#lng-operations",
  },
  { label: "Contact", mobileLabel: "Contact US", href: "#contact" },
] as const;

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#ffffff"
      aria-hidden="true"
      {...props}
    >
      <path d="M23 4.999a8.9 8.9 0 0 1-2.598.713 4.518 4.518 0 0 0 1.984-2.496 9.03 9.03 0 0 1-2.865 1.095 4.507 4.507 0 0 0-7.795 3.083c0 .353.04.697.116 1.025A12.798 12.798 0 0 1 1.64 3.897a4.49 4.49 0 0 0-.61 2.266 4.505 4.505 0 0 0 2.005 3.75A4.49 4.49 0 0 1 .96 9.35v.057a4.508 4.508 0 0 0 3.614 4.419 4.52 4.52 0 0 1-2.035.077 4.51 4.51 0 0 0 4.212 3.13A9.043 9.043 0 0 1 0 18.907a12.762 12.762 0 0 0 6.918 2.027c8.3 0 12.84-6.876 12.84-12.84 0-.196-.005-.39-.014-.583A9.169 9.169 0 0 0 23 4.999z" />
    </svg>
  );
}

const MOBILE_SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    Icon: InstagramIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    Icon: YouTubeIcon,
  },
  {
    label: "Twitter",
    href: "https://x.com",
    Icon: TwitterIcon,
  },
] as const;

const desktopNavLinkClassName =
  "font-medium text-xs leading-[16.5px] uppercase tracking-[1.98px] text-petroa-text transition-colors hover:text-petroa-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-bg";

function HamburgerIcon() {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-4 w-6 flex-col justify-between"
    >
      <span className="block h-0.5 w-full bg-petroa-text" />
      <span className="block h-0.5 w-full bg-petroa-text" />
      <span className="block h-0.5 w-full bg-petroa-text" />
    </span>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function useActiveHash() {
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || "#about");
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return activeHash;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeHash = useActiveHash();
  const reduceMotion = useReducedMotion();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    const closeButton = menuRef.current?.querySelector<HTMLElement>(
      "button[aria-label='Close menu']",
    );
    closeButton?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20 w-full bg-petroa-bg">
        <div className="flex w-full items-center justify-between px-5 py-5 lg:min-h-[91px] lg:px-14 lg:py-0">
          <Link
            href="/"
            className="relative shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-bg"
            onClick={closeMenu}
          >
            <Image
              src="/images/petroa-logo.svg"
              alt="PETROA"
              width={209}
              height={54}
              priority
              className="h-8 w-auto lg:h-[54px] lg:w-auto"
            />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={desktopNavLinkClassName}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#quote"
            className={`${desktopNavLinkClassName} hidden items-center gap-1.5 text-petroa-cta lg:inline-flex`}
          >
            Request a Quote
            <Image
              src="/images/icon-arrow.svg"
              alt=""
              width={12}
              height={12}
              aria-hidden
              className="size-3"
            />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-sm lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-bg active:scale-95"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <HamburgerIcon />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
        <motion.div
          key="mobile-menu"
          ref={menuRef}
          id={menuId}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-petroa-primary px-8 pt-5 pb-[60px] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          variants={reduceMotion ? undefined : menuOverlay}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          exit={reduceMotion ? undefined : "exit"}
        >
          <div>
            <motion.div
              className="flex h-10 items-center justify-between"
              variants={reduceMotion ? undefined : menuSection}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
              exit={reduceMotion ? undefined : "exit"}
            >
              <Link
                href="/"
                className="font-brand text-[32px] font-black uppercase leading-none tracking-[-0.02em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-primary"
                onClick={closeMenu}
              >
                Petroa
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-primary active:bg-white/40"
                onClick={closeMenu}
              >
                <CloseIcon />
              </button>
            </motion.div>

            <motion.nav
              aria-label="Main navigation"
              className="mt-16 flex flex-col gap-6"
              variants={reduceMotion ? undefined : menuLinkList}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  activeHash === link.href ||
                  (activeHash === "" && link.href === "#about");

                return (
                  <motion.div
                    key={link.href}
                    variants={reduceMotion ? undefined : menuLinkItem}
                  >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center font-display text-[40px] font-semibold uppercase leading-[36px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-primary ${
                      isActive
                        ? "gap-4 text-petroa-accent"
                        : "text-white"
                    }`}
                  >
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="h-10 w-1 shrink-0 rounded-[2px] bg-petroa-accent"
                      />
                    ) : null}
                    {link.mobileLabel}
                  </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </div>

          <motion.footer
            className="flex flex-col gap-6 pt-6"
            variants={reduceMotion ? undefined : menuSection}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "visible"}
            exit={reduceMotion ? undefined : "exit"}
          >
            <div className="flex flex-wrap gap-6">
              <Link
                href="#privacy"
                onClick={closeMenu}
                className="font-inter text-xs leading-[13px] text-petroa-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                onClick={closeMenu}
                className="font-inter text-xs leading-[13px] text-petroa-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-primary"
              >
                Terms of Service
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {MOBILE_SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-primary"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <div
                aria-hidden="true"
                className="h-px w-full bg-white/20"
              />
              <p className="font-inter text-xs leading-[13px] text-petroa-accent/50">
                © 2026 PETROA
              </p>
            </div>
          </motion.footer>
        </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
