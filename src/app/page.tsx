import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Eyebrow,
  WistiaPlayer,
  buttonStyles,
} from "@/components/primitives";
import { landing } from "@/lib/content";
import { ExpandableCards } from "@/components/landing/expandable-cards";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { PeerVideoCarousel } from "@/components/landing/peer-video-carousel";

export const metadata: Metadata = {
  title: landing.meta.title,
  description: landing.meta.description,
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="bg-white text-[#03045e]">
        <Hero />
        <ComparisonGrid />
        <ClinicalEvidence />
        <KolEndorsements />
        <PatientTestimonials />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}

/* ── Nav — see @/components/landing/nav.tsx (client component) ─────── */

/* ── Hero (combined with value props) ───────────────────────────────── */

function Hero() {
  const { hero, valueProps } = landing;
  return (
    <section
      aria-labelledby="hero-headline"
      className="border-b border-white/10 bg-brand-blue text-white"
    >
      {/* Top split: headline + CTAs on left, video on right */}
      <Container
        size="xl"
        className="flex flex-col gap-12 pb-20 pt-32 lg:flex-row lg:items-center lg:gap-16 lg:pb-24 lg:pt-40"
      >
        <div className="flex flex-1 min-w-0 flex-col gap-6">
          <h1
            id="hero-headline"
            className="font-heading text-step-mobile-lg leading-[1.02] tracking-tighter text-white sm:text-step-desktop-lg max-w-[16ch]"
          >
            {hero.headline}
          </h1>
          <div className="flex flex-col gap-0.4">
          {/* Stent illustration — centrepiece between copy and video */}
            <div className="hidden lg:flex flex-none items-center justify-center w-24 xl:w-24 shrink-0 opacity-40">
              <Image
                src="/images/sten.png"
                alt="Elemental stent"
                width={224}
                height={224}
                className="w-full h-auto drop-shadow-lg"
              />
            </div>
            <p className="font-heading text-lg font-bold text-white sm:text-xl">
              Heat. Mould. Apply.
            </p>
            <p className="max-w-[44ch] text-lg leading-relaxed text-white/70">
              {hero.lead}
            </p>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-4">
            {/* Play CTA */}
            <Link
              href={hero.primaryCta.href}
              className={buttonStyles("outline-light", "sm")}
            >
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white">
                <svg aria-hidden="true" className="h-2.5 w-2.5 translate-x-px fill-brand-blue" viewBox="0 0 10 12">
                  <path d="M0 0l10 6-10 6V0z" />
                </svg>
              </span>
              <span>{hero.primaryCta.label}</span>
              <span className="font-mono text-xs text-white/50">15 min</span>
            </Link>
            {/* External shop link */}
            {hero.secondaryCta && (
              <Link
                href={hero.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-heading text-sm font-medium text-white underline underline-offset-4 decoration-1 decoration-white/50 hover:decoration-white transition-colors"
              >
                {hero.secondaryCta.label}
                <svg aria-hidden="true" className="h-3.5 w-3.5 flex-none" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10L10 2M10 2H4.5M10 2v5.5" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Video */}
        <div className="relative flex-1 min-w-0">
          <div className="overflow-hidden rounded-xl border-6 border-brand-navy bg-white/5 shadow-xl">
            <WistiaPlayer mediaId={hero.wistiaMediaId} title={hero.wistiaTitle} />
          </div>
        </div>
      </Container>

      {/* Bottom: expandable value-prop cards */}
      <Container size="xl" className="pb-20">
        <p className="mb-5 font-heading text-lg font-bold text-white sm:text-xl">
          Why periodontists are replacing conventional stent workflows.
        </p>
        <ExpandableCards cards={valueProps} />
      </Container>
    </section>
  );
}

/* ── Comparison grid ────────────────────────────────────────────────── */

type CellValue = "yes" | "no" | "na";

const comparisonProducts = ["Elemental", "Sutures", "Suck-downs", "Perio-glue"] as const;

const comparisonRows: Array<{ feature: string; cells: [CellValue, CellValue, CellValue, CellValue] }> = [
  { feature: "No suturing",            cells: ["yes", "no",  "yes", "yes"] },
  { feature: "No impressions",         cells: ["yes", "yes", "no",  "yes"] },
  { feature: "No lab coordination",    cells: ["yes", "yes", "no",  "yes"] },
  { feature: "Same-day, in-office",    cells: ["yes", "yes", "no",  "yes"] },
  { feature: "Removable for cleaning", cells: ["yes", "no",  "yes", "no"]  },
  { feature: "Mechanical barrier",     cells: ["yes", "no",  "yes", "no"]  },
  { feature: "Patient eats normally",  cells: ["yes", "no",  "yes", "no"]  },
  { feature: "Stops palatal bleeding", cells: ["yes", "yes", "na",  "no"]  },
  { feature: "Made chairside in 5 min",cells: ["yes", "no",  "no",  "na"]  },
];

const cellDisplay: Record<CellValue, { symbol: string; label: string; textClass: string; bgClass: string }> = {
  yes: { symbol: "✓", label: "Yes", textClass: "text-brand-green",    bgClass: "bg-[#edfaf4]" },
  no:  { symbol: "✗", label: "No",  textClass: "text-error",          bgClass: "bg-[#fef2f2]" },
  na:  { symbol: "—", label: "N/A", textClass: "text-brand-navy/30",  bgClass: "bg-transparent" },
};

// SVG path `d` values per feature (24×24 viewBox, stroke-based)
const featureIcons: Record<string, string[]> = {
  "No suturing": [
    // Scissors: two handle rings + two blades
    "M4.5 8.25a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0",
    "M4.5 15.75a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0",
    "M8.25 6.75 21 3",
    "M8.25 17.25 21 21",
  ],
  "No impressions": [
    // 3-D box (impression mold)
    "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    "M3.27 6.96 12 12.01l8.73-5.05",
    "M12 22.08V12",
  ],
  "No lab coordination": [
    // Flask / beaker
    "M9 3h6",
    "M10 3v4l-4 7.5A1 1 0 0 0 6.88 16h10.24A1 1 0 0 0 18 14.5L14 7V3z",
  ],
  "Same-day, in-office": [
    // Calendar
    "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5",
  ],
  "Removable for cleaning": [
    // Rotating arrows
    "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
  ],
  "Mechanical barrier": [
    // Shield with check
    "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
  ],
  "Patient eats normally": [
    // Fork (three tines + arc + handle)
    "M6 2v5M9 2v5M12 2v5M6 7a3 3 0 0 0 6 0M9 10v11",
    // Knife (blade + guard + handle)
    "M19 2v6M16 5h6M19 8v13",
  ],
  "Stops palatal bleeding": [
    // Heart
    "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z",
  ],
  "Made chairside in 5 min": [
    // Clock
    "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  ],
};

function ComparisonGrid() {
  return (
    <section
      id="comparison"
      aria-label="Workflow comparison"
      className="scroll-mt-20 border-b border-[#03045e]/8 bg-[#f1fdff] py-20 sm:py-24"
    >
      <Container size="xl" className="flex flex-col gap-8">
        <p className="font-heading text-lg font-bold tracking-tight text-brand-navy sm:text-xl">
          How Elemental compares — at a glance.
        </p>

        <div className="overflow-x-auto">
          <div className="overflow-hidden rounded-md border border-[#03045e]/10 shadow-sm">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Elemental vs. conventional palatal wound-management approaches
              </caption>
              <thead>
                <tr className="border-b border-[#03045e]/8">
                  <th scope="col" className="bg-transparent px-6 py-4" />
                  {comparisonProducts.map((product) => (
                    <th
                      key={product}
                      scope="col"
                      className={`px-6 py-4 text-center ${product === "Elemental" ? "bg-brand-navy" : "bg-transparent"}`}
                    >
                      <span
                        className={`font-heading text-sm font-bold ${product === "Elemental" ? "text-white" : "text-brand-navy/50"}`}
                      >
                        {product}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i > 0 ? "border-t border-[#03045e]/8" : ""}>
                    <th scope="row" className="bg-transparent px-6 py-4 align-middle">
                      <span className="flex items-center gap-2 whitespace-nowrap">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 flex-none text-brand-navy/40"
                        >
                          {(featureIcons[row.feature] ?? []).map((d, idx) => (
                            <path key={idx} d={d} />
                          ))}
                        </svg>
                        <span className="text-base font-bold text-brand-navy/80">{row.feature}</span>
                      </span>
                    </th>
                    {row.cells.map((value, ci) => {
                      const { symbol, label, textClass, bgClass } = cellDisplay[value];
                      const isElemental = ci === 0;
                      return (
                        <td
                          key={ci}
                          className={`px-6 py-5 text-center ${isElemental ? "bg-brand-navy/8" : bgClass}`}
                        >
                          <span
                            className={`font-heading text-xl font-bold ${isElemental ? textClass : textClass}`}
                            aria-label={label}
                          >
                            {symbol}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Clinical evidence ──────────────────────────────────────────────── */

function ClinicalEvidence() {
  const { evidence } = landing;
  return (
    <section
      id="evidence"
      aria-labelledby="evidence-title"
      className="scroll-mt-20 border-b border-white/10 bg-brand-navy py-20 text-cream sm:py-28"
    >
      <Container size="xl" className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        {/* Text column */}
        <div className="flex flex-1 min-w-0 flex-col gap-8">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 flex-none bg-cream/30" />
            <Eyebrow tone="cream" size="md">Clinical evidence</Eyebrow>
          </div>
          <blockquote
            id="evidence-title"
            className="max-w-3xl font-heading text-2xl font-bold leading-snug tracking-tight sm:text-3xl"
          >
            <span aria-hidden="true" className="text-cream/30">&ldquo;</span>
            {evidence.title}
            <span aria-hidden="true" className="text-cream/30">&rdquo;</span>
          </blockquote>
          <p className="text-base text-cream/60">
            <span className="font-heading font-semibold text-cream/90">{evidence.journal}</span>
            <span className="mx-3 text-cream/25">·</span>
            {evidence.date}
          </p>
          {evidence.href && (
            <div>
              <Link
                href={evidence.href}
                className={buttonStyles("outline-light", "sm")}
              >
                Read the study
                <svg aria-hidden="true" className="h-3.5 w-3.5 flex-none" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10L10 2M10 2H4.5M10 2v5.5" />
                </svg>
              </Link>
            </div>
          )}
        </div>
        {/* Study image */}
        <div className="w-full max-w-xs lg:max-w-sm flex-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.prod.website-files.com/608992c15f8d261420ca9608/6523d4877aa5558d086cf6e0_study-p1%20(1).jpg"
            srcSet="https://cdn.prod.website-files.com/608992c15f8d261420ca9608/6523d4877aa5558d086cf6e0_study-p1%20(1)-p-500.jpg 500w, https://cdn.prod.website-files.com/608992c15f8d261420ca9608/6523d4877aa5558d086cf6e0_study-p1%20(1).jpg 899w"
            sizes="(max-width: 479px) 96vw, 320px"
            alt="Clinical study — first page"
            loading="lazy"
            className="w-full rounded-lg shadow-2xl"
          />
        </div>
      </Container>
    </section>
  );
}

/* ── KOL endorsements + peer reviews ───────────────────────────────── */

function KolEndorsements() {
  return (
    <section
      aria-labelledby="kols-title"
      className="border-b border-brand-navy/8 bg-white py-20 sm:py-24"
    >
      <Container size="xl" className="flex flex-col gap-16">
        {/* KOL grid */}
        <div className="flex flex-col gap-12">
          <header className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 flex-none bg-brand-blue" />
              <Eyebrow tone="blue" size="md">KOL endorsements</Eyebrow>
            </div>
            <h2
              id="kols-title"
              className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl"
            >
              Clinicians who use Elemental today.
            </h2>
          </header>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {landing.kols.map((kol) => (
              <li
                key={kol.name}
                className="flex flex-col items-center gap-3 text-center"
              >
                <KolAvatar name={kol.name} image={kol.image} />
                <div className="flex flex-col gap-0.5">
                  <p className="font-heading text-xs font-semibold leading-tight text-brand-navy">
                    {kol.name}
                  </p>
                  {kol.affiliation && (
                    <p className="text-xs leading-snug text-brand-navy/60">
                      {kol.affiliation}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-brand-navy/50">…and many more.</p>
        </div>

        {/* Peer video shorts — horizontally scrollable carousel */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 flex-none bg-brand-blue" />
            <Eyebrow tone="blue" size="md">From practitioners</Eyebrow>
          </div>
          <PeerVideoCarousel
            items={landing.peerReviews}
            heading={
              <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-brand-navy sm:text-3xl">
                Hear it in their own words.
              </h3>
            }
          />
        </div>
      </Container>
    </section>
  );
}

/* ── Patient testimonials ──────────────────────────────────────────── */

function PatientTestimonials() {
  return (
    <section
      aria-labelledby="patients-title"
      className="border-b border-brand-navy/8 bg-cream py-20 sm:py-24"
    >
      <Container size="xl" className="flex flex-col gap-12">
        <header className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 flex-none bg-brand-orange" />
            <Eyebrow tone="orange" size="md">From patients</Eyebrow>
          </div>
          <h2
            id="patients-title"
            className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl"
          >
            What it feels like on the receiving end.
          </h2>
        </header>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {landing.patientTestimonials.map((t, i) => (
            <li key={`${t.name}-${i}`}>
              <figure className="flex h-full flex-col gap-5 border-l-2 border-brand-orange/60 bg-white p-7 sm:p-8">
                <blockquote className="flex-1">
                  <p className="text-base leading-relaxed text-brand-navy/85">
                    {t.quote}
                  </p>
                </blockquote>
                <figcaption className="flex flex-col gap-0.5 border-t border-brand-navy/10 pt-4">
                  <cite className="font-heading text-sm font-semibold not-italic text-brand-navy">
                    {t.name}
                  </cite>
                  <span className="text-xs text-brand-navy/55">
                    {t.context}
                    {t.procedureDate ? ` · ${t.procedureDate}` : ""}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ── Pricing (merged with "Ready to make your first stent?") ────────── */

function Pricing() {
  const { starterKit, refills } = landing.pricing;
  const { headline, body, cta } = landing.footerCta;
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="scroll-mt-20 bg-brand-navy py-24 text-cream sm:py-32"
    >
      <Container size="xl" className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-10">
        {/* Left: headline + body + CTA + refill rows */}
        <div className="flex flex-[1.5] min-w-0 flex-col gap-7">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 flex-none bg-cream/25" />
            <Eyebrow tone="cream" size="md">Get started</Eyebrow>
          </div>
          <h2
            id="pricing-title"
            className="max-w-2xl font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          >
            {headline}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-cream/70">{body}</p>
          <Link
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles("outline-light", "sm") + " self-start"}
          >
            {cta.label}
            <svg aria-hidden="true" className="h-3.5 w-3.5 flex-none" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 10L10 2M10 2H4.5M10 2v5.5" />
            </svg>
          </Link>
        </div>
        {/* Right: single combined card */}
        <div className="relative w-full flex-none lg:w-[560px]">
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-black/25"
          />
          <div className="relative rounded-2xl bg-brand-blue p-6 sm:p-9">
            {/* Starter Kit header row */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-heading text-2xl font-bold text-white">
                {starterKit.title}
              </h3>
              <span className="font-mono text-2xl font-bold text-white whitespace-nowrap">{starterKit.price}</span>
            </div>
            {/* Includes list */}
            <ul className="mt-4 mb-6 flex flex-col gap-2.5">
              {starterKit.includes.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-sm leading-snug text-white/70"
                >
                  <BulletDot />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            {/* Divider */}
            <div className="mb-5 h-px" style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.4) 0, rgba(255,255,255,0.4) 5px, transparent 5px, transparent 14px)" }} />
            {/* Refill rows */}
            <div className="flex flex-col">
              {refills.map((r, i) => (
                <div key={r.label} style={i > 0 ? { borderTop: "1px solid transparent", backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.4) 0, rgba(255,255,255,0.4) 5px, transparent 5px, transparent 14px)", backgroundSize: "100% 1px", backgroundRepeat: "no-repeat", backgroundPosition: "top", paddingTop: "1rem", marginTop: "1rem" } : {}} className="flex flex-col gap-0.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-heading text-sm font-bold text-white">{r.label}</p>
                    <span className="font-mono text-sm font-bold text-white/90 whitespace-nowrap">{r.price}</span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <p className="text-xs text-white/50">{r.material}</p>
                    <span className="text-xs text-white/45 whitespace-nowrap">{r.perStent}/stent</span>
                  </div>
                </div>
              ))}
            </div>
            {/* CTA */}
            <div className="mt-8">
              <Link
                href={starterKit.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles("outline-light", "sm")}
              >
                {starterKit.cta.label}
                <svg aria-hidden="true" className="h-3.5 w-3.5 flex-none" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10L10 2M10 2H4.5M10 2v5.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}



/* ── Helpers ────────────────────────────────────────────────────────── */

function BulletDot() {
  return (
    <span
      aria-hidden="true"
      className="mt-1.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success"
    />
  );
}

function KolAvatar({ name, image }: { name: string; image?: string }) {
  if (image) {
    return (
      <span className="inline-flex h-24 w-24 flex-none overflow-hidden rounded-full sm:h-32 sm:w-32 lg:h-40 lg:w-40">
        <Image
          src={image}
          alt={name}
          width={160}
          height={160}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }
  const initials = name
    .replace(/^(Prof\.?|Dr\.?|Mr\.?|Ms\.?|Mrs\.?)\s+/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-brand-navy font-heading text-lg font-semibold text-cream sm:h-32 sm:w-32 lg:h-40 lg:w-40"
    >
      {initials || "—"}
    </span>
  );
}

