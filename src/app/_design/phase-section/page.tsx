import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  PhaseSection,
  ProTip,
  QuickCheck,
  ToFinishCard,
  WatchOut,
} from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "PhaseSection — Design",
  description: "Preview surface for the Form-step PhaseSection wrapper.",
};

export default function PhaseSectionPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">PhaseSection</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Form-step section wrapper for one of the four procedural phases.
            Renders the phase header, the numbered micro-step list, and a
            closing slot (typically a QuickCheck or ToFinishCard). Stacked
            vertically with no internal sub-stepper per PRD §10.
          </p>
        </header>

        <Variant
          name="A · Phase 1 with bullets and an inline WatchOut"
          notes="Lifted from live-site page 3, section #1 (&lsquo;Making &amp; placing the disk&rsquo;). Five micro-steps, supporting bullets, one WatchOut attached to step 1.2 (the Vaseline reminder). Closes with the QuickCheck the live site puts after this section."
        >
          <PhaseSection
            phaseNumber={1}
            title="Make & place the disk"
            time="~1 min"
            description="Heat one sheet of PerioPlast®, pull it off the forceps, shape a thin disk, and place it sufficiently posterior and buccal in the mouth."
            microSteps={[
              {
                title: "Heat 1 sheet of PerioPlast®.",
                bullets: [
                  "Open up 1 sheet (all 4 cubes) and pour it into the heated water.",
                  <>
                    Stir for 10 seconds. The granules will start to{" "}
                    <em>stick</em> together.
                  </>,
                ],
              },
              {
                title: "Pull the material off the forceps.",
                bullets: [
                  "Once the material clings to the forceps, take it out of the water.",
                  "Pull the material off the forceps.",
                ],
                callout: (
                  <WatchOut>
                    Apply Vaseline® on your gloves before pulling the material
                    off — it will not stick.
                  </WatchOut>
                ),
              },
              {
                title: "Shape a disk by pressing. Don't stretch.",
                bullets: [
                  "Thinner disk = more comfortable for the patient.",
                  "Stretching makes the disk uneven; press gently into shape.",
                ],
              },
              {
                title: "Sit behind the patient to place the disk.",
                bullets: [
                  "Sitting behind the patient is the easiest way to position the material in the mouth.",
                ],
              },
              {
                title: "Position the disk in the mouth.",
                bullets: [
                  "Sufficiently posterior — no material visible in the anterior zone.",
                  "Sufficiently buccal — so you can press it interproximally.",
                ],
              },
            ]}
          >
            <QuickCheck
              title="Disk in position?"
              items={[
                {
                  caption: "Long enough to cover the graft site.",
                  imageLabel: "graft coverage",
                },
                {
                  caption: "Wide enough for buccal retention.",
                  imageLabel: "buccal width",
                },
              ]}
            />
          </PhaseSection>
        </Variant>

        <Variant
          name="B · Phase 2 with a ProTip and a closing ToFinishCard"
          notes="Live-site page 3, section #2 (&lsquo;Shaping the stent on the palate&rsquo;). Demonstrates the ProTip variant attached mid-list and the ToFinishCard pattern as the closing slot — the canonical &lsquo;keep closed for 1–2 min&rsquo; pause that anchors the phase boundary."
        >
          <PhaseSection
            phaseNumber={2}
            title="Shape on the palate"
            time="~3 min"
            microSteps={[
              {
                title: "Press the disk firmly onto the occlusal surfaces.",
              },
              {
                title: "Wrap around the vestibular sides.",
                bullets: ["Press with the tongue from the inside."],
              },
              {
                title: "Press firmly on the palate until tightly adapted.",
                callout: (
                  <WatchOut title="Tight palatal adaptation is critical.">
                    Tight adaptation stabilises the blood clot — the whole
                    point of the stent. Don&apos;t rush this step.
                  </WatchOut>
                ),
              },
              {
                title: "Bite in full occlusion. Press interproximally for 30 seconds.",
                bullets: [
                  "Creates a stent with bite function — the patient can eat with it.",
                  "Locks stable retention on the buccal side.",
                ],
                callout: (
                  <ProTip>
                    Have the patient hold a mirror so they can see the bite —
                    they&apos;ll co-operate longer than 30 seconds.
                  </ProTip>
                ),
              },
              {
                title: "Re-adapt to the palate.",
                bullets: [
                  "Lock the stent in the interproximal areas for stable retention.",
                ],
              },
            ]}
          >
            <ToFinishCard
              title="Keep closed for 1–2 minutes & remove once solid."
              duration="1–2 min"
            >
              Press a fingertip onto the surface — if it leaves no impression,
              the stent is fully set and safe to remove.
            </ToFinishCard>
          </PhaseSection>
        </Variant>

        <Variant
          name="C · Phase 4 minimal (no time chip, no callouts, no closing slot)"
          notes="The opposite end of the spectrum: a phase that&rsquo;s effectively post-procedural housekeeping. No time chip, no description, no callouts, no closing card. Demonstrates that the structural shape holds up when the content has been edited down to its bones."
        >
          <PhaseSection
            phaseNumber={4}
            title="Trim & finish"
            microSteps={[
              {
                title: "Let the stent set in-situ. Remove gently once solid.",
              },
              { title: "Dunk in cold water to set harder." },
              { title: "If needed, trim with scissors." },
              { title: "Have the patient confirm the fit feels comfortable." },
              { title: "The stent is ready." },
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
  children,
}: {
  name: string;
  notes: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-3">
        <h2 className="font-heading text-lg text-brand-navy">{name}</h2>
        <p className="mt-1 max-w-2xl text-sm text-brand-navy/65">{notes}</p>
      </div>
      <div className="rounded-md border border-brand-navy/10 bg-brand-blue p-6 sm:p-10">
        {children}
      </div>
    </section>
  );
}
