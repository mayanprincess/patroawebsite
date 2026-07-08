"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { fadeInScale } from "@/lib/animations";

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "Marine Bunkering", href: "#marine-bunkering" },
  { label: "LNG Operations", href: "#lng-operations" },
  { label: "Contact", href: "#contact" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: "/images/icon-linkedin.svg",
  },
  {
    label: "X",
    href: "https://x.com",
    icon: "/images/icon-x.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: "/images/icon-instagram.svg",
  },
] as const;

const footerLinkClassName =
  "text-xs font-medium uppercase tracking-[1.98px] text-petroa-text transition-colors hover:text-petroa-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-white motion-reduce:transition-none";

const socialLinkClassName =
  "inline-flex size-11 items-center justify-center rounded-sm transition-opacity hover:opacity-70 active:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-white motion-reduce:transition-none";

export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="border-t border-black/10 bg-petroa-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-5 py-10 lg:gap-12 lg:px-14 lg:py-20">
        <Reveal variants={fadeInScale}>
          <Link
            href="/"
            className="relative w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-white"
            aria-label="PETROA home"
          >
            <Image
              src="/images/petroa-logo.svg"
              alt="PETROA"
              width={154}
              height={40}
              className="h-10 w-auto lg:hidden"
            />
            <Image
              src="/images/petroa-wordmark.svg"
              alt="PETROA"
              width={1309}
              height={340}
              className="hidden h-auto w-full max-w-5xl lg:block"
            />
          </Link>
        </Reveal>

        <div className="h-px w-full bg-black/10" aria-hidden="true" />

        <Stagger className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:justify-between">
          {FOOTER_LINKS.map((link) => (
            <StaggerItem key={link.href}>
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <Link href={link.href} className={footerLinkClassName}>
                  {link.label}
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="h-px w-full bg-black/10" aria-hidden="true" />

        <Reveal className="flex w-full flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-2 text-xs tracking-[1.1px] text-petroa-text sm:flex-row sm:gap-6">
            <span>Bay Islands, Honduras</span>
            <a
              href="mailto:info@petroa.com"
              className="transition-colors hover:text-petroa-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-white"
            >
              info@petroa.com
            </a>
          </div>

          <p className="text-xs tracking-[1.1px] text-[#999]">
            © 2026 PETROA. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={socialLinkClassName}
                whileHover={reduceMotion ? undefined : { scale: 1.1 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden
                  className="size-[18px]"
                />
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
