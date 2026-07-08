"use client";

import ContactCtaButton from "@/components/contact/ContactCtaButton";

const ctaLinkClassName =
  "inline-flex min-h-11 items-center text-xs uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-bg motion-reduce:transition-none";

export default function CtaActions() {
  return (
    <div className="flex flex-wrap items-center gap-8 lg:col-span-5 lg:col-start-8">
      <ContactCtaButton
        modal="quote"
        className={`${ctaLinkClassName} border-b border-petroa-primary pb-0.5 font-semibold text-petroa-primary hover:text-petroa-navy active:text-petroa-navy`}
      >
        Request a Quote
      </ContactCtaButton>
      <ContactCtaButton
        modal="team"
        className={`${ctaLinkClassName} font-medium text-petroa-text/40 hover:text-petroa-text active:text-petroa-text`}
      >
        Speak With Our Team →
      </ContactCtaButton>
    </div>
  );
}
