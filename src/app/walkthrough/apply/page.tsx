import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import {
  Container,
  StepBar,
  WistiaPlayer,
  buttonStyles,
} from "@/components/primitives";
import { Eyebrow } from "@/components/primitives/eyebrow";
import {
  ExtraInfoCard,
  PageTimeline,
  QuickCheck,
  StepHero,
  StepSummary,
  TabbedPhase,
  type TabbedPhaseStep,
} from "@/components/walkthrough";
import { walkthrough } from "@/lib/content";
import { renderDarkCallouts } from "@/components/walkthrough/render";
import { Footer } from "@/components/landing/footer";
import { patientHandoffImages, type CdnImage } from "@/lib/assets";

/* ---------- Image slot helper -------------------------------------------- */
function StepPhoto({ image }: { image: CdnImage }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes="(max-width: 1024px) 100vw, 45vw"
      className="h-full w-full object-cover"
    />
  );
}

const apply = walkthrough.apply;

export const metadata: Metadata = {
  title: `${apply.hero.title.replace(/\.$/, "")} — Elemental Apply`,
  description: apply.hero.lead,
};

const patientTimeline: Array<{ label: string; detail: string }> = [
  {
    label: "Day 1 · 24 h non-stop",
    detail: "The stent stays in to stabilise the blood clot.",
  },
  {
    label: "Day 2–4 · daily clean",
    detail: "Patient removes once per day, then places it back.",
  },
  {
    label: "Day 5+ · pain-free out",
    detail: "Stent comes out once the donor site is comfortable.",
  },
  {
    label: "Billing · D5988",
    detail: "Surgical-splint code. $150–$250 mark-up per stent.",
  },
];

export default function ApplyPage() {
  return (
    <>
      <StepBar
        currentStep="apply"
        prevHref={apply.nav.prev?.href}
        prevLabel={apply.nav.prev?.label}
        stepHrefs={{
          setup: "/walkthrough/setup",
          form: "/walkthrough/form",
          apply: "/walkthrough/apply",
        }}
      />

      <PageTimeline
        sections={[
          { id: "apply-hero", label: "Overview" },
          { id: "patient-timeline", label: "5-Day Timeline" },
          { id: "surgical-protocol", label: "Surgical Protocol" },
          { id: "patient-handoff", label: "Patient Handoff" },
          { id: "workflow", label: "Workflow" },
        ]}
      />

      <main className="text-brand-navy">
        {/* ── Hero band (azure tint — step colour for Apply) ──────────── */}
        <section id="apply-hero" className="border-b border-brand-navy/8 bg-azure">
          <Container size="xl" className="pb-20 pt-28 sm:pb-40 sm:pt-40">
            <div className="flex flex-col gap-10">
              <StepHero description={`Part 3: ${apply.hero.lead}`} />
              <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
                <div className="flex min-w-0 flex-1 flex-col">
                  <StepSummary
                    label={apply.summary.label}
                    title={apply.summary.title}
                    totalTime={apply.summary.totalTime}
                    items={apply.summary.items}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  {apply.hero.wistiaMediaId && (
                    <div className="overflow-hidden rounded-2xl border-6 border-brand-navy shadow-xl">
                      <WistiaPlayer
                        mediaId={apply.hero.wistiaMediaId}
                        title={apply.hero.wistiaTitle ?? apply.hero.title}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── 5-day patient timeline (mirrors Setup's Starter Kit grid) ── */}
        <section id="patient-timeline" className="border-b border-white/10 bg-brand-navy">
          <Container size="xl" className="py-20 sm:py-28">
            <div className="flex flex-col gap-10">
              <p className="font-heading text-lg font-bold text-white sm:text-xl">
                What the patient lives with — five days, four handoffs:
              </p>
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-6">
                {patientTimeline.map((item) => (
                  <div key={item.label} className="flex flex-1 flex-col gap-3">
                    <div className="aspect-[4/3] w-full rounded-xl bg-white/10" />
                    <p className="font-heading text-base font-bold leading-tight tracking-tight text-white">
                      {item.label}
                    </p>
                    <p className="text-sm leading-snug text-white/65">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── Step A: Surgical Protocol ─────────────────────────────────── */}
        <ApplyStep section={apply.details[0]} phaseNumber={1} />

        {/* ── Step B: Patient Handoff ───────────────────────────────────── */}
        <ApplyStep
          section={apply.details[1]}
          phaseNumber={2}
          stepImages={[
            <StepPhoto key="first"  image={patientHandoffImages.first}  />,
            <StepPhoto key="second" image={patientHandoffImages.second} />,
            <StepPhoto key="third"  image={patientHandoffImages.third}  />,
          ]}
        />

        {/* ── Step C: Workflow ──────────────────────────────────────────── */}
        <ApplyStep section={apply.details[2]} phaseNumber={3} />

        {/* ── Extra info + step nav (brand-blue) ───────────────────────── */}
        <section className="bg-brand-blue">
          <Container size="xl" className="flex flex-col gap-16 py-24 sm:py-32">
            <ExtraInfoCard
              label={apply.extraInfo.label}
              title={apply.extraInfo.title}
              description={apply.extraInfo.description}
              items={apply.extraInfo.items}
              cta={apply.extraInfo.cta}
            />
            <BottomNav prev={apply.nav.prev} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ApplyStep({
  section,
  phaseNumber,
  stepImages,
}: {
  section: typeof apply.details[number];
  phaseNumber: number;
  stepImages?: React.ReactNode[];
}) {
  const steps: TabbedPhaseStep[] =
    section.microSteps?.map((step, i) => ({
      title: step.title,
      bullets: step.bullets,
      callouts:
        step.callouts && step.callouts.length > 0
          ? renderDarkCallouts(step.callouts)
          : undefined,
      image: stepImages?.[i],
      imageLabel: typeof step.title === "string" ? step.title : undefined,
    })) ?? [];

  return (
    <>
      <section id={section.id} className="border-b border-brand-navy/8 bg-cream">
        <Container size="xl" className="py-20 sm:py-28">
          <TabbedPhase
            phaseNumber={phaseNumber}
            title={section.title}
            description={section.lead}
            steps={steps}
          />
        </Container>
      </section>
      {section.quickCheck && (
        <QuickCheck
          label={section.quickCheck.label}
          title={section.quickCheck.title}
          items={section.quickCheck.items}
        />
      )}
    </>
  );
}

/* ── Bottom nav: Back button + completion card pointing to shop ────────
   Mirrors the Form/Setup pairing of `filled-orange` Back button + a navy
   payoff card. Apply is the terminal step, so the card is a shop CTA. */

function BottomNav({ prev }: { prev?: { href: string; label: string } }) {
  return (
    <div className="flex flex-col gap-5">
      <nav
        aria-label="Step navigation (bottom)"
        className="flex items-stretch gap-4"
      >
        {prev && (
          <Link
            href={prev.href}
            className={buttonStyles("filled-orange", "md")}
          >
            <span aria-hidden="true" className="text-xl font-black">
              ←
            </span>
            Back
          </Link>
        )}
        <DoneCard
          href="https://shop.withelemental.com/products/perioplast-intro-kit"
          className="flex-1"
        />
      </nav>
      <FinalLessonSecondaryActions />
    </div>
  );
}

/**
 * Secondary actions surfaced only on the FINAL lesson's success state —
 * Instagram share + Contact alongside the primary shop CTA above.
 * Matches the existing on-dark secondary-link pattern from the landing hero.
 */
function FinalLessonSecondaryActions() {
  return (
    <div
      role="group"
      aria-label="Share and contact"
      className="flex flex-wrap items-center gap-x-6 gap-y-2"
    >
      <a
        // TODO: replace with the real Elemental Instagram handle/tag,
        // e.g. https://www.instagram.com/withelemental or a stories-share intent.
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-heading text-sm font-medium text-white underline underline-offset-4 decoration-1 decoration-white/50 transition-colors hover:decoration-white"
      >
        Share your first stent on Instagram
        <svg
          aria-hidden="true"
          className="h-3.5 w-3.5 flex-none"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 10L10 2M10 2H4.5M10 2v5.5" />
        </svg>
      </a>
      <Link
        href="/contact"
        className="inline-flex items-center gap-1.5 font-heading text-sm font-medium text-white underline underline-offset-4 decoration-1 decoration-white/50 transition-colors hover:decoration-white"
      >
        Contact Elemental
      </Link>
    </div>
  );
}

function DoneCard({ href, className }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group block w-full rounded-md bg-brand-navy p-8 transition-colors hover:bg-brand-navy/90 sm:p-10",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Eyebrow tone="cream" size="md">
            You&apos;re set
          </Eyebrow>
          <h3 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Order the Starter Kit and make your first stent.
          </h3>
        </div>
        <span
          aria-hidden="true"
          className="flex-none self-center text-3xl font-black leading-none text-white transition-transform group-hover:translate-x-2"
        >
          →
        </span>
      </div>
    </Link>
  );
}
