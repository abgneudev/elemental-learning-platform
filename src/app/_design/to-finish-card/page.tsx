import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ToFinishCard } from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "ToFinishCard — Design",
  description: "Preview surface for the ToFinishCard content pattern.",
};

export default function ToFinishCardPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">ToFinishCard</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Saturated-green terminal card marking the close of a phase or
            section. Pattern from live-site pages 2 and 3 — reads as a save
            point at phase boundaries, before the next QuickCheck.
          </p>
        </header>

        <Variant
          name="A · Default with duration (Form, end of Phase 2)"
          notes="The canonical shape, lifted verbatim from page 2: 'Keep closed for 1–2 minutes & remove once solid.' Duration chip surfaces the wait time so the card answers 'how long?' at a glance."
          surface="bg-brand-blue"
        >
          <ToFinishCard
            title="Keep closed for 1–2 minutes & remove once solid."
            duration="1–2 min"
          >
            Press a fingertip onto the surface — if it leaves no impression, the
            stent is fully set and safe to remove.
          </ToFinishCard>
        </Variant>

        <Variant
          name="B · Title-only (Setup, end of bath setup)"
          notes="Without supporting copy or duration. Used when the closing instruction is self-evident — e.g. at the end of Setup once the water is steaming."
          surface="bg-brand-cyan"
        >
          <ToFinishCard title="Bath is hot. You're ready to form the stent." />
        </Variant>

        <Variant
          name="C · Trim-and-finish (Form, end of Phase 4)"
          notes="Multi-line closing card for the trim phase. Body copy carries a Watch-out-adjacent reminder folded into the close — sharp edges are the last thing to handle before the stent goes in."
          surface="bg-brand-blue"
        >
          <ToFinishCard
            title="Trim with scissors. Smooth sharp edges with a heated instrument."
            duration="~1 min"
          >
            Aim for ~2 mm / 0.1 inch thickness across the stent. After trimming,
            run the heated instrument lightly along any cut edge — sharp lines
            irritate the palate once the stent is in place.
          </ToFinishCard>
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
