import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  StepBar,
  WistiaPlayer,
  buttonStyles,
} from "@/components/primitives";
import {
  ExtraInfoCard,
  UpNextCard,
  GreatStentReference,
  PageTimeline,
  QuickCheck,
  SampleCallout,
  StepHero,
  StepSummary,
  TabbedPhase,
  ToFinishCard,
  WhatToLookOutFor,
  type GreatStentCriterion,
  type QuickCheckItem,
  type TabbedPhaseStep,
  type WhatToLookOutForItem,
} from "@/components/walkthrough";
import { walkthrough } from "@/lib/content";
import { Footer } from "@/components/landing/footer";
import {
  greatStentImages,
  icons,
  lookoutImages,
  phase1CheckImages,
  phaseThumbnails,
  trimCheckImages,
  videos,
  type CdnImage,
} from "@/lib/assets";
const form = walkthrough.form;

export const metadata: Metadata = {
  title: `${form.hero.title.replace(/\.$/, "")} — Elemental Form`,
  description: form.hero.lead,
};

/* ---------- Image slot helper ----------------------------------------------
   Renders a CDN image into the `image` slot a walkthrough component exposes.
   The components wrap in an `aspect-[4/3]` container, so we use `fill` mode. */

function CdnPhoto({
  image,
  sizes,
  priority = false,
}: {
  image: CdnImage;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className="h-full w-full object-cover"
    />
  );
}

/* ---------- Decorate text-only content with imagery ------------------------ */

const greatStentItems: GreatStentCriterion[] = form.greatStentReference.items.map(
  (item, i) => {
    const photos = [
      greatStentImages.biteFunction,
      greatStentImages.tightPalatal,
      greatStentImages.stableRetention,
      greatStentImages.thinStent,
    ];
    return {
      ...item,
      image: (
        <CdnPhoto
          image={{ ...photos[i], alt: photos[i].alt }}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
        />
      ),
    };
  },
);

const lookoutItems: WhatToLookOutForItem[] = form.whatToLookOutFor.items.map(
  (item, i) => {
    const photos = [
      lookoutImages.beforeNumbing,
      lookoutImages.tightPalatal,
      lookoutImages.longEnough,
      lookoutImages.wideEnough,
    ];
    return {
      ...item,
      image: (
        <CdnPhoto
          image={photos[i]}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
        />
      ),
    };
  },
);

/** Phase 1 closing quick-check — disk placement check. */
function withPhase1QuickCheck(items: readonly QuickCheckItem[]): QuickCheckItem[] {
  const photos = [phase1CheckImages.longEnough, phase1CheckImages.wideEnough];
  return items.map((it, i) => ({
    ...it,
    image: photos[i] ? (
      <CdnPhoto
        image={photos[i]}
        sizes="(min-width: 640px) 40vw, 90vw"
      />
    ) : (
      it.image
    ),
  }));
}

/** Phase 3 closing quick-check — "When to trim?". */
function withTrimQuickCheck(items: readonly QuickCheckItem[]): QuickCheckItem[] {
  const photos = [trimCheckImages.softPalate, trimCheckImages.alveolarMucosa];
  return items.map((it, i) => ({
    ...it,
    image: photos[i] ? (
      <CdnPhoto
        image={photos[i]}
        sizes="(min-width: 640px) 40vw, 90vw"
      />
    ) : (
      it.image
    ),
  }));
}

/** Pick the right quick-check decorator for a phase. */
function decorateQuickCheck(
  phaseNumber: number,
  items: readonly QuickCheckItem[],
): QuickCheckItem[] {
  if (phaseNumber === 2) return withPhase1QuickCheck(items); // Disk placement check
  if (phaseNumber === 4) return withTrimQuickCheck(items);   // Trim check
  return [...items];
}

/**
 * Maps (phaseNumber, stepIndex) → the corresponding sub-step video.
 * Phases 1–2 share the p1 substep bucket; Phase 3 uses p2; Phase 4 uses p3.
 */
const microStepVideos: Record<number, ReadonlyArray<{ mediaId: string; title: string }>> = {
  1: [videos.phaseSubsteps.p1.heat, videos.phaseSubsteps.p1.pull],
  2: [videos.phaseSubsteps.p1.shape, videos.phaseSubsteps.p1.sit, videos.phaseSubsteps.p1.position],
  3: [
    videos.phaseSubsteps.p2.pressOcclusal,
    videos.phaseSubsteps.p2.wrapVestibular,
    videos.phaseSubsteps.p2.pressPalate,
    videos.phaseSubsteps.p2.biteOcclusion,
    videos.phaseSubsteps.p2.reAdapt,
  ],
  4: [
    videos.phaseSubsteps.p3.letSet,
    videos.phaseSubsteps.p3.coldDunk,
    videos.phaseSubsteps.p3.trim,
    videos.phaseSubsteps.p3.patientConfirm,
    videos.phaseSubsteps.p3.done,
  ],
};

/** Phase-hero Wistia overview videos — shown above each phase's micro-steps. */
function phaseHeroVideo(phaseNumber: number) {
  switch (phaseNumber) {
    case 1:
      return null; // Heat material — no phase-level overview video
    case 2:
      return videos.phaseHero.one; // Make & place disk
    case 3:
      return videos.phaseHero.two; // Shape on palate
    case 4:
      return videos.phaseHero.three; // Trim & finish
    default:
      return null;
  }
}

export default function FormPage() {
  return (
    <>
      <StepBar
        currentStep="form"
        prevHref={form.nav.prev?.href}
        prevLabel={form.nav.prev?.label}
        nextHref={form.nav.next?.href}
        nextLabel={form.nav.next?.label}
        stepHrefs={{
          setup: "/walkthrough/setup",
          form: "/walkthrough/form",
          apply: "/walkthrough/apply",
        }}
      />

      <PageTimeline
        sections={[
          { id: "form-hero", label: "Overview" },
          { id: "phase-1", label: "A · Heat" },
          { id: "phase-2", label: "B · Shape" },
          { id: "phase-3", label: "C · Mould" },
          { id: "phase-4", label: "D · Trim" },
          { id: "what-to-look-out-for", label: "What to Look Out For" },
        ]}
      />

      <main className="text-brand-navy">
        {/* ── Hero band (azure tint — step colour for Form step) ─────────── */}
        <section id="form-hero" className="border-b border-brand-navy/8 bg-azure">
          <Container size="xl" className="pb-20 pt-28 sm:pb-40 sm:pt-40">
            <div className="flex flex-col gap-10">
              <StepHero description={`Part 2: ${form.hero.lead}`} />
              <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
                <div className="flex min-w-0 flex-1 flex-col">
                  <StepSummary
                    label={form.summary.label}
                    title={form.summary.title}
                    totalTime={form.summary.totalTime}
                    items={form.summary.items}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="overflow-hidden rounded-2xl border-6 border-brand-navy shadow-xl">
                    <WistiaPlayer
                      mediaId={videos.pageHero.form.mediaId}
                      title={videos.pageHero.form.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Sample callout (cream) ────────────────────────────────────── */}
        <section className="border-b border-brand-navy/8 bg-brand-navy">
          <Container size="xl" className="flex flex-col gap-12 py-20 sm:gap-14 sm:py-28">
            <SampleCallout
              title={form.sampleCallout.title}
              cta={form.sampleCallout.cta}
              image={
                <Image
                  src={icons.blister}
                  alt="PerioPlast practice sheet — blister pack."
                  width={160}
                  height={160}
                  className="h-full w-full object-contain p-4"
                  unoptimized
                />
              }
            >
              {form.sampleCallout.body}
            </SampleCallout>
          </Container>
        </section>

        {/* ── Phase sections (cream) ────────────────────────────────────── */}
        {form.phases.map((phase) => {
          const heroVideo = phaseHeroVideo(phase.phaseNumber);
          const decoratedQuickCheck = phase.quickCheck
            ? {
                ...phase.quickCheck,
                items: decorateQuickCheck(phase.phaseNumber, phase.quickCheck.items),
              }
            : undefined;

          const overview = heroVideo
            ? {
                image: (
                  <WistiaPlayer
                    mediaId={heroVideo.mediaId}
                    title={heroVideo.title}
                    fillContainer
                  />
                ),
              }
            : undefined;

          return (
            <Fragment key={phase.phaseNumber}>
              <section
                id={`phase-${phase.phaseNumber}`}
                className="border-b border-brand-navy/8 bg-cream"
              >
                <Container size="xl" className="py-20 sm:py-28">
                  <TabbedPhase
                    phaseNumber={phase.phaseNumber}
                    title={phase.title}
                    time={phase.time}
                    description={phase.description}
                    overview={overview}
                    steps={phase.microSteps.map((step, i) =>
                      toTabbedPhaseStep(
                        step,
                        microStepVideos[phase.phaseNumber]?.[i],
                        phaseThumbnail(phase.phaseNumber, i),
                      ),
                    )}
                    beforeCheck={
                      phase.toFinish ? (
                        <ToFinishCard
                          title={phase.toFinish.title}
                          duration={phase.toFinish.duration}
                        >
                          {phase.toFinish.body}
                        </ToFinishCard>
                      ) : undefined
                    }
                  />
                </Container>
              </section>
              {decoratedQuickCheck && (
                <QuickCheck
                  title={decoratedQuickCheck.title}
                  items={decoratedQuickCheck.items}
                />
              )}
            </Fragment>
          );
        })}

        {/* ── Great stent reference (azure tint) ────────────────────────────── */}
        <section className="border-b border-brand-navy/8 bg-azure">
          <Container size="xl" className="py-20 sm:py-28">
            <GreatStentReference
              title={form.greatStentReference.title}
              description={form.greatStentReference.description}
              items={greatStentItems}
            />
          </Container>
        </section>

        {/* ── What to look out for (azure tint) ─────────────────────────────── */}
        <section id="what-to-look-out-for" className="border-b border-brand-navy/8 bg-azure">
          <Container size="xl" className="py-20 sm:py-28">
            <WhatToLookOutFor
              title={form.whatToLookOutFor.title}
              description={form.whatToLookOutFor.description}
              items={lookoutItems}
            />
          </Container>
        </section>

        {/* ── Extra info + step nav (brand-blue) ───────────────────────── */}
        <section className="bg-brand-blue">
          <Container size="xl" className="flex flex-col gap-16 py-24 sm:py-32">
            <ExtraInfoCard
              label={form.extraInfo.label}
              title={form.extraInfo.title}
              description={form.extraInfo.description}
              items={form.extraInfo.items}
              cta={form.extraInfo.cta}
            />
            <BottomNav
              prev={form.nav.prev}
              next={form.nav.next}
              nextHeroTitle={walkthrough.apply.hero.title}
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

/** Per-step thumbnail per phase — aligns 1:1 with `microStepVideos`. */
function phaseThumbnail(
  phaseNumber: number,
  stepIndex: number,
): CdnImage | undefined {
  const t = phaseThumbnails;
  const map: Record<number, ReadonlyArray<{ src: string; alt: string }>> = {
    1: [
      { src: t.p1.s1, alt: "Heat one sheet of PerioPlast in the cup." },
      { src: t.p1.s2, alt: "Pull the softened material off the forceps." },
    ],
    2: [
      { src: t.p1.s3, alt: "Press the warm material into a thin disk." },
      { src: t.p1.s4, alt: "Sit behind the patient to position the disk." },
      { src: t.p1.s5, alt: "Place the disk on the palate — posterior and buccal." },
    ],
    3: [
      { src: t.p2.s1, alt: "Press the disk firmly onto the occlusal surfaces." },
      { src: t.p2.s2, alt: "Wrap the material around the vestibular sides." },
      { src: t.p2.s3, alt: "Press firmly onto the palate until tightly adapted." },
      { src: t.p2.s4, alt: "Patient bites in full occlusion for 30 seconds." },
      { src: t.p2.s5, alt: "Re-adapt the stent to the palatal contour." },
    ],
    4: [
      { src: t.p3.s1, alt: "Let the stent set in-situ until firm." },
      { src: t.p3.s2, alt: "Dunk the stent in cold water to set harder." },
      { src: t.p3.s3, alt: "Trim any overextensions with scissors." },
      { src: t.p3.s4, alt: "Patient fits the stent and confirms comfort." },
      { src: t.p3.s5, alt: "Final stent — ready for placement." },
    ],
  };
  return map[phaseNumber]?.[stepIndex];
}

function toTabbedPhaseStep(
  step: typeof form.phases[number]["microSteps"][number],
  video: { mediaId: string; title: string } | undefined,
  thumbnail: CdnImage | undefined,
): TabbedPhaseStep {
  return {
    title: step.title,
    bullets: step.bullets,
    video,
    image: thumbnail ? (
      <Image
        src={thumbnail.src}
        alt={thumbnail.alt}
        fill
        sizes="(min-width: 1024px) 38vw, 90vw"
        className="object-cover"
      />
    ) : undefined,
    imageLabel: typeof step.title === "string" ? step.title : undefined,
  };
}

function BottomNav({
  prev,
  next,
  nextHeroTitle,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
  nextHeroTitle?: string;
}) {
  return (
    <nav aria-label="Step navigation (bottom)" className="flex items-stretch gap-4">
      {prev && (
        <Link
          href={prev.href}
          className={buttonStyles("filled-orange", "md")}
        >
          <span aria-hidden="true" className="text-xl font-black">←</span>
          Back
        </Link>
      )}
      {next && <UpNextCard href={next.href} part={3} title={nextHeroTitle ?? next.label} className="flex-1" />}
    </nav>
  );
}