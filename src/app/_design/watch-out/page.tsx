import type { Metadata } from "next";
import type { ReactNode } from "react";
import { WatchOut } from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "WatchOut — Design",
  description: "Preview surface for the WatchOut content pattern.",
};

export default function WatchOutPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">WatchOut</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Inline warning rendered next to a specific micro-step. Stronger
            visual weight than ProTip — orange accent, bolder rule, semantic
            <code className="mx-1 font-mono text-sm">role=&quot;note&quot;</code>.
          </p>
        </header>

        <Variant
          name="A · One-liner (Form, phase 1.2 — pull material off forceps)"
          notes="The most common shape: a single critical sentence. Live-site copy: &quot;Apply Vaseline® on your gloves to prevent sticking.&quot;"
          surface="bg-brand-blue"
        >
          <Step
            n="1.2"
            instruction="Pull the material off the forceps."
            tone="dark"
          />
          <WatchOut className="mt-3">
            Apply Vaseline® on your gloves to prevent sticking.
          </WatchOut>
        </Variant>

        <Variant
          name="B · Titled (Form, top-of-page warning)"
          notes="With a short imperative title when the warning needs to be skim-readable from the WhatToLookOutFor grid. Live-site copy from page 3."
          surface="bg-brand-blue"
        >
          <WatchOut title="Make the stent before numbing the palate.">
            Numbing causes swelling. A stent shaped on a swollen palate
            won&apos;t fit once the swelling subsides — and you only get one
            try with a single sheet of PerioPlast®.
          </WatchOut>
        </Variant>

        <Variant
          name="C · Multi-bullet (Form, phase 1.3 — shaping the disk)"
          notes="When several anti-patterns collapse onto one micro-step. Body becomes a tight bullet list. Combined live-site copy from steps 1.3 and 1.5."
          surface="bg-brand-blue"
        >
          <Step
            n="1.3"
            instruction="Shape a disk by pressing the material. Don't stretch."
            tone="dark"
          />
          <WatchOut className="mt-3" title="Three things that ruin the disk">
            <ul className="list-disc space-y-1 pl-4">
              <li>
                Stretching or pulling the material — it will make the disk uneven.
              </li>
              <li>
                Positioning too far anterior — material will be visible in the
                aesthetic zone.
              </li>
              <li>
                Positioning too far lingual — you&apos;ll lose the buccal
                interproximal grip the stent needs for retention.
              </li>
            </ul>
          </WatchOut>
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
