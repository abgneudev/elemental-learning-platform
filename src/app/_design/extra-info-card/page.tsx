import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ExtraInfoCard } from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "ExtraInfoCard — Design",
  description: "Preview surface for the ExtraInfoCard content pattern.",
};

export default function ExtraInfoCardPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">ExtraInfoCard</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Dense reference card specific to each walkthrough step (cleaning
            protocol, precautions, patient handoff, billing). Lighter cream
            tint reads as an inset reference rather than a new section. One per
            step per PRD §10.
          </p>
        </header>

        <Variant
          name="A · Setup, term/definition list (cleaning protocol)"
          notes="The structured shape: term/definition rows for a cleaning protocol or material spec. CTA links out to the standalone /reference/cleaning page where the full protocol lives."
          surface="bg-brand-cyan"
        >
          <ExtraInfoCard
            title="Cleaning the bath, cup, and cup holder"
            description="The kit's three components have three different cleaning protocols. Use a clean cup for every patient."
            items={[
              {
                term: "Steel cup",
                definition: "Autoclavable at 273 °F / 134 °C. Use a fresh cup per patient.",
              },
              {
                term: "Water bath",
                definition:
                  "Not autoclavable. Wipe with sterilisation wipes daily. See bath manual for steam protocol.",
              },
              {
                term: "Cup holder",
                definition: "Wipe with sterilisation wipes daily.",
              },
            ]}
            cta={{
              href: "/reference/cleaning",
              label: "Full cleaning protocol",
            }}
          />
        </Variant>

        <Variant
          name="B · Form, free-form body (precautions)"
          notes="When the reference content is prose rather than rows. The blue Form background needs the cream tint to feel like an inset reference and not a competing surface."
          surface="bg-brand-blue"
        >
          <ExtraInfoCard
            label="Precautions"
            title="Before you reach for the forceps"
            description="Three small things that the live site buries in the body text but matter on first attempt."
          >
            <ul className="list-disc space-y-1.5 pl-4 marker:text-brand-navy/40">
              <li>
                Apply Vaseline to gloves before touching the heated material —
                without it, the disk sticks and tears as you pull it off the
                forceps.
              </li>
              <li>
                Make the stent <em>before</em> numbing the palate. A stent
                shaped on a swollen palate won&apos;t fit once swelling
                resolves, and you only get one practice sheet per kit.
              </li>
              <li>
                You can re-heat to restart. If the disk goes wrong on the
                palate, drop it back into the cup and start over.
              </li>
            </ul>
          </ExtraInfoCard>
        </Variant>

        <Variant
          name="C · Apply, term/definition + CTA (billing)"
          notes="Apply-step billing reference. Three rows for the three live-site approaches; CTA points to a fuller billing breakdown. This is the densest shape — used when a step's reference is itself a small lookup table."
          surface="bg-brand-mint"
        >
          <ExtraInfoCard
            label="Billing"
            title="Three ways to charge for an Elemental stent"
            description="Pulled from the live site's page 4. Pricing scope is procurement-side: it lives here as a reference, not as a step."
            items={[
              {
                term: "Mark-up",
                definition: "3–5× material cost. Live-site range: $150–$250 per stent.",
              },
              {
                term: "Bundled",
                definition: "Include the stent as part of the broader graft procedure fee.",
              },
              {
                term: "Insurance code",
                definition: "D5988 — Surgical Splint. Coverage varies by carrier.",
              },
            ]}
            cta={{
              href: "/reference/patient-handoff",
              label: "Full patient handoff",
            }}
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
