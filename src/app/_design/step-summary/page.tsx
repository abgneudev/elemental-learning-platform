import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StepSummary } from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "StepSummary — Design",
  description: "Preview surface for the StepSummary content pattern.",
};

export default function StepSummaryPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">StepSummary</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            &ldquo;Steps at a glance&rdquo; card. Required on every walkthrough
            step per PRD §10. The canonical short version of the step — a
            returning user should be able to read this and proceed without
            scrolling further. White surface so it reads cleanly against any
            bookend background.
          </p>
        </header>

        <Variant
          name="A · Setup (cyan bookend, anchored items)"
          surface="bg-brand-cyan"
          notes="Each item links to the matching detail section below. Anchored items are the right default for Setup and Apply, where the summary doubles as a table of contents. Total-time chip aggregates the per-step times into one number."
        >
          <StepSummary
            description="A one-time bath setup, then a per-patient mouldable sheet. Skip ahead with the links if you've done this before."
            totalTime="~5 min"
            items={[
              {
                text: "Place cup holder, fill bath and cup with tap water.",
                href: "#bath-setup",
                time: "~30 sec",
              },
              {
                text: "Plug bath in, set to 80 °C / 180 °F.",
                href: "#bath-heat",
                time: "~5 min",
              },
              {
                text: "Glove up, Vaseline on, pour PerioPlast® into the cup.",
                href: "#material-pour",
                time: "~30 sec",
              },
              {
                text: "Stir 10 seconds. Pull material off the forceps.",
                href: "#material-stir",
                time: "~10 sec",
              },
            ]}
          />
        </Variant>

        <Variant
          name="B · Form (blue bookend, three procedural phases)"
          surface="bg-brand-blue"
          notes="Items match the four PhaseSection blocks below — but trimmed to three lines at this scale, since the live-site phrasing on page 3 is &lsquo;In 3 steps you will learn to&rsquo;. Plain (non-anchored) items: at this level the summary is a preview, not a TOC."
        >
          <StepSummary
            label="In 3 steps"
            title="In 3 steps, you will learn to:"
            description="The live site frames the procedure as three movements. The four PhaseSection blocks below split &ldquo;disk&rdquo; and &ldquo;heat&rdquo; for clarity, but the mental model is three."
            totalTime="~5–7 min"
            items={[
              {
                text: "Turn the heated material into a disk.",
                time: "~1 min",
              },
              {
                text: "Shape the disk into a stent on the palate.",
                time: "~3 min",
              },
              {
                text: "Trim and finish the stent once it's set.",
                time: "~1–2 min",
              },
            ]}
          />
        </Variant>

        <Variant
          name="C · Apply (mint bookend, six surgical sub-steps, no times)"
          surface="bg-brand-mint"
          notes="Six items — at the upper bound of the 3–6 PRD constraint. Drops the time chips because the surgery is its own clock. Item 6 (5-day wear) is a downstream commitment, included so the patient handoff isn&rsquo;t buried inside the detail section."
        >
          <StepSummary
            label="Steps at a glance"
            title="During the surgery"
            description="Six-step surgical protocol from the live site, page 4. The walkthrough&rsquo;s Apply step covers items 4–6; items 1–3 are surgeon&rsquo;s scope and recap-only."
            items={[
              { text: "Make the stent before anaesthesia." },
              { text: "Prepare the recipient site." },
              { text: "Harvest the graft." },
              {
                text: "Place the stent immediately after harvesting to stabilise the blood clot.",
              },
              { text: "Position and stabilise the graft." },
              {
                text: "Patient wears the stent 5 days. First 24 h non-stop, then daily clean.",
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
