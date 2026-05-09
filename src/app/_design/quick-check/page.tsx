import type { Metadata } from "next";
import type { ReactNode } from "react";
import { QuickCheck } from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "QuickCheck — Design",
  description: "Preview surface for the QuickCheck content pattern.",
};

export default function QuickCheckPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">QuickCheck</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Two-up confirmation card showing what success looks like. Renders at
            phase boundaries inside Form, and at the end of Setup and Apply.
          </p>
        </header>

        <Variant
          name="A · Two-up (Setup, after water-bath setup)"
          notes="Default shape. Two captions confirming a successful state. Renders on the Setup bookend (cyan) at the close of section 1."
          surface="bg-brand-cyan/70"
        >
          <QuickCheck
            items={[
              {
                imageLabel: "cup + bath, both filled to line",
                caption: "Both cup and bath are now filled with water.",
              },
              {
                imageLabel: "water bath steaming at 80 °C",
                caption:
                  "The water bath is ready to use when the water is steaming.",
              },
            ]}
          />
        </Variant>

        <Variant
          name="B · Titled (Form, Phase 4 — When to trim?)"
          notes="With an explicit title posing the check as a question. Renders on the Form bookend (blue) at the end of phase 4."
          surface="bg-brand-blue"
        >
          <QuickCheck
            title="When to trim?"
            items={[
              {
                imageLabel: "stent surface — matte, fully set",
                caption:
                  "The stent's surface looks matte — the material is fully set.",
              },
              {
                imageLabel: "thumbnail press leaves no mark",
                caption:
                  "Pressing with a thumbnail leaves no impression. Now safe to trim.",
              },
            ]}
          />
        </Variant>

        <Variant
          name="C · Four-up (Form, Great-Stent reference fallback)"
          notes="Four-criteria layout used when the check enumerates more than two reference views. Demonstrates that the grid grows gracefully — not a replacement for GreatStentReference."
          surface="bg-brand-mint"
        >
          <QuickCheck
            label="Self-check"
            title="What makes a great stent?"
            items={[
              {
                imageLabel: "occlusal surfaces, almost translucent",
                caption: (
                  <>
                    <strong className="font-semibold">Bite function.</strong>{" "}
                    Almost translucent on occlusal surfaces.
                  </>
                ),
              },
              {
                imageLabel: "palatal anatomy visible in stent",
                caption: (
                  <>
                    <strong className="font-semibold">
                      Tight palatal adaptation.
                    </strong>{" "}
                    Palatal anatomy visible in the stent.
                  </>
                ),
              },
              {
                imageLabel: "buccal interproximal coverage",
                caption: (
                  <>
                    <strong className="font-semibold">Stable retention.</strong>{" "}
                    Occlusal surfaces and interproximal on the buccal side.
                  </>
                ),
              },
              {
                imageLabel: "≈2 mm thickness",
                caption: (
                  <>
                    <strong className="font-semibold">Thin stent.</strong>{" "}
                    Approximately 2 mm / 0.1 inch.
                  </>
                ),
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
