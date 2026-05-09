import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SampleCallout } from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "SampleCallout — Design",
  description: "Preview surface for the SampleCallout content pattern.",
};

export default function SampleCalloutPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">SampleCallout</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Top-of-Form-step affordance that couples the digital walkthrough to
            the physical sample shipped in the Starter Kit. White surface so it
            holds up against the saturated blue Form background.
          </p>
        </header>

        <Variant
          name="A · Default (Form, top of page)"
          notes="The canonical placement: first thing on the Form step, above the four PhaseSection blocks. Title and body land verbatim from the live site; CTA links out to the existing shop."
          surface="bg-brand-blue"
        >
          <SampleCallout
            cta={{
              href: "https://shop.withelemental.com/products/perioplast-intro-kit",
              label: "Visit the shop",
            }}
          >
            The Starter Kit ships with one extra sheet of PerioPlast® so your
            first stent can be a practice stent, not a patient&apos;s.
          </SampleCallout>
        </Variant>

        <Variant
          name="B · No CTA (returning user, sample already in hand)"
          notes="When the user has already received the kit — surfaced from a returning-visitor path. Drops the CTA and supporting copy; the prompt itself is enough."
          surface="bg-brand-blue"
        >
          <SampleCallout
            label="Reminder"
            title="Reach for the practice sample before the patient sheet."
          />
        </Variant>

        <Variant
          name="C · With product photo (post-photography milestone)"
          notes="When real photography of the blister pack is available it slots into the image area, replacing the placeholder glyph. Body copy lengthens to describe what's in the kit. Pending content per §19 of the PRD."
          surface="bg-brand-blue"
        >
          <SampleCallout
            title="One sheet to learn on. One to use on the patient."
            image={
              <div className="flex h-full w-full items-center justify-center px-3 text-center font-mono text-[10px] text-brand-navy/55">
                blister-pack photograph
              </div>
            }
            cta={{
              href: "/walkthrough/setup#starter-kit",
              label: "What's in the Starter Kit",
            }}
          >
            Two sheets of PerioPlast®, a re-usable water bath, and a card with
            the heat–shape–trim sequence on the back. Set the bath up first
            (Setup step) so the practice sheet is ready when you start.
          </SampleCallout>
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
