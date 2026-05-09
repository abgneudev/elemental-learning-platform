import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StepHero } from "@/components/walkthrough";
import type { StepKey } from "@/components/primitives";

export const metadata: Metadata = {
  title: "StepHero — Design",
  description: "Preview surface for the StepHero walkthrough header.",
};

const SURFACE: Record<StepKey, string> = {
  setup: "bg-brand-cyan",
  form: "bg-brand-blue",
  apply: "bg-brand-mint",
};

export default function StepHeroPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">StepHero</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Above-the-fold header for each walkthrough step. Pairs the eyebrow
            indicator, time chip, title, and one-line lead. The Form step renders
            its title one tier larger than the bookends — the visual signal that
            the saturated middle is where the technique-sensitive work lives.
          </p>
        </header>

        <Variant
          name="A · Setup (cyan bookend)"
          step="setup"
          notes="Light cyan background, navy text. Title at the bookend size (52px desktop / 32px mobile). Time chip lives next to the eyebrow — it&rsquo;s the first thing a clinician needs before they decide to start."
        >
          <StepHero
            step="setup"
            eyebrow="Step 1 · Setup"
            time="~5 min"
            title="Set up the bath. Make the material mouldable."
            lead="A one-time bath setup, then a per-patient sheet of PerioPlast® stirred to a chewing-gum consistency. Most of the time is the bath warming."
            illustration={
              <PlaceholderIllustration
                label="water bath · cup · forceps"
                tint="from-white via-white to-brand-cyan"
              />
            }
          />
        </Variant>

        <Variant
          name="B · Form (saturated middle, no illustration)"
          step="form"
          notes="Saturated blue background, cream text, one-tier-larger title (60px desktop / 36px mobile) per PRD §8. Without an illustration the text claims the full width — useful when the SampleCallout immediately below carries the visual weight."
        >
          <StepHero
            step="form"
            eyebrow="Step 2 · Form the stent"
            time="~5–7 min"
            title="Heat. Disk. Shape. Trim."
            lead="The technique-sensitive middle of the walkthrough. Four phases stacked vertically — make the disk, place it on the palate, shape it under occlusion, then trim and finish."
          />
        </Variant>

        <Variant
          name="C · Apply (mint bookend, in-surgery framing)"
          step="apply"
          notes="Light mint background, navy text. Time chip carries non-numeric copy (&ldquo;during the surgery&rdquo;) because the live procedure doesn&rsquo;t bound this step in clock time. Illustration slot shows how a real photograph would land alongside the lead."
        >
          <StepHero
            step="apply"
            eyebrow="Step 3 · Apply"
            time="During the surgery"
            title="Place the stent immediately after harvesting."
            lead="Position before anaesthesia wears off; stabilise the blood clot before suturing the donor site. Hand the patient the 5-day wear instructions on the way out."
            illustration={
              <PlaceholderIllustration
                label="surgical placement · donor site"
                tint="from-white via-brand-mint/40 to-brand-mint"
              />
            }
          />
        </Variant>
      </div>
    </main>
  );
}

function Variant({
  name,
  notes,
  step,
  children,
}: {
  name: string;
  notes: string;
  step: StepKey;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-3">
        <h2 className="font-heading text-lg text-brand-navy">{name}</h2>
        <p className="mt-1 max-w-2xl text-sm text-brand-navy/65">{notes}</p>
      </div>
      <div
        className={`rounded-md border border-brand-navy/10 p-6 sm:p-10 ${SURFACE[step]}`}
      >
        {children}
      </div>
    </section>
  );
}

function PlaceholderIllustration({
  label,
  tint,
}: {
  label: string;
  tint: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-end bg-gradient-to-br ${tint} p-3`}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-brand-navy/55">
        {label}
      </span>
    </div>
  );
}
