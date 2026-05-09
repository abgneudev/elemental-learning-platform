import type { Metadata } from "next";
import type { ReactNode } from "react";
import { WhatToLookOutFor } from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "WhatToLookOutFor — Design",
  description: "Preview surface for the WhatToLookOutFor content pattern.",
};

export default function WhatToLookOutForPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">WhatToLookOutFor</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Section-level four-card warning grid that follows
            <code className="mx-1 font-mono text-sm">GreatStentReference</code>
            in the Form step. Shares the orange family with{" "}
            <code className="font-mono text-sm">WatchOut</code> so the two read
            as the same warning voice. Pattern from live-site page 3.
          </p>
        </header>

        <Variant
          name="A · Default (Form, after GreatStentReference)"
          notes="Canonical placement. Four warnings lifted from the live site's mobile copy: short, imperative, no supporting detail. The orange-tint surface separates the section from the white self-check above without changing colour family."
          surface="bg-brand-blue"
        >
          <WhatToLookOutFor
            items={[
              {
                title: "Make the stent before numbing the palate.",
                imageLabel: "anti-pattern · numbed palate",
              },
              {
                title: "Tight palatal adaptation is critical.",
                imageLabel: "anti-pattern · loose adaptation",
              },
              {
                title: "Long enough to cover the grafting site.",
                imageLabel: "reference · graft coverage",
              },
              {
                title: "Wide enough for buccal retention.",
                imageLabel: "reference · buccal width",
              },
            ]}
          />
        </Variant>

        <Variant
          name="B · With desktop detail (live-site desktop pattern)"
          notes="On the live site, desktop pages add a clinical-rationale one-liner under each warning that mobile drops. The detail prop carries that — same headlines, more reasoning. Use this variant on the desktop walkthrough; the default variant on small viewports."
          surface="bg-brand-blue"
        >
          <WhatToLookOutFor
            description="Four critical errors at the form-the-stent stage. Each one is recoverable only by starting over with a fresh sheet of PerioPlast® — and you only get one practice sheet per kit."
            items={[
              {
                title: "Make the stent before numbing the palate.",
                detail:
                  "A stent shaped on a swollen palate won't fit once swelling subsides. You only get one practice sheet, and a misfit stent can't be reformed.",
                imageLabel: "anti-pattern · numbed palate",
              },
              {
                title: "Tight palatal adaptation is critical.",
                detail:
                  "Tight adaptation stabilises the blood clot, preventing suturing and post-operative bleeding. Loose adaptation defeats the entire procedure.",
                imageLabel: "anti-pattern · loose adaptation",
              },
              {
                title: "Long enough to cover the grafting site.",
                detail:
                  "The stent must extend past the distal edge of the graft. Short of the graft and the clot is exposed during chewing.",
                imageLabel: "reference · graft coverage",
              },
              {
                title: "Wide enough for buccal retention.",
                detail:
                  "Material has to wrap interproximally on the buccal side to lock the stent in place. Too narrow and it dislodges within hours.",
                imageLabel: "reference · buccal width",
              },
            ]}
          />
        </Variant>

        <Variant
          name="C · With reference photographs (post-licensing milestone)"
          notes="When the live-site anti-pattern photos are licensed and dropped in (PRD §19, pending). The image slot accepts any ReactNode; placeholders here stand in for the real photographs of the four failure shapes."
          surface="bg-brand-blue"
        >
          <WhatToLookOutFor
            label="Avoid"
            title="Four failure modes to avoid"
            items={[
              {
                title: "Numbed-palate fit failure",
                detail:
                  "Stent shaped after anaesthesia — gaps once swelling resolves.",
                image: <PhotoStub label="01 · numbed-palate fit" tint="from-brand-orange/30 to-white" />,
              },
              {
                title: "Loose palatal adaptation",
                detail: "Daylight visible between stent and palate vault.",
                image: <PhotoStub label="02 · loose adaptation" tint="from-brand-orange/25 to-brand-cyan" />,
              },
              {
                title: "Short of the grafting site",
                detail: "Distal edge falls anterior of the graft margin.",
                image: <PhotoStub label="03 · short coverage" tint="from-white to-brand-orange/30" />,
              },
              {
                title: "Narrow / no buccal grip",
                detail: "No interproximal wrap — stent dislodges within hours.",
                image: <PhotoStub label="04 · no buccal grip" tint="from-brand-cyan to-brand-orange/30" />,
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
      <span className="font-mono text-[10px] uppercase tracking-wider text-brand-navy/70">
        {label}
      </span>
    </div>
  );
}
