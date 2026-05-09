import type { Metadata } from "next";
import type { ReactNode } from "react";
import { WhatYouWillLearn } from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "WhatYouWillLearn — Design",
  description: "Preview surface for the WhatYouWillLearn anchor-tile pattern.",
};

export default function WhatYouWillLearnPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">WhatYouWillLearn</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Above-the-fold anchor tile grid. Each tile links to its detail
            section anchor below. Mirrors the live-site &ldquo;What you will
            learn&rdquo; pattern present on every page. Per PRD §10 the count
            stays in 2–4.
          </p>
        </header>

        <Variant
          name="A · Setup, three tiles, no detail (cyan bookend)"
          notes="The default shape: short imperative titles, no subline. Three tiles is the live site's Setup count and the most common case."
          surface="bg-brand-cyan"
        >
          <WhatYouWillLearn
            items={[
              { title: "What's in the Starter Kit", href: "#starter-kit" },
              { title: "Set up & clean the water bath", href: "#bath-setup" },
              {
                title: "Make PerioPlast® mouldable",
                href: "#material-prep",
              },
            ]}
          />
        </Variant>

        <Variant
          name="B · Form, two tiles with detail (blue bookend)"
          notes="When a tile carries a one-line elaboration, the tile reads as a destination preview rather than a label. The Form step on the live site uses two tiles — appropriate when the procedure is the page rather than a sub-section of it."
          surface="bg-brand-blue"
        >
          <WhatYouWillLearn
            items={[
              {
                title: "3 steps to make a stent",
                href: "#phases",
                detail:
                  "Heat → disk → palate shape → trim. Four PhaseSection blocks below.",
              },
              {
                title: "What to look out for",
                href: "#what-to-look-out-for",
                detail:
                  "Four anti-patterns that cost you the practice sheet if you miss them.",
              },
            ]}
          />
        </Variant>

        <Variant
          name="C · Apply, four tiles (mint bookend, max count)"
          notes="The four-tile cap from PRD §10. Mirrors the live site's Apply page: surgical protocol, patient handoff, workflow benefits, billing. With four tiles the grid lands at 2x2 on tablet and 1x4 on desktop."
          surface="bg-brand-mint"
        >
          <WhatYouWillLearn
            items={[
              {
                title: "Surgical protocol",
                href: "#surgical-protocol",
                detail: "Six-step sequence around the graft.",
              },
              {
                title: "Patient instructions",
                href: "#patient-handoff",
                detail: "First 24 h, day 2–4, day 5+.",
              },
              {
                title: "How Elemental upgrades your workflow",
                href: "#workflow",
                detail: "Easiest to bleed-stop, fastest to make, best UX.",
              },
              {
                title: "How to bill for Elemental stents",
                href: "#billing",
                detail: "Mark-up, bundled, or D5988.",
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
