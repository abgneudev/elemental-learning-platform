import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  StepBar,
  VideoDialog,
  WistiaPlayer,
  buttonStyles,
} from "@/components/primitives";
import {
  ExtraInfoCard,
  PageTimeline,
  QuickCheck,
  StepHero,
  StepSummary,
  TabbedPhase,
  UpNextCard,
  type TabbedPhaseStep,
} from "@/components/walkthrough";
import { walkthrough } from "@/lib/content";
import { renderDarkCallouts } from "@/components/walkthrough/render";

const setup = walkthrough.setup;

export const metadata: Metadata = {
  title: `${setup.hero.title.replace(/\.$/, "")} — Elemental Setup`,
  description: setup.hero.lead,
};

export default function SetupPage() {
  return (
    <>
      <StepBar
        currentStep="setup"
        prevHref="/"
        prevLabel="Home"
        nextHref={setup.nav.next?.href}
        nextLabel={setup.nav.next?.label}
        stepHrefs={{
          setup: "/walkthrough/setup",
          form: "/walkthrough/form",
          apply: "/walkthrough/apply",
        }}
      />

      <PageTimeline
        sections={[
          { id: "setup-hero", label: "Overview" },
          { id: "bath-setup", label: "Water Bath" },
          { id: "material-prep", label: "Material Prep" },
        ]}
      />

      <main className="text-brand-navy">
        {/* ── Hero band (azure tint — step colour) ─────────────────────── */}
        <section id="setup-hero" className="border-b border-brand-navy/8 bg-azure">
          <Container size="xl" className="pb-20 pt-28 sm:pb-40 sm:pt-40">
            <div className="flex flex-col gap-10">
              <StepHero description={`Part 1: ${setup.hero.lead}`} />
              <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
                <div className="flex min-w-0 flex-1 flex-col">
                  <StepSummary
                    label={setup.summary.label}
                    title={setup.summary.title}
                    totalTime={setup.summary.totalTime}
                    items={setup.summary.items}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  {setup.hero.wistiaMediaId && (
                    <div className="overflow-hidden rounded-2xl border-6 border-brand-navy shadow-xl">
                      <WistiaPlayer
                        mediaId={setup.hero.wistiaMediaId}
                        title={setup.hero.wistiaTitle ?? setup.hero.title}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── What's in the Starter Kit ────────────────────────────────── */}
        <section className="border-b border-white/10 bg-brand-navy">
          <Container size="xl" className="py-20 sm:py-28">
            <div className="flex flex-col gap-10">
              <p className="font-heading text-lg font-bold text-white sm:text-xl">
                 Starter Kit includes all the essentials to get you started with PerioPlast®:
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                {[
                  "2 boxes of PerioPlast®",
                  "Chairside Water Bath",
                  "Free sample to practice",
                  "Training Materials",
                ].map((label) => (
                  <div key={label} className="flex flex-1 flex-col gap-3">
                    <div className="aspect-[4/3] w-full rounded-xl bg-white/10" />
                    <p className="font-heading text-base font-bold leading-tight tracking-tight text-white">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── Step A: Bath Setup ────────────────────────────────────────── */}
        <section id="bath-setup" className="border-b border-brand-navy/8 bg-cream">
          <Container size="xl" className="py-20 sm:py-28">
            <SetupTabbedSection
              section={setup.details.find((d) => d.id === "bath-setup")!}
              phaseNumber={1}
            />
          </Container>
        </section>

        {/* ── Step B: Material Prep ─────────────────────────────────────── */}
        <section id="material-prep" className="border-b border-brand-navy/8 bg-cream">
          <Container size="xl" className="py-20 sm:py-28">
            <SetupTabbedSection
              section={setup.details.find((d) => d.id === "material-prep")!}
              phaseNumber={2}
            />
          </Container>
        </section>

        {/* ── Extra info + step nav (brand-blue) ───────────────────────── */}
        <section className="bg-brand-blue">
          <Container size="xl" className="flex flex-col gap-16 py-24 sm:py-32">
            <ExtraInfoCard
              label={setup.extraInfo.label}
              title={setup.extraInfo.title}
              description={setup.extraInfo.description}
              items={setup.extraInfo.items?.map((item, i) => ({
                ...item,
                image: (
                  <Image
                    src={`/images/Pat${i + 1}.png`}
                    alt={typeof item.term === "string" ? item.term : ""}
                    fill
                    className="object-contain"
                  />
                ),
              }))}
              cta={setup.extraInfo.cta}
            />
            <BottomNav
              prev={setup.nav.prev}
              next={setup.nav.next}
              nextHeroTitle={walkthrough.form.hero.title}
            />
          </Container>
        </section>
      </main>
    </>
  );
}

function SetupTabbedSection({
  section,
  phaseNumber,
}: {
  section: typeof setup.details[number];
  phaseNumber: number;
}) {
  const description = (
    <>
      {section.lead}
      {section.wistiaMediaId && (
        <div className="mt-3">
          <VideoDialog
            mediaId={section.wistiaMediaId}
            title={section.wistiaTitle ?? section.title}
            buttonLabel="Watch section overview"
          />
        </div>
      )}
    </>
  );

  const steps: TabbedPhaseStep[] =
    section.microSteps?.map((step) => ({
      title: step.title,
      bullets: step.bullets,
      callouts:
        step.callouts && step.callouts.length > 0
          ? renderDarkCallouts(step.callouts)
          : undefined,
      imageLabel: typeof step.title === "string" ? step.title : undefined,
    })) ?? [];

  return (
    <TabbedPhase
      phaseNumber={phaseNumber}
      title={section.title}
      description={description}
      steps={steps}
    >
      {section.quickCheck && (
        <QuickCheck
          label={section.quickCheck.label}
          title={section.quickCheck.title}
          items={section.quickCheck.items}
        />
      )}
    </TabbedPhase>
  );
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
      {next && <UpNextCard href={next.href} part={2} title={nextHeroTitle ?? next.label} className="flex-1" />}
    </nav>
  );
}
