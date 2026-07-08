import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        petroa: {
          bg: "var(--color-petroa-bg)",
          text: "var(--color-petroa-text)",
          primary: "var(--color-petroa-primary)",
          accent: "var(--color-petroa-accent)",
          navy: "var(--color-petroa-navy)",
          slate: "var(--color-petroa-slate)",
          muted: "var(--color-petroa-muted)",
          line: "var(--color-petroa-line)",
          white: "var(--color-petroa-white)",
          cardBlue: "var(--color-petroa-card-blue)",
          cardText: "var(--color-petroa-card-text)",
          cardDark: "var(--color-petroa-card-dark)",
          cta: "var(--color-petroa-cta)",
        },
      },
      fontFamily: {
        sans: ["var(--font-barlow)", "sans-serif"],
        display: ["var(--font-barlow-condensed)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "2xs": "10px",
        xs: "11px",
        sm: "12px",
        base: "15px",
        md: "18px",
        lg: "25.6px",
        xl: "43.2px",
        "2xl": "72px",
        "3xl": "86.4px",
        "4xl": "144px",
      },
      spacing: {
        4.5: "18px",
        5.5: "22px",
        6.5: "26px",
        7.5: "30px",
        9.5: "38px",
        10.5: "42px",
        13: "52px",
        14: "56px",
        18: "72px",
        20: "80px",
        24: "96px",
        32: "128px",
        36: "144px",
      },
      borderRadius: {
        sm: "12px",
        lg: "24px",
      },
      letterSpacing: {
        tightest: "-3.6px",
        tighter: "-1.8px",
        micro: "0.325px",
        label: "1.56px",
        badge: "1.65px",
        wide: "2px",
        wider: "2.2px",
        widest: "3px",
      },
      boxShadow: {
        none: "none",
      },
    },
  },
};

export default config;
