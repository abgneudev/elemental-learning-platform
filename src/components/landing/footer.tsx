import Link from "next/link";
import { Container } from "@/components/primitives";

/**
 * Site-wide footer. Mounted on the landing page and on every walkthrough
 * lesson so the contact + legal entry points are reachable from anywhere.
 */
export function Footer() {
  return (
    <footer className="border-t border-[#222525]/8 bg-white py-8">
      <Container
        size="xl"
        className="flex flex-col items-start justify-between gap-4 text-sm sm:flex-row sm:items-center"
      >
        <p className="font-heading text-sm font-bold text-brand-navy/70">Elemental</p>
        <p className="text-brand-navy/40">© Elemental. All rights reserved.</p>
        <nav aria-label="Site" className="flex items-center gap-5 text-brand-navy/55">
          <Link href="/contact" className="transition-colors hover:text-brand-navy">
            Contact
          </Link>
          <Link href="/legal/privacy" className="transition-colors hover:text-brand-navy">
            Privacy
          </Link>
          <Link href="/legal/terms" className="transition-colors hover:text-brand-navy">
            Terms
          </Link>
          <Link href="/walkthrough/setup" className="transition-colors hover:text-brand-navy">
            Walkthrough
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
