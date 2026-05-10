# Elemental Website — Technical PRD

**Project:** Elemental Online Learning Platform redesign
**Document version:** v1.2 (draft, post Phase 3 feedback + page-by-page content extraction)
**Owner:** Abhinav Gupta (Frontend & Design Engineering)
**Reviewers:** Lisette Gonzalez (UX), Thao Vu (Learning Design), Ciarán Crawley (Accessibility)
**Status:** Draft for team review — informs Phase 4 build
**Related:** `Phase3_Feedback_Response.docx`, `Elemental_Content_Extraction.md`

**Changes from v1.1**
- Walkthrough restructured from four steps to three: **Setup → Form the stent → Apply**.
- Component inventory rebuilt around patterns confirmed from the live site (QuickCheck, ProTip, WatchOut, GreatStentReference, ToFinishCard, WhatYouWillLearn, WhatToLookOutFor).
- New §6 **Content Architecture** documents four cross-cutting content categories (Prep / Implement / Clinical impacts / Business impacts) salvaged from the rejected onboarding-quiz research.
- Color tokens updated to reflect the bookend treatment (light cyan setup, saturated blue form, light mint apply).
- Time estimates updated to reflect the real procedure (~15 minutes total walkthrough, not ~5).
- Section naming aligned to the Phase 3 commitment: `PerioPlast®` for the material, `Elemental stent` for the artifact.

---

## 1. Overview

A custom-coded replacement for the existing Webflow site at `withelemental.com`. Single-page marketing site plus an interactive three-step procedural walkthrough teaching clinical teams how to use the Elemental palatal stent.

The new build addresses three documented failures of the current platform: poor performance (Lighthouse 37), 117 accessibility issues across 5 core patterns, and an information architecture not designed for time-constrained clinicians.

The live site has strong didactic content (step-list summaries, quick-checks, pro-tips, watch-outs, sample integration, reference criteria). The redesign's primary job is to rebuild the **lesson-page template** around these patterns — surfacing them visually instead of burying them inside long-form Webflow pages. The four-page sequence on the live site collapses into a clean three-step shape: setup as preamble, form as the heavy middle, apply as resolution.

## 2. Goals

- Communicate product value to a periodontist in under 60 seconds on the landing page.
- Walk a clinical team through Setup, Form the stent, and Apply in about 15 minutes total — with an option to skim summaries in 3.
- Achieve Lighthouse ≥ 90 across all four metrics (current site: 37 Performance).
- Conform to WCAG 2.2 AA.
- Be operable by the client for routine content updates without developer involvement.

## 3. Non-goals (out of scope for v1)

- Authentication or user accounts.
- E-commerce or direct ordering (link out to existing channel).
- Multi-language (English only).
- Blog, news, or events feed.
- Server-side functionality of any kind.
- Video hosting (embed from existing Wistia source).
- Onboarding quiz / persona-gating mechanism (rejected per Phase 3 feedback).

## 4. Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | Static export, large community, easy handover to another dev |
| Language | TypeScript (strict) | Type safety reduces post-handover bug class |
| Styling | Tailwind CSS | Tokens-as-classes, no separate stylesheet drift |
| Fonts | Open Sans + Source Sans 3 via `next/font` | Self-hosted, no external request, font-loading-optimized |
| Animation | CSS transitions + Framer Motion | Framer Motion only where CSS can't reach (step transitions) |
| Content | MDX files in `/content` directory | Human-editable, lives in version control |
| Video | Wistia embeds (existing source) | Reuses the live site's video assets without re-hosting |
| Hosting | Vercel | Static CDN, automatic SSL, GitHub-integrated deploys |
| Analytics | Plausible (recommended) or GA4 | Privacy-first, simpler dashboard, EU-friendly |

**Open question:** Headless CMS (Sanity / Contentful / Tina) deferred — recommend MDX for v1, evaluate after 60 days of client use.

## 5. Pages & Routes

```
/                              landing page (single page, anchor scroll)
/walkthrough                   three-step interactive walkthrough (entry)
/walkthrough/setup             step 1: water bath setup
/walkthrough/form              step 2: form the stent (4 internal phases)
/walkthrough/apply             step 3: apply during surgery
/reference/cleaning            cleaning protocol (learn-once reference)
/reference/great-stent         "what makes a great stent" criteria
/reference/patient-handoff     post-op patient instructions
/legal/privacy                 (placeholder)
/legal/terms                   (placeholder)
404, 500                       custom error pages matching brand
```

**Route notes:**
- Walkthrough steps are individually URL-routed so they're shareable and the browser back button works as users expect.
- Reference pages are extracted from the walkthrough deliberately — they're consulted, not progressed through. Surfacing them as their own URLs lets a returning user bookmark `/reference/cleaning` without navigating the walkthrough.

## 6. Content Architecture

The live site interleaves four kinds of content within each page. Naming them as cross-cutting categories — separate from the walkthrough sequence — gives the redesign two affordances: clean page composition, and optional curated entry paths on the landing page.

| Category | What it covers | Where it surfaces |
|---|---|---|
| **Prep** | Bath setup, kit unboxing, cleaning protocol | Walkthrough step 1 (Setup), reference pages |
| **Implement** | Heat the cubes, form the stent, surgical application, patient handoff | Walkthrough steps 2–3 (Form, Apply) |
| **Clinical impacts** | Why it works, scientific evidence, KOL endorsements | Landing page, in-context peer quotes per step |
| **Business impacts** | Workflow upgrades, profitability, billing codes | Landing page, Apply-step extra-info card |

These categories were extracted from the now-rejected onboarding-quiz research. The quiz mechanism itself is not built (Phase 3 feedback). What survives is the underlying classification, used for:

- **Optional curated entry paths** on the landing page (e.g., "If you're evaluating," "If you're new to PerioPlast," "Quick refresher") that link directly to the relevant subset. These are *invitations*, not gates — the user can ignore them and start the walkthrough linearly.
- **In-context peer quotes** on each walkthrough step pulled from the "Clinical impacts" pool, addressing the Phase 3 feedback that KOL content was buried in the live site.
- **Cleaning protocol as a discrete reference**, not a buried Setup sub-section — its access pattern (learn-once, consult-often) is different from the rest of the procedural content.

## 7. Component Inventory

**Landing**
- `Nav`, `Hero`, `IntroSection`, `ValueProps` (the three "no" cards: no suturing, no pain, no impressions).
- `ComparisonGrid` — four `ComparisonCard` instances (vs sutures, vs vacuum-form, vs lab-made, vs perio glue). Each card renders three rows: pre-op, surgical, post-op. *Status: card structure built, copy is placeholder pending clinical sign-off.*
- `KOLEndorsements` — six clinician portraits (live site supplies real names: Hürzeler, Sculean, Frazão, Hamada, Rasperini, Zadeh). Photos pending.
- `ScientificEvidence` — links to peer-reviewed literature. Live site cites Clinical Oral Investigations, July 2023.
- `CuratedPaths` (optional, see §6) — three entry-shortcut tiles, linking to subsets of content. Skippable.
- `Reviews`, `StatsBlock`, `FooterCTA`, `Footer`.

**Walkthrough — shared scaffolding**
- `StepLayout` — wraps each step.
- `StepBar` — sticky top bar with logo, step indicator, progress pills, back button, next button. Position: sticky. **Middle pill is wider than the bookends** to signal the Form step's primacy.
- `StepHero` — accepts `title`, `lead`, `eyebrow`, `time`, `illustration`. Time chip is required. **Form step uses a one-tier-larger title size** to claim visual weight against the bookends.
- `WhatYouWillLearn` — 2–4 anchor-link tiles at the top of a step, listing the major sub-sections (mirrors the live site's pattern on every page).
- `StepSummary` — "Steps at a glance" card with 3–6 chronological items, scannable in under 30 seconds. Required on every step.
- `StepNav` — bottom prev/next controls (paired with the sticky top bar).

**Walkthrough — content patterns (named, reusable)**
- `QuickCheck` — two-up confirmation card showing what success looks like (image + caption). Appears at phase boundaries inside the Form step and at the end of Setup and Apply. Confirmed pattern from live site pages 2 and 3.
- `ProTip` — inline tip next to a specific step, helpful guidance (e.g., "tap water saves heating time"). Light visual treatment.
- `WatchOut` — inline warning next to a specific step, critical to avoid error (e.g., "Apply Vaseline on gloves to prevent sticking"). Stronger visual treatment with the orange accent.
- `SampleCallout` — physical-sample affordance with blister-pack icon and prompt copy ("Use the free sample to make your 1st stent"). Renders at the top of the Form step. Couples digital walkthrough to the physical Starter Kit.
- `GreatStentReference` — 4-criteria reference card. The four criteria from the live site: bite function, tight palatal adaptation, stable retention, thin (~2 mm). Each criterion has a reference photo and a one-line caption. Renders inside the Form step after the procedural phases.
- `WhatToLookOutFor` — 4-card warning grid (e.g., "Make the stent before numbing the palate"). Renders inside the Form step. Live site pattern from page 3.
- `ToFinishCard` — green-styled terminal card marking the close of a phase or section ("Keep closed for 1–2 minutes & remove once solid"). Confirmed pattern from live site pages 2 and 3.
- `PeerQuote` — in-context peer voice. One per step, contextually relevant. Replaces the buried "practitioner tips" sub-page in the original IA.
- `ExtraInfoCard` — dense reference info specific to each step (cleaning protocol mention, precautions, patient handoff). Lighter background tint than the step background, to read as an inset reference.
- `PhaseSection` (Form step only) — section wrapper for one of the four phases inside Form. Renders the phase number, title, time chip, micro-step list, callouts, and quick-check. Stacked vertically; no internal sub-stepper.

**Shared primitives**
- `Button` (primary, quiet, ghost variants)
- `Eyebrow`, `Card`, `Container`, `SectionHeader`
- `WistiaPlayer` — wraps the existing Wistia embeds with a consistent skin

## 8. Design System

Tokens documented in `/design-tokens.md` and mirrored in `tailwind.config.ts`.

**Colors** (existing brand palette, applied with bookend treatment to walkthrough)
```
brand-navy:   #03045e   text, dark CTAs
brand-blue:   #0077b6   Form step background (saturated middle)
brand-green:  #068466   accent (To-finish cards, success states)
brand-cyan:   #caf0f8   Setup step background (light bookend)
brand-mint:   #d6eedb   Apply step background (light bookend)
brand-orange: #fc9f5b   warning/watch-out accent
cream:        #f8f6f4   landing page background
```

**Bookend treatment rationale.** Setup and Apply are visually familiar pre/post moments for any clinician — they read as preamble and resolution. The Form step is where the technique-sensitive work lives. Using two muted bookends (cyan, mint) and one saturated middle (blue) creates an asymmetry that signals "this is where the attention belongs," without text or labels having to do that work.

**Typography**
- Headings: Open Sans 600, tight letter-spacing
- Body: Source Sans 3 400/500
- **Form step title is one tier larger** than Setup and Apply titles (60px vs 52px desktop, 36px vs 32px mobile)
- Modular scale documented in `/design-tokens.md`

**Motion**
- Step transitions: 220ms slide-out + 320ms slide-in (cubic-bezier .2,.8,.2,1)
- All other transitions: 200ms ease
- `prefers-reduced-motion: reduce` → all transitions become opacity-only, no transforms

## 9. Content Editability Model

Three tiers, communicated to the client at handover.

**Tier 1 — client-editable (no developer needed)**
Copy in any section, image swaps, testimonial text, stat numbers, walkthrough step copy, summary bullets, time estimates, peer quotes, comparison-card claims, sample-callout body text, extra-info-card content, micro-step lists inside Form's four phases. Editable via MDX files in `/content/`, with documented schemas per content type.

**Tier 2 — request-based (developer-assisted)**
Adding a new landing section, adding a fifth phase to the Form step, color changes, layout adjustments, adding a new comparison card, repositioning the sticky bar, adding a new reference page. Documented patterns in handover doc.

**Tier 3 — locked**
Walkthrough step count (three: Setup, Form, Apply), the bookend color treatment, transition animations, design system tokens, sticky-bar interaction model, the four criteria of `GreatStentReference`. These define the product's design integrity and should not change post-launch without redesign.

## 10. Walkthrough / Lesson Page Pattern

This pattern is mandatory for every step. It directly addresses the lesson-page issues in the Phase 3 feedback (slides 13–15) and the 32-minute-pathway problem (slide 8).

**Above the fold (every step):**
- Step indicator + per-step time estimate
- Step title and one-line lead
- Step illustration
- `WhatYouWillLearn` anchor tiles
- `StepSummary` "Steps at a glance" card (3–6 items, scannable in under 30 seconds)
- Sticky bar visible at top with progress pills, back, and next — Next is always reachable without scrolling

**Below the fold — Setup and Apply (in order):**
1. Detail sections (one or two with text + media)
2. `ProTip` and `WatchOut` callouts inline with detail sections
3. `QuickCheck` confirming the step is complete
4. `PeerQuote` (contextual)
5. `ExtraInfoCard` (dense reference content specific to that step)
6. Bottom prev/next controls

**Below the fold — Form (in order):**
1. `SampleCallout` (top — couples to physical sample)
2. **Four `PhaseSection` blocks stacked vertically:**
   - Phase 1: Heat the material (~2 min, 6 micro-steps)
   - Phase 2: Make and place the disk (~1 min, 5 micro-steps)
   - Phase 3: Shape on the palate (~1 min, 5 micro-steps)
   - Phase 4: Trim and finish (~1–2 min, 5 micro-steps)
   Each phase contains its micro-step list, one or two `WatchOut`/`ProTip` callouts, and a closing `QuickCheck`.
3. `GreatStentReference` (4-criteria self-check appears after the phases — used to evaluate the result)
4. `WhatToLookOutFor` (4-card warning grid)
5. `PeerQuote`
6. `ExtraInfoCard` (precautions)
7. Bottom prev/next controls

**Time estimates per step (v1):**

| Step | Estimate | Composition |
|---|---|---|
| Setup | ~5 min | Mostly waiting for the bath to steam |
| Form the stent | ~5–7 min | Active procedure: heat → disk → shape → trim |
| Apply | during the surgery | Surgical placement + patient handoff |

**Step-list-first principle.** The summary card is the canonical short version of the step. A returning user should be able to read only the summary and proceed. Detail sections expand on each summary item and are optional reading. This is the architectural answer to the "quick reference mode" raised in Phase 3 slide 5 — built into every step rather than as a separate mode.

## 11. Performance Targets

| Metric | Target | Current site |
|---|---|---|
| Lighthouse Performance | ≥ 90 | 37 |
| Largest Contentful Paint | < 2.5s | TBD |
| Cumulative Layout Shift | < 0.1 | TBD |
| Interaction to Next Paint | < 200ms | TBD |
| Initial JS bundle | < 100KB gzipped | TBD |
| Total page weight (initial) | < 500KB | TBD |

**Implementation requirements**
- Images via `next/image` with WebP/AVIF, lazy-loaded
- Fonts: subset, preload, `font-display: swap`
- No external scripts on first paint (analytics deferred)
- SVG illustrations inlined to avoid request overhead
- Wistia embeds use lazy iframe loading (defer until step is in viewport)

## 12. Accessibility Requirements (WCAG 2.2 AA)

- Keyboard-navigable end-to-end; tab order matches visual order
- Focus indicators visible on all interactive elements (3:1 contrast minimum)
- Color contrast: 4.5:1 body text, 3:1 large text and UI
- Step progress communicated via aria-live region, not color alone
- ARIA labels for all icon-only buttons
- Reduced-motion alternative for all animated transitions
- Screen-reader tested: NVDA (Windows), VoiceOver (macOS, iOS)
- Skip-to-content link in nav
- Heading hierarchy: one h1 per page, no skipped levels
- Each `PhaseSection` inside Form is its own landmark with appropriate heading level

**Verification:** axe DevTools clean, manual keyboard sweep, two screen-reader passes. Documented in accessibility conformance report at handover.

## 13. Browser & Device Support

- Chrome, Safari, Firefox, Edge — latest 2 versions
- iOS Safari 15+, Android Chrome 100+
- No IE11
- Tested viewports: 360px, 768px, 1024px, 1280px, 1440px

## 14. SEO

- Per-page meta title and description
- Open Graph + Twitter card images for landing and walkthrough entry
- Schema.org `MedicalDevice` markup on landing
- `robots.txt` + auto-generated `sitemap.xml`
- Canonical URLs
- Lighthouse SEO ≥ 95

## 15. Analytics

**Recommended:** Plausible Analytics (privacy-first, no cookie banner needed in most jurisdictions, ~1KB script).

**Events to track**
- `cta_walkthrough_clicked` (which CTA: hero, footer, curated-path tile)
- `walkthrough_started`
- `step_viewed` (Setup, Form, Apply)
- `phase_viewed` (Form-step phases 1–4)
- `walkthrough_completed`
- `walkthrough_exited` (at which step or phase)
- `reference_page_viewed` (cleaning, great-stent, patient-handoff)
- `external_link_clicked` (ordering, contact, etc.)

**Not tracked:** any personally identifiable information.

## 16. Hosting & Deployment

- **Hosting:** Vercel (free tier sufficient — under 100GB bandwidth and 100k invocations/mo)
- **Domain:** managed via Vercel DNS or external (decision: TBD)
- **SSL:** automatic via Vercel
- **CDN:** Vercel global edge network
- **Deploy:** GitHub `main` branch → auto-deploy
- **Previews:** every PR gets a preview URL
- **Rollback:** instant, via Vercel dashboard
- **Uptime SLA:** Vercel target 99.99%

## 17. Repository & Handover

- Private GitHub repo, client team invited as collaborators
- `README.md` with: setup, deployment, file structure, common edit patterns
- `CONTENT_EDITING.md` with screenshots showing where to edit each tier-1 element
- Loom walkthrough video (5–10 min) recording the most common client edits
- `/design-tokens.md` documenting colors, typography, spacing, motion
- Final accessibility conformance report (per Phase 4 contract deliverable)

## 18. Acceptance Criteria

The build is accepted when:
- Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO
- Zero axe DevTools critical or serious issues
- Manual cross-browser pass on Chrome, Safari, Firefox, Edge
- Manual device pass on iPhone, Android, iPad, desktop
- Client successfully completes 5 representative content edits without developer help, on a recorded session
- Walkthrough completes start-to-finish without errors on 3 representative devices
- Content audit complete: every typo from the live site cleaned in the migration (see §19)

## 19. Risks & Open Questions

| Risk / Question | Status | Owner |
|---|---|---|
| Comparison claims (vs sutures, vacuum-form, lab-made, perio glue) need clinical sign-off | Pending product team review of placeholder copy | Client |
| Real KOL quotes per step (currently anonymized placeholders) | Pending KOL outreach | Client |
| Real clinical figures (5 min bath heat, 80°C, 2mm finished stent, ~5–7 min Form time) verified against extracted live-site values | Reconciled in v1.2 from `Elemental_Content_Extraction.md`; requires final product-team confirmation | Client |
| Photography to replace abstract SVG illustrations on hero and step illustrations | Pending direction (Phase 3 feedback slide 13) | Lisette |
| Physical-sample illustration / photo for the SampleCallout on Form step | Pending content from product team | Client |
| `GreatStentReference`: photographs of the four criteria reference shapes (live site already has these) | Reuse from live site, pending licensing confirmation | Client |
| `WhatToLookOutFor`: photographs of the four anti-pattern shapes (live site has these) | Reuse from live site, pending licensing confirmation | Client |
| MDX vs headless CMS for content editing | Recommend MDX for v1; revisit at +60 days | Abhinav |
| Domain: subdomain vs full migration from Webflow | Pending client decision | Client |
| Search functionality (Phase 3 slide 5 feedback) | Step-list-first principle + reference pages address majority of cases; full search deferred to v2 | Abhinav |
| EU cookie banner if Plausible deemed insufficient | Pending legal review | Client |
| Translation / i18n | Deferred to v2 | — |
| Live-site copy bugs to clean before migration: "Pull material **of** the forceps" (p2 §1.7), "**Making Making** PerioPlast® mouldable" (p2 mobile header), "granules will start to **clit** together" (p3 §1.1), "Gently **the press** the material" (p3 §1.3 desktop), "Take it out **the** stent" (p3 §3.1 mobile), section #4 mislabeled as #3 in p4 mobile, "How Elemental upgrades your **worfklow**" (nav), multiple "Patients **wears**" (should be "wear") | Logged in content audit; requires client cleanup before content migration | Abhinav (audit) + Client (cleanup) |
| Module 2 testing scope — Phase 4 currently scoped to test Module 1 + entry surface only; full Module 2 validation requires contract amendment (Option B in feedback response) | **Open — direct conversation requested** before Phase 4 kickoff | Client + Lisette |
| Curated paths on landing — should they ship in v1 or v2? They're an enhancement on linear navigation, not a replacement | Recommend v1 with three paths, ignorable; revisit at +30 days based on analytics | Abhinav |
| Cleaning protocol surfacing — currently planned as `/reference/cleaning` standalone page, with a small in-context card on Setup linking to it | Recommended approach; needs Lisette sign-off | Lisette |
| KOL slot on landing — six clinicians from live site (Hürzeler, Sculean, Frazão, Hamada, Rasperini, Zadeh). Need authorized headshots, written quotes, and consent for digital use | Pending | Client |

## 20. Process: feedback tracking

Per the Phase 3 feedback response document, every piece of client feedback from this point forward is logged in a shared tracker with one of four statuses:
- **Addressing** — committed within current scope
- **Partially addressing** — partial commitment with documented remainder
- **Deferring** — with stated rationale
- **Disagreeing** — with rationale, surfaced for direct conversation

Each check-in opens with the tracker, going line by line through any open items before new design work is presented.

## 21. Out-of-scope explicit list (for clarity at handover)

- Account creation, login, password reset
- Onboarding quiz / persona-gating mechanism (rejected per Phase 3)
- Search functionality (deferred to v2)
- Comments, reviews submission, user-generated content
- Newsletter signup with email backend (link out only, or static form to client's existing tool)
- Live chat
- Multi-tenant or multi-region deployment

---

**Next steps**
1. Team review of this PRD against the Phase 3 feedback response document and the page-by-page extraction (Lisette, Thao, Ciarán).
2. **Decision on Module 2 testing scope** (Option A vs Option B) before Phase 4 kickoff.
3. Lock remaining open questions in §19 with client input at next check-in.
4. Source real content for placeholder slots: KOL quotes, comparison claims, peer quotes, photography, scientific evidence references.
5. Confirm reuse rights for live-site photography (criteria reference, anti-pattern grid, video stills).
6. Set up repo and Vercel project before Phase 4 build begins.
