import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand — saturated originals (kept verbatim, used sparingly)
        "brand-navy": "#03045e",
        "brand-blue": "#0077b6",
        "brand-green": "#068466",
        "brand-cyan": "#caf0f8",
        "brand-mint": "#d6eedb",
        "brand-orange": "#fc9f5b",
        "brand-red": "#DD3900",
        cream: "#f8f6f4",

        // Brand — matte / desaturated variants for healthcare calm.
        // Use when the saturated original reads too clinical.
        "brand-blue-matte": "#4a6e87",
        "brand-green-matte": "#4d7568",
        "brand-cyan-matte": "#d8e6ea",
        "brand-mint-matte": "#dde7df",
        "brand-orange-matte": "#d49476",

        // Ink ramp — monochromatic neutrals derived from navy.
        // Default non-brand palette: type, hairlines, muted surfaces.
        ink: {
          50: "#f4f5f7",
          100: "#eef0f3",
          200: "#e2e3eb",
          300: "#cdcedc",
          400: "#adafc4",
          500: "#8688aa",
          600: "#5e6094",
          700: "#3a3c80",
          800: "#1d1f6e",
          900: "#03045e",
        },

        hairline: "rgba(3, 4, 94, 0.1)",
        "hairline-strong": "rgba(3, 4, 94, 0.2)",

        // Semantic state colors — functional UI feedback
        success: "#57a773",
        warning: "#f19953",
        error: "#ed6a5e",

        // Tinted surface alternates — airy blue-white backgrounds
        azure: "#f1fdff",
        "white-smoke": "#f4f8fb",
        "ghost-white": "#ebebf0",

        // Deep navy — darker anchor for footers and terminal CTAs
        "brand-navy-deep": "#001e42",
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-open-sans)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing, fontWeight? }]
        // Body / utility scale
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.0625rem", { lineHeight: "1.65" }],          // 17px body
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        lede: ["1.375rem", { lineHeight: "1.5", fontWeight: "400" }],  // 22px lede
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],

        // Display scale — heavier weights per v-d.md §Type system
        sub: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],   // 28px
        "3xl": ["2rem", { lineHeight: "2.375rem", letterSpacing: "-0.015em" }],
        card: ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "700" }], // 36px card headline
        "section-mobile": ["2.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        section: ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],   // 72px
        "hero-mobile": ["3.5rem", { lineHeight: "1.0", letterSpacing: "-0.025em", fontWeight: "700" }],
        hero: ["7rem", { lineHeight: "1.0", letterSpacing: "-0.025em", fontWeight: "700" }],       // 112px

        // Eyebrow — mono small-caps with letter-spacing 0.12em
        eyebrow: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.12em", fontWeight: "600" }],

        // Slash-number — `/01`, `/02` mono labels
        slash: ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }],

        // Legacy step-title scale (bookend treatment) — kept for back-compat
        "step-mobile": ["2rem", { lineHeight: "2.375rem", letterSpacing: "-0.015em", fontWeight: "700" }],
        "step-mobile-lg": ["2.25rem", { lineHeight: "2.625rem", letterSpacing: "-0.02em", fontWeight: "700" }],
        "step-desktop": ["3.25rem", { lineHeight: "3.625rem", letterSpacing: "-0.02em", fontWeight: "700" }],
        "step-desktop-lg": ["3.75rem", { lineHeight: "4.125rem", letterSpacing: "-0.025em", fontWeight: "700" }],
      },
      letterSpacing: {
        eyebrow: "0.12em",
        tight: "-0.015em",
        tighter: "-0.02em",
        tightest: "-0.025em",
      },
      spacing: {
        // 4px base scale
        "0": "0",
        px: "1px",
        "0.5": "0.125rem", // 2
        "1": "0.25rem", // 4
        "1.5": "0.375rem", // 6
        "2": "0.5rem", // 8
        "3": "0.75rem", // 12
        "4": "1rem", // 16
        "5": "1.25rem", // 20
        "6": "1.5rem", // 24
        "8": "2rem", // 32
        "10": "2.5rem", // 40
        "12": "3rem", // 48
        "14": "3.5rem", // 56
        "16": "4rem", // 64
        "20": "5rem", // 80
        "24": "6rem", // 96
        "32": "8rem", // 128
        "40": "10rem", // 160 — section padding desktop
        "48": "12rem", // 192 — section padding desktop max
        section: "clamp(4rem, 8vw, 12rem)",
        "section-tight": "clamp(3rem, 6vw, 7.5rem)",
      },
      maxWidth: {
        measure: "60ch",
        content: "55rem",   // 880px — most content
        hero: "67.5rem",     // 1080px — hero break-out
        container: "80rem", // 1280px
      },
      borderRadius: {
        // Per v-d.md: no rounded corners larger than 6px on cards/blocks.
        none: "0",
        xs: "0.125rem",     // 2px
        sm: "0.25rem",      // 4px
        DEFAULT: "0.375rem", // 6px — new flat-card default
        md: "0.375rem",     // 6px (legacy alias re-pointed)
        lg: "1rem",         // legacy — avoid in new code
        xl: "1.5rem",       // legacy — avoid in new code
        full: "9999px",
      },
      borderColor: {
        DEFAULT: "rgba(3, 4, 94, 0.1)",  // hairline by default
      },
      transitionTimingFunction: {
        step: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      transitionDuration: {
        "200": "200ms",
        "220": "220ms",
        "240": "240ms",
        "300": "300ms",
        "320": "320ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      backgroundImage: {
        "rule-dotted-leader":
          "linear-gradient(to right, rgba(3,4,94,0.18) 0, rgba(3,4,94,0.18) 4px, transparent 4px, transparent 8px)",
      },
      backgroundSize: {
        "rule-dots": "8px 1px",
      },
    },
  },
  plugins: [],
};

export default config;