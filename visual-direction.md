# Visual Direction

**For:** Elemental website redesign
**Audience:** Claude Code, working from `/docs/PRD.md` and this document
**Status:** Authoritative. v2 — supersedes earlier direction.

---

## The direction in one sentence

Bold, confident, editorial — with organic warmth. Cream-dominant pages, weighty headlines, numbered card systems, one strong block accent, delicate line-drawn illustrations as natural-element grace notes. Premium through confidence, not restraint.

---

## References

These four sites define the direction. Pattern-match these specifically — not generic "premium" or "editorial" memes.

| Reference | Specific qualities to absorb |
|---|---|
| **Nervana (nervanapatch.com)** | Cream/sand background as the natural-warmth base. Massive sans-serif headline weight 600–700. Mono small-caps eyebrow with letter-spacing 0.12em. Hairline rule below eyebrow with a dotted leader extending right. Delicate line-drawn organic illustration (botanical/concentric circles) as accent on the right. Asymmetric — text left, illustration right, generous space around. |
| **Mews careers (the interview-process section)** | 4 numbered cards in a horizontal row. Slash-prefix numbering (`/02`, `/03`). One card is the "active" state in a soft fill (their pink → our cyan or mint); others are cream-on-dark or white. Each inactive card has a plus-icon bottom-left signaling expand. Arrow nav (← →) top-right. Eyebrow `INTERVIEW PROCESS` small-caps weight 600. Headline weight 700, large. |
| **Nonstop brand guidelines** | Confident weighty headlines, one strong accent color used as a *filled card stack* (the orange) — not just a text accent. Quote treated as a visual object: stacked orange cards with curly quote marks at the corners as decoration. Subscript numbering (¹ ² ³) inline with text terms — a clever editorial detail. Dot-pagination + arrow nav at the bottom right. |
| **Chrome / "The Web Can Do What"** | Card stack with subtle perspective depth (cards layered, slight rotation, no harsh 3D). Big bold sans-serif headlines on cards. Large underlined text links as primary CTAs ("Show me!", "Next card") — not filled buttons. Friendly, slightly playful, but disciplined — only one accent color (their blue). |

The blend: **Nervana's natural-light base + Mews's numbered card grid + Nonstop's block-color confidence + Chrome's card-stack walkthrough device.** Apply as one direction, not four separate ones.

---

## What this is not

Reject these by default — they show up automatically and the direction dies if they do:

- White rounded cards with drop shadows floating on a colored background (the generic Tailwind card)
- Centered hero with two stacked CTAs side-by-side
- Headlines under 64px on desktop hero
- Headline weight 400 or 500 (this direction is 600–700)
- All-caps marketing eyebrows in saturated brand colors ("INTRODUCING ELEMENTAL")
- Filled colored chips on every label
- Generic Heroicons-style icon set
- Hero illustration on the right of headline-on-left in a contained card with rounded corners
- Mid-page repeated headlines (the same H1 appearing twice within 800px scroll — Claude's default)
- Bullet lists with nested bullets
- Decorative SVG abstractions (geometric shapes, gradients) where line-drawn organic illustration belongs
- Three-CTA navigation pills

If the page resembles a Webflow template, the direction has been missed. If it resembles your references, you're on track.

---

## Six core moves

### 1. Cream is the foundation, not white

The dominant page background is `#f8f6f4` (cream), not white. White appears only inside cards and reference panels. Step pages keep their cyan/mint bookend treatment, but only as a band across the top quarter — the rest of the page returns to cream.

This single move does most of the "natural warmth" work. Without it, the page looks clinical.

### 2. Type is heavy, not elegant

Headlines weight 600–700. Not 500. The references all use confident, weighty type. Hero is 96–128px desktop, 56–72px mobile. Section openers 56–72px. Tight tracking (-0.02em on headlines), tight leading (1.0–1.05).

Source Sans 3 for body works. Open Sans 600–700 for display. If a third typeface is wanted, **GT Walsheim, Söhne, or Inter Display** would match the references better than Open Sans alone — but Open Sans 700 is acceptable for v1.

Eyebrows: 11–12px, monospace if available (otherwise letter-spaced 0.12em uppercase), with a hairline rule directly below. The hairline rule may have a dotted leader extending right (Nervana detail) — this is the kind of editorial flourish that earns its keep.

Numbers: when used to label sequences, use slash-prefix: `/01`, `/02`, `/03`. Not `0.1`, not `01.`, not `Step 1`. The slash is the move.

### 3. Cards are the layout paradigm — but flat ones

Cards organize most of the navigation. Setup / Form the stent / Apply on the landing page render as three horizontal cards in a row, exactly like the Mews interview-process section:

- Each card has a slash-numbered label (`/01`, `/02`, `/03`)
- A weighty headline on each card
- One card is the "featured" state with a soft fill (cyan for Setup, brand-blue for Form, mint for Apply — keeping the bookend treatment)
- The other two are quieter (cream on cream, with hairline border)
- Inactive cards have a `+` icon bottom-left signaling expand-to-enter
- Hover state: card lifts 4px, plus icon rotates to arrow `→`

Inside the Form step, the four phases (Heat / Disk / Shape / Trim) render the same way — four phase cards in a horizontal row, click to expand into the micro-steps inline. Or as a card stack with depth (the Chrome reference) if we want the playful note.

**Card rules:**
- No drop shadows. Flat fills with hairline borders, or soft fills with no border at all.
- No rounded corners larger than 6px. Sharp or near-sharp.
- Generous internal padding (40–56px).
- Equal heights when in a row.

### 4. One bold block accent per page

The references each have one strong color used as a block — Nonstop's orange card stack, Mews's pink active card, Chrome's saturated blue. The accent appears as *a filled region*, not as button colors scattered everywhere.

For us: brand-blue `#0077b6` is the block accent on Form-related moments (the active card on landing, the Form step's hero band). Brand-cyan `#caf0f8` and mint `#d6eedb` are the quieter bookend tints for Setup and Apply moments. Navy `#03045e` is type and primary CTA only.

The rest of the page is cream. The accent appears once or twice per viewport, in big strokes — never as scattered chips.

### 5. Line-drawn organic illustrations as grace notes

The Nervana reference has one delicate line-drawing of a flower with concentric circles. We adopt the same vocabulary — botanical, anatomical, organic line drawings used sparingly:

- A dental arch line-drawing as the hero accent
- A water-bath line-drawing on the Setup card
- A stent shape on the Form card
- A palate cross-section on the Apply card

These are 1–2 stroke-weight line drawings, monochrome (navy on cream), with a delicate dotted-line connector to the related text where it works (Nervana detail).

Until commissioned, leave annotated placeholders: `[line illustration: water bath in cross-section, weight 1.5px, ~280px wide]`. Better than committing to abstract geometric SVG.

### 6. Spacing remains generous

Vertical section padding: 120–200px desktop. Headline-to-body gap: 40–56px. Between-paragraph: 24px. Cards have 56px internal padding. Pages should feel composed, not packed.

The references all breathe. The previous Claude Code output didn't. This is non-negotiable.

---

## Type system (concrete values)

```
hero headline:    112px / line-height 1.0  / weight 700 / tracking -0.025em
section opener:   72px  / line-height 1.05 / weight 700 / tracking -0.02em
card headline:    36px  / line-height 1.1  / weight 700 / tracking -0.015em
sub-section:      28px  / line-height 1.2  / weight 600 / tracking -0.01em
lede paragraph:   22px  / line-height 1.5  / weight 400
body:             17px  / line-height 1.65 / weight 400 / max-width 60ch
small/caption:    14px  / line-height 1.5  / weight 400 / opacity 0.7
eyebrow:          12px  / letter-spacing 0.12em / weight 600 / uppercase
slash number:     14px  / monospace / weight 500 / opacity 0.6
```

Mobile: hero 56px, section 40px, card 28px, body 16px. All other proportions hold.

The big change from v1: weights are 600–700, not 400–500. This direction is bold.

---

## Color application

```
cream:        #f8f6f4   80% of every viewport
white:        #ffffff   inside cards, reference panels
brand-navy:   #03045e   all type, primary CTA only
brand-blue:   #0077b6   ONE card or band per landing (Form active)
brand-cyan:   #caf0f8   Setup card fill, Setup-step top band only
brand-mint:   #d6eedb   Apply card fill, Apply-step top band only
brand-orange: #fc9f5b   WatchOut accent only (3px vertical bar)
brand-green:  #068466   ProTip accent only (3px vertical bar), success states
hairline:     rgba(3,4,94,0.1)   1px rules between sections, card borders
```

**Application rule:** look at the page composition. If you can name 4+ accent colors active on a single viewport, simplify. Each viewport gets cream + navy + one accent color in a block, that's it.

---

## Layout primitives

- **Container max-width:** 1280px. Most content within max 880px. Hero headline can break the column to ~1080px.
- **Side margins:** 32px mobile, 64px tablet, 128–160px desktop.
- **Vertical section padding:** 120–200px desktop, 64–96px mobile.
- **Grid:** 12-column. Most layouts use 7/5 or 8/4 splits, not symmetric 6/6.
- **Cards in rows:** 3 cards across desktop, stack to 1 column on mobile. Equal heights via grid.
- **Hairline rules** (1px solid `var(--hairline)`) for section dividers, card borders, eyebrow underlines.

---

## Component-level specifics (revised)

**Hero (landing):**
Cream background. Top-left: small lowercase wordmark `elemental` and tiny mono nav (`evidence · pricing · walkthrough →`). Headline left at top, 112px, weight 700, max ~3 lines. Below: one-line lede in 22px. Below: a single text-link CTA — large underlined link `Walk through making one →` (Chrome reference). No filled button in the hero. To the right of the headline: a delicate line-drawing illustration (placeholder for now), maybe a stylized palatal arch or stent profile, weight 1.5px, navy on cream, with a dotted leader to the headline.

Below the hero, a full-bleed section with the video — no frame, no rounded corners — taking 100vw, with a quiet `▶` and a tiny mono caption above (`watch · 1:53`).

**EntryCards (landing — the walkthrough entry):**
Three cards in a horizontal row, equal heights. Card 01 (Setup) has cyan fill `#caf0f8`. Card 02 (Form the stent) has brand-blue fill `#0077b6` with white type — this is the page's block accent moment, the "featured" state. Card 03 (Apply) has mint fill `#d6eedb`. Each card:
- `/01` slash number top-left, mono, opacity 0.6
- Card headline (36px, weight 700) middle
- One-line description below headline
- Time chip bottom-left (`~5 min`)
- `+` icon bottom-right that rotates to `→` on hover
- Card lifts 4px on hover, no shadow change (just translate)

**Nav:**
Cream background, lowercase wordmark left, three plain text links right (`evidence`, `pricing`, `walkthrough →`). The walkthrough link is slightly weightier with the arrow. No filled CTA pill. On scroll past the hero, nav gets a hairline bottom border. That's the entire nav treatment.

**StepBar (sticky during walkthrough):**
Same lowercase wordmark left. Center: progress as `/01 setup · /02 form · /03 apply` text-only — current step in navy weight 600, others in opacity 0.4 weight 400. Right: arrow nav `←` `→` as outlined circular buttons (Nonstop reference). No pills, no fill bars. Plain typographic progress.

**StepHero (Setup, Form, Apply):**
Eyebrow `/01 step one` mono, then a hairline rule with dotted leader, then headline 72px weight 700, then a 22px lede. Below the lede: `WhatYouWillLearn` as plain inline links separated by ` · `, not as tiles. To the right of the headline: a single line-drawing illustration relevant to the step.

**StepSummary ("steps at a glance"):**
Not a card. A vertical list. Each item: slash-number left (`/01`), then headline-weight short phrase, then optional one-line detail in muted text. Hairline rule between items, full-width. No fill, no border around the list itself.

**PhaseSection (inside Form):**
Each phase opens with a slash-number eyebrow + 56px headline + time chip far right + horizontal hairline rule. Below: numbered micro-steps in a 2-column flow on desktop, 1-column mobile. Numbers continue (`/01.1`, `/01.2`, `/01.3` — or just `01`, `02`, `03` reset per phase, decide and stick).

Optionally: the four phases inside Form render as a 4-card horizontal row first (like Mews), and clicking one expands the micro-steps inline below. This is the most direct application of the Mews reference.

**QuickCheck:**
Not a card with a fill. Small mono caption left ("when this is right, you'll see"), then a 2-column row of photographs with one-line captions below. Hairlines top and bottom of the block. Photography does the work.

**WatchOut / ProTip:**
Inline with the related step. 3px vertical bar on the left (orange for WatchOut, green for ProTip), body text right of the bar, no background fill. Reads like a margin note in a textbook, not an alert.

**ComparisonGrid (landing):**
4 columns, each column is a card in the new style: slash number top, comparison label (`vs. sutures`), then 3 hairline-separated rows for pre-op / surgical / post-op claims. Active comparison can have the cyan fill, others cream on cream with hairline border.

**Buttons:**
Primary CTA: large underlined text link with arrow `Walk through making one →`, 22px weight 600, navy. The arrow translates 6px right on hover. This replaces filled-button CTAs as the primary.
Where filled buttons must be used (forms, hard CTAs): navy fill, white text, 4px corner radius, 24px vertical / 36px horizontal padding, no shadow.
Quiet/ghost buttons: do not exist. Use text links instead.

---

## Microinteractions (budget = 5)

1. **Card hover lift** — card translates up 4px, `+` icon rotates 45° and morphs to `→`, 240ms ease-out.
2. **Step bar hover** — current step indicator gets weight underline drawing left-to-right, 300ms.
3. **Arrow CTA slide** — `→` translates 6px right on hover, 200ms.
4. **Hairline rule reveal** — when a section enters viewport, its top hairline draws left-to-right over 800ms, once.
5. **Line illustration trace** — line-drawing illustrations stroke-draw on first viewport entry over 1200ms, once. (`stroke-dasharray` + `stroke-dashoffset` animation.)

This is the entire motion vocabulary. No card flips, parallax, scroll-jacking, custom cursors, or scroll-linked color changes. `prefers-reduced-motion` disables all five.

---

## Acceptance test for any page

1. **Grayscale test** — remove all color. Does the page still look composed and editorial? If it falls apart without color, the layout is leaning on color as decoration.
2. **One-block-accent test** — count active accent colors per viewport (any non-cream, non-navy fill). If more than one bold block accent appears, simplify.
3. **Reference test** — compared to Nervana, Mews, Nonstop, Chrome — does this clearly belong to that family? Or to a Webflow template family?
4. **Weight test** — are all headlines weight 600–700? Any headline at weight 400–500 fails the direction.
5. **Card test** — where cards exist, do they have flat fills, no shadows, slash numbering, generous padding?

If a page fails any of these, do not ship it. Iterate.

---

## How to use with Claude Code

For every page or component task, the prompt explicitly references this document:

> *"Read `/docs/visual-direction.md` v2 and apply it. The references are Nervana, Mews, Nonstop, and Chrome — match those specifically. Reject the patterns in 'What this is not.' Apply the six core moves and the component-level specifics. Show me one screenshot before continuing past the hero."*

When Claude proposes a layout that violates the direction, point to the specific section it violates. The first attempt will likely still pull toward generic. The second usually lands closer. The third gets there.

If the third attempt still misses, we move to Figma and design 2–3 frames by hand.
