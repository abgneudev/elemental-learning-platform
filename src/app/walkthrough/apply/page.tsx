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

      <main className="text-brand-navy">
        {/* ── Hero band (azure tint — step colour for Apply) ────────────── */}
        <section className="border-b border-brand-navy/8 bg-azure">
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

        {/* ── Detail sections (cream) ───────────────────────────────────── */}
        <section className="border-b border-brand-navy/8 bg-cream">
          <Container size="xl" className="flex flex-col gap-16 py-20 sm:gap-20 sm:py-28">
            {apply.details.map((section) => (
              <DetailSection key={section.id} section={section} />
            ))}
          </Container>
        </section>

        {/* ── Peer quote (dark navy) ────────────────────────────────────── */}
        <section className="border-b border-white/10 bg-brand-navy">
          <Container size="xl" className="py-20 sm:py-24">
            <PeerQuote
              tone="dark"
              quote={renderQuote(apply.peerQuote.quote)}
              author={apply.peerQuote.author}
            />
          </Container>
        </section>

        {/* ── Extra info + step nav (cream) ─────────────────────────────── */}
        <section className="bg-cream">
          <Container size="xl" className="flex flex-col gap-10 py-20 sm:py-24">
            <ExtraInfoCard
              label={apply.extraInfo.label}
              title={apply.extraInfo.title}
              description={apply.extraInfo.description}
              items={apply.extraInfo.items}
              cta={apply.extraInfo.cta}
            />
            <BottomNav prev={apply.nav.prev} next={apply.nav.next} />
          </Container>
        </section>
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
            className="absolute inset-0 translate-x-2 translate-y-2 rounded-md bg-brand-navy/15"
          />
          <ol className="relative flex flex-col divide-y divide-brand-navy/10 rounded-md border border-brand-navy/15 bg-white p-6 sm:p-9">
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
      className="flex items-center justify-between gap-3 border-t border-brand-navy/10 pt-6"
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
