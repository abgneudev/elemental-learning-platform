import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/primitives";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { CONTACT_EMAIL_TODO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Elemental",
  description:
    "Get in touch with the Elemental team about the Starter Kit, clinical questions, or ordering.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="bg-white text-brand-navy">
        <section
          aria-labelledby="contact-title"
          className="border-b border-brand-navy/8 bg-azure"
        >
          <Container
            size="xl"
            className="flex flex-col gap-8 pb-24 pt-32 sm:pb-32 sm:pt-40"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 flex-none bg-brand-blue" />
              <Eyebrow tone="blue" size="md">Contact</Eyebrow>
            </div>
            <h1
              id="contact-title"
              className="max-w-3xl font-heading text-step-mobile-lg leading-[1.05] tracking-tighter text-brand-navy sm:text-step-desktop-lg"
            >
              Talk to the Elemental team.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-brand-navy/70">
              Questions about the Starter Kit, clinical protocol, or billing? Email us
              and we&apos;ll respond within one working day.
            </p>
            <div>
              <a
                href={`mailto:${CONTACT_EMAIL_TODO}`}
                className="inline-flex items-center gap-1.5 font-heading text-lg font-semibold text-brand-navy underline underline-offset-4 decoration-1 decoration-brand-navy/40 transition-colors hover:decoration-brand-navy"
              >
                {CONTACT_EMAIL_TODO}
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
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
