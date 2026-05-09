import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GreatStentReference } from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "GreatStentReference — Design",
  description: "Preview surface for the GreatStentReference content pattern.",
};

export default function GreatStentReferencePreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">GreatStentReference</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Four-criteria self-check rendered after the Form-step phases.
            Pattern from live-site page 3 (&ldquo;What makes a great
            stent?&rdquo;). The four criteria are tier-3 locked per PRD §9 —
            content (captions, photos) is editable; the criterion set is not.
          </p>
        </header>

        <Variant
          name="A · Default (Form, after Phase 4)"
          notes="Canonical placement. Live-site copy verbatim — bite function, tight palatal adaptation, stable retention, thin stent (~2 mm). White card sits cleanly against the saturated blue Form background."
          surface="bg-brand-blue"
        >
          <GreatStentReference
            description="Use the example stent in your kit to examine your own. All four should be true before you take the stent into surgery."
            items={[
              {
                title: "Bite function",
                caption: "Almost translucent on the occlusal surfaces.",
                imageLabel: "occlusal surfaces · translucent",
              },
              {
                title: "Tight palatal adaptation",
                caption: "Palatal anatomy clearly visible through the stent.",
                imageLabel: "palatal surface · anatomy visible",
              },
              {
                title: "Stable retention",
                caption:
                  "Locked at the occlusal surfaces and interproximally on the buccal side.",
                imageLabel: "buccal · interproximal grip",
              },
              {
                title: "Thin stent",
                caption: "Approximately 2 mm / 0.1 in thick across the palate.",
                imageLabel: "cross-section · ~2 mm",
              },
            ]}
          />
        </Variant>

        <Variant
          name="B · Short captions (mobile-first content)"
          notes="When the client edits captions down to fit small screens. Drops the description and uses the live-site mobile phrasing ('Strong retention'). Demonstrates how the card holds together with terser content."
          surface="bg-brand-blue"
        >
          <GreatStentReference
            items={[
              {
                title: "Bite function",
                caption: "Translucent on occlusion.",
                imageLabel: "bite",
              },
              {
                title: "Tight palatal adaptation",
                caption: "Palate visible through stent.",
                imageLabel: "palate",
              },
              {
                title: "Strong retention",
                caption: "Grips buccal interproximal.",
                imageLabel: "retention",
              },
              {
                title: "Thin stent",
                caption: "~2 mm / 0.1 in.",
                imageLabel: "thickness",
              },
            ]}
          />
        </Variant>

        <Variant
          name="C · With reference photographs (post-licensing milestone)"
          notes="When live-site photographs are licensed and slotted in (PRD §19, pending). The image slots accept any ReactNode — here a labelled stand-in stands for the real WebP/AVIF assets that will replace the placeholders."
          surface="bg-brand-blue"
        >
          <GreatStentReference
            label="Reference"
            description="Photographs sourced from live site at withelemental.com/lesson-3, pending licensing confirmation."
            items={[
              {
                title: "Bite function",
                caption: "Almost translucent on occlusal surfaces.",
                image: <PhotoStub label="01 · occlusal" tint="from-brand-cyan to-white" />,
              },
              {
                title: "Tight palatal adaptation",
                caption:
                  "Palatal anatomy visible. Critical to stabilise the blood clot.",
                image: <PhotoStub label="02 · palatal" tint="from-brand-mint to-white" />,
              },
              {
                title: "Stable retention",
                caption:
                  "Occlusal surfaces and interproximal on the buccal side.",
                image: <PhotoStub label="03 · buccal" tint="from-brand-cyan to-brand-mint" />,
              },
              {
                title: "Thin stent",
                caption: "Approximately 2 mm / 0.1 in.",
                image: <PhotoStub label="04 · thickness" tint="from-white to-brand-cyan" />,
              },
            ]}
          />
        </Variant>
      </div>
    </main>
  );
}

function Variant({
  name,
  notes,
  surface,
  children,
}: {
  name: string;
  notes: string;
  surface: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-3">
        <h2 className="font-heading text-lg text-brand-navy">{name}</h2>
        <p className="mt-1 max-w-2xl text-sm text-brand-navy/65">{notes}</p>
      </div>
      <div
        className={`rounded-md border border-brand-navy/10 p-6 sm:p-10 ${surface}`}
      >
        {children}
      </div>
    </section>
  );
}

function PhotoStub({ label, tint }: { label: string; tint: string }) {
  return (
    <div
      className={`flex h-full w-full items-end bg-gradient-to-br ${tint} p-3`}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-brand-navy/60">
        {label}
      </span>
    </div>
  );
}
