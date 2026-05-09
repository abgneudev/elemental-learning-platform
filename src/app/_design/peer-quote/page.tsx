import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PeerQuote } from "@/components/walkthrough";

export const metadata: Metadata = {
  title: "PeerQuote — Design",
  description: "Preview surface for the PeerQuote content pattern.",
};

export default function PeerQuotePreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">PeerQuote</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            In-context peer voice. One per walkthrough step per PRD §10.
            Replaces the buried &ldquo;practitioner tips&rdquo; sub-page in the
            original IA. Three implicit states — short, long, and with
            attribution — driven by the props passed.
          </p>
        </header>

        <Variant
          name="A · Short, anonymized (Setup)"
          notes="A single-sentence quote, no author block. Use when the quote is anonymized (e.g. an aggregated note from a training session) or when attribution permission isn't yet in hand. Reads as a margin note, not a testimonial."
          surface="bg-brand-cyan"
        >
          <PeerQuote
            quote={
              <p>
                Half my chair-time issue was waiting for the bath. Filling it
                with hot tap water cut the wait to under two minutes.
              </p>
            }
          />
        </Variant>

        <Variant
          name="B · Long, with attribution (Form)"
          notes="Multi-paragraph quote, named author with role. The Form step's peer slot — where a procedural detail is best heard from someone who's already failed and recovered. White surface holds against the saturated blue background."
          surface="bg-brand-blue"
        >
          <PeerQuote
            author={{
              name: "Prof. Dr. Markus Hürzeler",
              role: "Periodontist · Munich, Germany",
            }}
            quote={
              <>
                <p>
                  The first three I made were too thick. I was being careful —
                  pressing gently, not stretching — and the result was a stent
                  that felt safe but sat off the palate.
                </p>
                <p>
                  The unlock was the &ldquo;don&apos;t stretch, just press
                  thinner&rdquo; instruction. Two-millimetre thickness reads
                  fragile in the hand and is exactly what the patient wants in
                  the mouth.
                </p>
              </>
            }
          />
        </Variant>

        <Variant
          name="C · With attribution photo (post-licensing milestone)"
          notes="The full-fat shape: photo, name, role. While KOL headshot licensing is pending (PRD §19), the photo slot accepts any ReactNode — placeholder here stands in for the eventual portrait."
          surface="bg-brand-mint"
        >
          <PeerQuote
            author={{
              name: "Dr. Homa Zadeh",
              role: "Periodontist · Los Angeles, USA",
              photo: <PhotoStub label="HZ" tint="from-brand-blue/40 to-brand-cyan" />,
            }}
            quote={
              <p>
                Patients describe day one with a stent as &ldquo;tight, not
                painful&rdquo; — and that distinction matters. They keep it in
                because it&apos;s working, not because we asked them to.
              </p>
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
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${tint}`}
    >
      <span className="font-heading text-base font-semibold text-brand-navy/80">
        {label}
      </span>
    </div>
  );
}
