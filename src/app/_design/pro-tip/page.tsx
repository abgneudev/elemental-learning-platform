import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProTip } from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "ProTip — Design",
  description: "Preview surface for the ProTip content pattern.",
};

export default function ProTipPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">ProTip</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Inline tip rendered next to a specific micro-step. Light visual
            treatment so it doesn&apos;t compete with WatchOut.
          </p>
        </header>

        <Variant
          name="A · One-liner (Setup, step 1.2)"
          notes="The default and most common shape: a single sentence of helpful guidance attached to a micro-step."
          surface="bg-brand-cyan/70"
        >
          <Step n="1.2" instruction="Fill the bath with water to the line on the cup holder." />
          <ProTip className="mt-3">
            Fill the bath with tap water to speed up the heating time.
          </ProTip>
        </Variant>

        <Variant
          name="B · Titled (Form, phase 1)"
          notes="With a short headline when the tip benefits from a noun-phrase summary above the body."
          surface="bg-brand-blue"
        >
          <Step
            n="1.1"
            instruction="Heat 1 sheet of PerioPlast® in the cup."
            tone="dark"
          />
          <ProTip className="mt-3" title="Keep your forceps moving">
            Stir for the full 10 seconds. The granules clump as the surface
            softens — if they don&apos;t stick to one another, the water
            isn&apos;t hot enough yet.
          </ProTip>
        </Variant>

        <Variant
          name="C · Multi-line with bullets (Apply, post-op handoff)"
          notes="When a tip is procedurally richer — e.g. a checklist of small things to mention to the patient — body content can be a list. Label remains the same."
          surface="bg-brand-mint"
        >
          <Step n="3.4" instruction="Hand the patient their take-home card." />
          <ProTip className="mt-3" title="What to say while you hand it over">
            <ul className="list-disc space-y-1 pl-4">
              <li>The stent will feel tight for the first hour — that&apos;s normal.</li>
              <li>Soft food only for 24 hours; nothing crunchy on the graft side.</li>
              <li>Call us if the stent dislodges before the 7-day check.</li>
            </ul>
          </ProTip>
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
        className={`rounded-md border border-brand-navy/10 p-6 sm:p-8 ${surface}`}
      >
        {children}
      </div>
    </section>
  );
}

function Step({
  n,
  instruction,
  tone = "light",
}: {
  n: string;
  instruction: string;
  tone?: "light" | "dark";
}) {
  const text = tone === "dark" ? "text-cream" : "text-brand-navy";
  const num =
    tone === "dark"
      ? "bg-cream/15 text-cream"
      : "bg-brand-navy/10 text-brand-navy";
  return (
    <div className={`flex items-start gap-3 ${text}`}>
      <span
        className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 font-mono text-xs ${num}`}
      >
        {n}
      </span>
      <p className="font-heading text-base font-semibold">{instruction}</p>
    </div>
  );
}
