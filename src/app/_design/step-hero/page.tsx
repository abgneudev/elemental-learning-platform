import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StepHero } from "@/components/walkthrough";
import { walkthrough } from "@/lib/content";

export const metadata: Metadata = {
  title: "StepHero — Design",
  description: "Preview surface for the StepHero walkthrough header.",
};

const SURFACE: Record<"setup" | "form" | "apply", string> = {
  setup: "bg-azure",
  form: "bg-azure",
  apply: "bg-azure",
};

export default function StepHeroPreview() {
  return (
    <main className="min-h-screen bg-cream text-brand-navy">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-brand-blue">
            Internal · component preview
          </p>
          <h1 className="mt-2 font-heading text-3xl">StepHero</h1>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/70">
            Above-the-fold header for each walkthrough step. Single bold
            description starting with the step number, followed by the video.
          </p>
        </header>

        <Variant name="A · Setup (azure)" step="setup">
          <StepHero description={`Part 1: ${walkthrough.setup.hero.lead}`} />
        </Variant>

        <Variant name="B · Form (azure)" step="form">
          <StepHero
            description={`Part 2: ${walkthrough.form.hero.lead}`}
          />
        </Variant>

        <Variant name="C · Apply (azure)" step="apply">
          <StepHero description={`Part 3: ${walkthrough.apply.hero.lead}`} />
        </Variant>
      </div>
    </main>
  );
}

function Variant({
  name,
  step,
  children,
}: {
  name: string;
  step: "setup" | "form" | "apply";
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-3 font-heading text-lg text-brand-navy">{name}</h2>
      <div
        className={`rounded-md border border-brand-navy/10 p-6 sm:p-10 ${SURFACE[step]}`}
      >
        {children}
      </div>
    </section>
  );
}
