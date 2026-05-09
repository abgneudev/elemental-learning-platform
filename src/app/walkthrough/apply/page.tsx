import type { Metadata } from "next";
import Link from "next/link";
import { clsx } from "clsx";
import {
  Container,
  Eyebrow,
  StepBar,
  WistiaPlayer,
  buttonStyles,
} from "@/components/primitives";
import {
  ExtraInfoCard,
  PeerQuote,
  QuickCheck,
  StepHero,
  StepSummary,
  WhatYouWillLearn,
} from "@/components/walkthrough";
import { walkthrough } from "@/lib/content";
import {
  renderCallouts,
  renderQuote,
} from "@/components/walkthrough/render";

const apply = walkthrough.apply;

export const metadata: Metadata = {
  title: `${apply.hero.title.replace(/\.$/, "")} — Elemental Apply`,
  description: apply.hero.lead,
};

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

      <main className="bg-[#f8f6f4] text-brand-navy">
        <Container size="xl" className="flex flex-col gap-12 py-12 sm:gap-16 sm:py-16">
          <StepHero
            step="apply"
            eyebrow={apply.hero.eyebrow}
            title={apply.hero.title}
            lead={apply.hero.lead}
            time={apply.hero.time}
            illustration={
              apply.hero.wistiaMediaId ? (
                <WistiaPlayer
                  mediaId={apply.hero.wistiaMediaId}
                  title={apply.hero.wistiaTitle ?? apply.hero.title}
                  aspect="4x3"
                />
              ) : undefined
            }
          />

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex flex-1 min-w-0 flex-col">
              <WhatYouWillLearn items={apply.whatYouWillLearn} />
            </div>
            <div className="flex flex-1 min-w-0 flex-col">
              <StepSummary
                label={apply.summary.label}
                title={apply.summary.title}
                description={apply.summary.description}
                totalTime={apply.summary.totalTime}
                items={apply.summary.items}
              />
            </div>
          </div>

          <div className="flex flex-col gap-12 sm:gap-16">
            {apply.details.map((section) => (
              <DetailSection key={section.id} section={section} />
            ))}
          </div>

          <PeerQuote quote={renderQuote(apply.peerQuote.quote)} author={apply.peerQuote.author} />

          <ExtraInfoCard
            label={apply.extraInfo.label}
            title={apply.extraInfo.title}
            description={apply.extraInfo.description}
            items={apply.extraInfo.items}
            cta={apply.extraInfo.cta}
          />

          <BottomNav prev={apply.nav.prev} next={apply.nav.next} />
        </Container>
      </main>
    </>
  );
}

function DetailSection({ section }: { section: typeof apply.details[number] }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="scroll-mt-24"
    >
      <header className="flex flex-col gap-3">
        {section.eyebrow && (
          <Eyebrow tone="blue" size="md">
            {section.eyebrow}
          </Eyebrow>
        )}
        <h2
          id={`${section.id}-title`}
          className="font-heading text-2xl font-semibold leading-tight text-brand-navy sm:text-3xl"
        >
          {section.title}
        </h2>
        {section.lead && (
          <p className="max-w-prose text-base leading-snug text-brand-navy/75">
            {section.lead}
          </p>
        )}
      </header>

      {section.wistiaMediaId && (
        <div className="mt-6">
          <WistiaPlayer
            mediaId={section.wistiaMediaId}
            title={section.wistiaTitle ?? section.title}
          />
        </div>
      )}

      {section.microSteps && section.microSteps.length > 0 && (
        <div className="relative mt-8">
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-2 translate-y-2 rounded-md bg-[#03045e]/15"
          />
          <ol className="relative flex flex-col divide-y divide-[#222525]/10 rounded-md border border-[#222525]/15 bg-white p-6 sm:p-9">
            {section.microSteps.map((step, idx) => (
              <li
                key={step.index}
                className={clsx(
                  "grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-2 sm:gap-x-6",
                  idx === 0
                    ? "pb-5 sm:pb-6"
                    : idx === section.microSteps!.length - 1
                      ? "pt-5 sm:pt-6"
                      : "py-5 sm:py-6",
                )}
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex flex-none items-baseline font-mono text-xs font-semibold tracking-eyebrow text-brand-blue"
                >
                  / {step.index}
                </span>
                <p className="font-heading text-base font-medium leading-snug text-brand-navy sm:text-lg">
                  {step.title}
                </p>
                {step.bullets && step.bullets.length > 0 && (
                  <ul className="col-start-2 flex list-disc flex-col gap-1 pl-4 text-sm leading-snug text-brand-navy/80 marker:text-brand-navy/35">
                    {step.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
                {step.callouts && step.callouts.length > 0 && (
                  <div className="col-start-2 mt-1 flex flex-col gap-3">
                    {renderCallouts(step.callouts)}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      {section.quickCheck && (
        <div className="mt-6">
          <QuickCheck
            label={section.quickCheck.label}
            title={section.quickCheck.title}
            items={section.quickCheck.items}
          />
        </div>
      )}
    </section>
  );
}

function BottomNav({
  prev,
  next,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <nav
      aria-label="Step navigation (bottom)"
      className="flex items-center justify-between gap-3 border-t border-[#222525]/10 pt-6"
    >
      {prev ? (
        <Link href={prev.href} className={buttonStyles("quiet", "md")}>
          <span aria-hidden="true">←</span>
          <span>{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className={buttonStyles("primary", "md")}>
          <span>{next.label}</span>
          <span aria-hidden="true" className="arrow">→</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
