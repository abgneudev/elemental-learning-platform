import type { Metadata } from "next";
import {
  Eyebrow,
  StepBar,
  WistiaPlayer,
  type EyebrowSize,
  type EyebrowTone,
  type StepKey,
} from "@/components/primitives";

export const metadata: Metadata = {
  title: "Design system — Elemental",
  description: "Token preview surface. Internal.",
};

const colors = [
  { name: "brand-navy", value: "#03045e", note: "text, dark CTAs" },
  { name: "brand-blue", value: "#0077b6", note: "Form step background" },
  { name: "brand-green", value: "#068466", note: "ToFinish, success" },
  { name: "brand-cyan", value: "#caf0f8", note: "Setup step background" },
  { name: "brand-mint", value: "#d6eedb", note: "Apply step background" },
  { name: "brand-orange", value: "#fc9f5b", note: "WatchOut accent" },
  { name: "cream", value: "#f8f6f4", note: "Landing background" },
];

const typeSamples = [
  { name: "text-xs", className: "text-xs", px: "12px" },
  { name: "text-sm", className: "text-sm", px: "14px" },
  { name: "text-base", className: "text-base", px: "16px" },
  { name: "text-lg", className: "text-lg", px: "18px" },
  { name: "text-xl", className: "text-xl", px: "20px" },
  { name: "text-2xl", className: "text-2xl", px: "24px" },
  { name: "text-3xl", className: "text-3xl", px: "32px" },
  { name: "text-step-mobile", className: "text-step-mobile", px: "32px (Setup/Apply mobile title)" },
  { name: "text-step-mobile-lg", className: "text-step-mobile-lg", px: "36px (Form mobile title)" },
  { name: "text-step-desktop", className: "text-step-desktop", px: "52px (Setup/Apply desktop title)" },
  { name: "text-step-desktop-lg", className: "text-step-desktop-lg", px: "60px (Form desktop title)" },
];

const spacing = [
  { name: "0.5", rem: "0.125rem", px: "2px" },
  { name: "1", rem: "0.25rem", px: "4px" },
  { name: "1.5", rem: "0.375rem", px: "6px" },
  { name: "2", rem: "0.5rem", px: "8px" },
  { name: "3", rem: "0.75rem", px: "12px" },
  { name: "4", rem: "1rem", px: "16px" },
  { name: "5", rem: "1.25rem", px: "20px" },
  { name: "6", rem: "1.5rem", px: "24px" },
  { name: "8", rem: "2rem", px: "32px" },
  { name: "10", rem: "2.5rem", px: "40px" },
  { name: "12", rem: "3rem", px: "48px" },
  { name: "14", rem: "3.5rem", px: "56px" },
  { name: "16", rem: "4rem", px: "64px" },
  { name: "20", rem: "5rem", px: "80px" },
  { name: "24", rem: "6rem", px: "96px" },
  { name: "32", rem: "8rem", px: "128px" },
];

const radii = [
  { name: "rounded-sm", className: "rounded-sm", px: "4px" },
  { name: "rounded", className: "rounded", px: "8px" },
  { name: "rounded-md", className: "rounded-md", px: "12px" },
  { name: "rounded-lg", className: "rounded-lg", px: "16px" },
  { name: "rounded-xl", className: "rounded-xl", px: "24px" },
  { name: "rounded-full", className: "rounded-full", px: "9999px" },
];

const motion = [
  { name: "duration-200", desc: "default UI transition" },
  { name: "duration-220 ease-step", desc: "step slide-out" },
  { name: "duration-320 ease-step", desc: "step slide-in" },
];

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-16">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · token preview
          </p>
          <h1 className="mt-2 text-3xl">Design system</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Every brand color, type size, spacing step, radius, and motion token
            in <code className="font-mono text-sm">tailwind.config.ts</code> and{" "}
            <code className="font-mono text-sm">styles/tokens.css</code>, rendered.
          </p>
        </header>

        <Section title="Color">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {colors.map((c) => (
              <figure key={c.name} className="rounded-md border border-brand-navy/10 bg-white p-4">
                <div
                  className="h-24 w-full rounded-md"
                  style={{ background: c.value }}
                  aria-hidden
                />
                <figcaption className="mt-3">
                  <div className="font-mono text-sm">{c.name}</div>
                  <div className="font-mono text-xs text-brand-navy/60">{c.value}</div>
                  <div className="mt-1 text-xs text-brand-navy/60">{c.note}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <p className="mb-6 text-sm text-brand-navy/70">
            Headings: Open Sans 600. Body: Source Sans 3 400/500.
          </p>
          <div className="space-y-6">
            {typeSamples.map((t) => (
              <div key={t.name} className="border-b border-brand-navy/10 pb-6">
                <div className="mb-2 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-brand-navy/60">{t.name}</span>
                  <span className="font-mono text-xs text-brand-navy/40">{t.px}</span>
                </div>
                <p className={`font-heading ${t.className}`}>
                  Form the stent in three phases.
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Spacing">
          <p className="mb-6 text-sm text-brand-navy/70">
            4px base scale. Bars below show actual size.
          </p>
          <div className="space-y-3">
            {spacing.map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <span className="w-12 font-mono text-xs text-brand-navy/60">{s.name}</span>
                <span className="w-20 font-mono text-xs text-brand-navy/40">{s.px}</span>
                <span
                  className="block h-3 rounded-sm bg-brand-blue"
                  style={{ width: s.rem }}
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Radius">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {radii.map((r) => (
              <figure key={r.name} className="text-center">
                <div
                  className={`mx-auto h-20 w-20 bg-brand-cyan ${r.className}`}
                  aria-hidden
                />
                <figcaption className="mt-2">
                  <div className="font-mono text-xs">{r.name}</div>
                  <div className="font-mono text-xs text-brand-navy/40">{r.px}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section title="Motion">
          <ul className="space-y-2 font-mono text-sm">
            {motion.map((m) => (
              <li key={m.name} className="flex gap-3">
                <span>{m.name}</span>
                <span className="text-brand-navy/60">— {m.desc}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-brand-navy/60">
            Reduced motion: all transitions degrade to opacity-only via{" "}
            <code className="font-mono text-xs">prefers-reduced-motion</code>.
          </p>
        </Section>

        <Section title="StepBar (sticky)">
          <p className="mb-4 text-sm text-brand-navy/70">
            Sticky walkthrough bar. Frosted cream fill so it reads cleanly over
            any bookend background. Middle (Form) pill is wider than the
            Setup/Apply pills to signal Form-step primacy.
          </p>
          <div className="space-y-3">
            {(["setup", "form", "apply"] as StepKey[]).map((step) => (
              <StepBarPreview key={step} step={step} />
            ))}
          </div>
        </Section>

        <Section title="Eyebrow">
          <p className="mb-6 text-sm text-brand-navy/70">
            Section labels above titles. Two sizes; tone matches surface.
          </p>
          <div className="space-y-6">
            {(["md", "sm"] as EyebrowSize[]).map((size) => (
              <div key={size} className="border-b border-brand-navy/10 pb-6">
                <div className="mb-3 font-mono text-xs text-brand-navy/60">
                  size={size}
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(["blue", "navy", "green", "orange"] as EyebrowTone[]).map(
                    (tone) => (
                      <div
                        key={tone}
                        className="rounded-md border border-brand-navy/10 bg-white p-4"
                      >
                        <Eyebrow tone={tone} size={size}>
                          What you will learn
                        </Eyebrow>
                        <p className="mt-1 font-mono text-xs text-brand-navy/40">
                          tone={tone}
                        </p>
                      </div>
                    ),
                  )}
                  <div className="rounded-md bg-brand-navy p-4">
                    <Eyebrow tone="cream" size={size}>
                      What you will learn
                    </Eyebrow>
                    <p className="mt-1 font-mono text-xs text-cream/50">
                      tone=cream
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="WistiaPlayer">
          <p className="mb-4 text-sm text-brand-navy/70">
            Lazy iframe wrapping the existing Wistia embed. Default 16:9, fluid
            width. Title is required for screen readers.
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <figure>
              <WistiaPlayer
                mediaId="yk3vsc3iq5"
                title="What is Elemental? — hero video"
              />
              <figcaption className="mt-2 font-mono text-xs text-brand-navy/60">
                aspect=16x9 · mediaId=yk3vsc3iq5
              </figcaption>
            </figure>
            <figure>
              <WistiaPlayer
                mediaId="t6ni3imsmb"
                title="Setting up your water bath"
                aspect="4x3"
              />
              <figcaption className="mt-2 font-mono text-xs text-brand-navy/60">
                aspect=4x3 · mediaId=t6ni3imsmb
              </figcaption>
            </figure>
          </div>
        </Section>

        <Section title="Bookend backgrounds">
          <p className="mb-4 text-sm text-brand-navy/70">
            Walkthrough step backgrounds — two muted bookends, one saturated middle.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Bookend label="Setup" tokenBg="bg-brand-cyan" textClass="text-brand-navy" />
            <Bookend label="Form" tokenBg="bg-brand-blue" textClass="text-cream" />
            <Bookend label="Apply" tokenBg="bg-brand-mint" textClass="text-brand-navy" />
          </div>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="mb-6 text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function StepBarPreview({ step }: { step: StepKey }) {
  const heroBg = {
    setup: "bg-brand-cyan",
    form: "bg-brand-blue",
    apply: "bg-brand-mint",
  }[step];
  const prevHref =
    step === "setup" ? undefined : step === "form" ? "/walkthrough/setup" : "/walkthrough/form";
  const nextHref =
    step === "setup"
      ? "/walkthrough/form"
      : step === "form"
        ? "/walkthrough/apply"
        : "/walkthrough/done";
  return (
    <div className="overflow-hidden rounded-md border border-brand-navy/10">
      <StepBar
        currentStep={step}
        prevHref={prevHref}
        nextHref={nextHref}
        stepHrefs={{
          setup: "/walkthrough/setup",
          form: "/walkthrough/form",
          apply: "/walkthrough/apply",
        }}
      />
      <div className={`h-24 ${heroBg}`} aria-hidden />
    </div>
  );
}

function Bookend({
  label,
  tokenBg,
  textClass,
}: {
  label: string;
  tokenBg: string;
  textClass: string;
}) {
  return (
    <div className={`flex h-32 items-center justify-center rounded-md ${tokenBg}`}>
      <span className={`font-heading text-2xl ${textClass}`}>{label}</span>
    </div>
  );
}
