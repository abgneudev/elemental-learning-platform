/**
 * Content source for the marketing landing and the three-step walkthrough.
 *
 * MDX is deferred (PRD §4 — re-evaluated after +60 days based on what the
 * client actually edits). For v1 the same shape ships as a typed object so:
 *   - copy lives in one place,
 *   - TypeScript guards the structure,
 *   - migrating to MDX later changes the transport, not the shape.
 *
 * Every string here was sourced from `Elemental_Content_Extraction.md` —
 * the page-by-page extraction of the live site at `withelemental.com`.
 * Content typos flagged in PRD §19 have been cleaned in transcription.
 */

import type { StepKey } from "@/components/primitives";
import type {
  GreatStentCriterion,
  PeerQuoteAuthor,
  QuickCheckItem,
  StepSummaryItem,
  WhatToLookOutForItem,
  ExtraInfoItem,
  ExtraInfoCta,
} from "@/components/walkthrough";

/* ---------- Shared shapes --------------------------------------------------- */

export type StepHeroContent = {
  title: string;
  lead: string;
  /** Optional Wistia media id for an embedded hero video. */
  wistiaMediaId?: string;
  /** Required when `wistiaMediaId` is set — the SR title. */
  wistiaTitle?: string;
};

export type StepSummaryContent = {
  /** Optional eyebrow override — defaults to "Steps at a glance". */
  label?: string;
  /** Optional headline override — defaults to "Steps at a glance". */
  title?: string;
  /** Optional total-time chip rendered next to the title. */
  totalTime?: string;
  items: StepSummaryItem[];
};

export type CalloutContent =
  | { kind: "pro-tip"; title?: string; body: string }
  | { kind: "watch-out"; title?: string; body: string };

export type DetailMicroStep = {
  /** Numbered like #1.2 on the live site. */
  index: string;
  title: string;
  bullets?: string[];
  callouts?: CalloutContent[];
};

export type DetailSection = {
  /** Anchor id — matches the `WhatYouWillLearn` href. */
  id: string;
  /** Eyebrow above the section title. */
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Optional Wistia hero video for the section. */
  wistiaMediaId?: string;
  wistiaTitle?: string;
  microSteps?: DetailMicroStep[];
  /** Optional closing QuickCheck — present after a section completes. */
  quickCheck?: { title?: string; label?: string; items: QuickCheckItem[] };
};

export type PeerQuoteContent = {
  /** Single string for a one-liner; array of strings for a multi-paragraph quote. */
  quote: string | readonly string[];
  /** Author block. Photo lives outside the data shape (real headshots are
   *  pending licensing per PRD §19) — the InitialsAvatar fallback handles it. */
  author?: Omit<PeerQuoteAuthor, "photo">;
};

export type ExtraInfoContent = {
  label?: string;
  title: string;
  description?: string;
  items?: ExtraInfoItem[];
  cta?: ExtraInfoCta;
};

export type PhaseMicroStepContent = {
  title: string;
  bullets?: string[];
  callouts?: CalloutContent[];
};

export type PhaseContent = {
  phaseNumber: number;
  title: string;
  time?: string;
  description?: string;
  microSteps: PhaseMicroStepContent[];
  /** Optional terminal "to finish" card rendered after the micro-steps. */
  toFinish?: {
    title: string;
    duration?: string;
    body?: string;
  };
  /** Closing QuickCheck — every phase ends with one per PRD §10. */
  quickCheck?: { title?: string; items: QuickCheckItem[] };
};

export type StepNavLink = { href: string; label: string };

export type StepNav = {
  prev?: StepNavLink;
  next?: StepNavLink;
};

/* ---------- Step-shaped content -------------------------------------------- */

export type SetupContent = {
  step: Extract<StepKey, "setup">;
  hero: StepHeroContent;
  summary: StepSummaryContent;
  details: DetailSection[];
  peerQuote: PeerQuoteContent;
  extraInfo: ExtraInfoContent;
  nav: StepNav;
};

export type FormContent = {
  step: Extract<StepKey, "form">;
  hero: StepHeroContent;
  summary: StepSummaryContent;
  sampleCallout: {
    title: string;
    body?: string;
    cta?: { href: string; label: string };
  };
  phases: PhaseContent[];
  greatStentReference: {
    title?: string;
    description?: string;
    items: GreatStentCriterion[];
  };
  whatToLookOutFor: {
    title?: string;
    description?: string;
    items: WhatToLookOutForItem[];
  };
  peerQuote: PeerQuoteContent;
  extraInfo: ExtraInfoContent;
  nav: StepNav;
};

export type ApplyContent = {
  step: Extract<StepKey, "apply">;
  hero: StepHeroContent;
  summary: StepSummaryContent;
  details: DetailSection[];
  peerQuote: PeerQuoteContent;
  extraInfo: ExtraInfoContent;
  nav: StepNav;
};

export type WalkthroughContent = {
  setup: SetupContent;
  form: FormContent;
  apply: ApplyContent;
};

/* ---------- Landing-shaped content ----------------------------------------- */

export type LandingContent = {
  meta: { title: string; description: string };
  hero: {
    headline: string;
    lead: string;
    primaryCta: { href: string; label: string };
    secondaryCta?: { href: string; label: string };
    /** Wistia hero video — live site uses media-id `yk3vsc3iq5`. */
    wistiaMediaId: string;
    wistiaTitle: string;
  };
  /** The three "no" cards: no suturing, no pain, no impressions. */
  valueProps: {
    title: string;
    sub: string;
    image?: string;
  }[];
  /** Six KOLs surfaced on the live site. */
  kols: { name: string; affiliation?: string; image?: string }[];
  evidence: {
    title: string;
    journal: string;
    date: string;
    href?: string;
  };
  pricing: {
    starterKit: {
      title: string;
      price: string;
      includes: string[];
      cta: { href: string; label: string };
    };
    refills: {
      label: string;
      material: string;
      price: string;
      perStent: string;
    }[];
  };
  footerCta: {
    headline: string;
    body: string;
    cta: { href: string; label: string };
  };
};

/* =========================================================================
   Real content — every line traceable to Elemental_Content_Extraction.md.
   ========================================================================= */

const setup: SetupContent = {
  step: "setup",
  hero: {
    title: "Prepare the bath and make the material mouldable.",
    lead: "Warm the water bath once, then soften a sheet of PerioPlast® into a mouldable disk before each case.",
    wistiaMediaId: "t6ni3imsmb",
    wistiaTitle: "How to set up the water bath and make PerioPlast® mouldable",
  },
  summary: {
    totalTime: "~5 min",
    items: [
      {
        text: "Set up the water bath.",
        href: "#bath-setup",
        time: "~5 min",
      },
      {
        text: "Make PerioPlast® mouldable.",
        href: "#material-prep",
        time: "~30 sec",
      },
    ],
  },
  details: [
    {
      id: "starter-kit",
      eyebrow: "Unboxing",
      title: "What's in the Starter Kit",
      lead: "Three groups of items — training, material, and bath kit. Set the kit out before starting so you don't have to leave the chair to reach for forceps mid-procedure.",
      microSteps: [
        {
          index: "0.1",
          title: "Training materials",
          bullets: [
            "4 booklets covering the procedure end-to-end.",
            "Sample material and an example finished stent for reference.",
          ],
        },
        {
          index: "0.2",
          title: "2 boxes of PerioPlast® (6 stents)",
          bullets: [
            "4 cubes make 1 stent.",
            "Each box contains 3 stents.",
          ],
        },
        {
          index: "0.3",
          title: "Water bath kit",
          bullets: [
            "Water bath and cup holder.",
            "2 steel cups and forceps.",
          ],
        },
      ],
    },
    {
      id: "bath-setup",
      eyebrow: "Section #1",
      title: "Fill and heat the chairside water bath — done once per practice",
      lead: "Done once per practice. The bath is reusable — only the steel cup is replaced for each patient.",
      wistiaMediaId: "etpwfysw59",
      wistiaTitle: "Setting up your water bath",
      microSteps: [
        {
          index: "1.1",
          title: "Place the cup holder in the bath.",
        },
        {
          index: "1.2",
          title: "Fill the bath with water to the line on the cup holder.",
          callouts: [
            {
              kind: "pro-tip",
              body: "Fill the bath with tap water to speed up the heating time.",
            },
          ],
        },
        {
          index: "1.3",
          title: "Fill the cup with water to the line on the cup.",
        },
        {
          index: "1.4",
          title: "Place the cup in the cup holder.",
        },
        {
          index: "1.5",
          title: "Plug in and turn the bath on. Set to 180 °F / 80 °C.",
        },
        {
          index: "1.6",
          title: "Wait while the bath heats. Approx. 5 minutes to reach steam.",
        },
      ],
      quickCheck: {
        items: [
          {
            caption: "Both cup and bath are filled with water to their fill lines.",
            imageLabel: "bath + cup, filled",
          },
          {
            caption: "Water is steaming — bath is ready to use.",
            imageLabel: "steam rising from bath",
          },
        ],
      },
    },
    {
      id: "material-prep",
      eyebrow: "Section #2",
      title: "Soften PerioPlast® in hot water — fresh for every patient",
      lead: "Done fresh for each patient. The material fuses into a soft, pliable ball that you lift off the forceps in one piece.",
      wistiaMediaId: "obigdfc34w",
      wistiaTitle: "Making PerioPlast® mouldable",
      microSteps: [
        {
          index: "2.1",
          title: "Check water in both bath and cup. Confirm 180 °F / 80 °C.",
        },
        {
          index: "2.2",
          title: "Wait until the water is steaming (~5 minutes).",
        },
        {
          index: "2.3",
          title: "Put on gloves. Apply Vaseline to prevent sticking.",
        },
        {
          index: "2.4",
          title: "Open 1 sheet (4 cubes) of PerioPlast® and pour it into the cup.",
        },
        {
          index: "2.5",
          title: "Stir the material with the forceps for 10 seconds.",
        },
        {
          index: "2.6",
          title: "The granules will stick together. If not, the water isn't hot enough.",
        },
        {
          index: "2.7",
          title: "Pull the material off the forceps in one piece.",
        },
        {
          index: "2.8",
          title: "You can always reheat to restart.",
          callouts: [
            {
              kind: "pro-tip",
              title: "Restart freely",
              body: "If the disk goes wrong on the palate, drop it back into the cup. The material returns to mouldable consistency in under a minute.",
            },
          ],
        },
      ],
      quickCheck: {
        items: [
          {
            caption: "The material sticks together and feels like soft chewing gum.",
            imageLabel: "soft chewing-gum consistency",
          },
          {
            caption: "You don't feel individual granules anymore.",
            imageLabel: "smooth material",
          },
        ],
      },
    },
  ],
  peerQuote: {
    quote:
      "Half my chair-time issue was waiting for the bath. Filling it with tap water cut the wait to under two minutes — that single tip changed my workflow more than the stent itself did.",
  },
  extraInfo: {
    title: "Cleaning the bath, cup, and cup holder",
    description:
      "Three components, three different cleaning protocols. Use a clean cup for every patient.",
    items: [
      {
        term: "Autoclave the cup between patients.",
        definition: "Autoclavable at 273 °F / 134 °C. Use a fresh cup per patient.",
      },
      {
        term: "Wipe the bath daily — never autoclave.",
        definition:
          "Not autoclavable. Wipe with sterilisation wipes daily. See bath manual for the full steam-sterilisation protocol.",
      },
      {
        term: "Wipe the holder after every session.",
        definition: "Wipe with sterilisation wipes daily.",
      },
    ],
    cta: { href: "/reference/cleaning", label: "Full cleaning protocol" },
  },
  nav: {
    next: { href: "/walkthrough/form", label: "Form the stent" },
  },
};

const form: FormContent = {
  step: "form",
  hero: {
    title: "Shape the heated material into a palatal stent.",
    lead: "Press the warm disk onto the palate, have the patient bite into occlusion, and lift out a chairside stent in minutes.",
    wistiaMediaId: "xu6jr9bq42",
    wistiaTitle: "Making your 1st Elemental stent",
  },
  summary: {
    label: "Steps at a glance",
    title: "Steps at a glance",
    totalTime: "~5–7 min",
    items: [
      { text: "Heat the material.", time: "~1 min", href: "#phase-1" },
      { text: "Shape and seat the disk on the palate.", time: "~1 min", href: "#phase-2" },
      { text: "Mould in full occlusion.", time: "~3 min", href: "#phase-3" },
      { text: "Trim the edges and check the fit.", time: "~1–2 min", href: "#phase-4" },
    ],
  },
  sampleCallout: {
    title: "Use the free sample to make your 1st stent.",
    body: "The Starter Kit ships with one practice sheet of PerioPlast®. Make your first stent on a typodont with the sample — you only get one mulligan per kit.",
    cta: {
      href: "https://shop.withelemental.com/products/perioplast-intro-kit",
      label: "Where the sample lives in the kit",
    },
  },
  phases: [
    {
      phaseNumber: 1,
      title: "Heat the material",
      time: "~1 min",
      description:
        "Drop one sheet of PerioPlast® into the steaming cup and stir for 10 seconds. The granules fuse into a soft, pliable ball. Lift it off the forceps in one piece.",
      microSteps: [
        {
          title: "Pour 1 sheet of PerioPlast® into the heated cup.",
          bullets: [
            "Open up 1 sheet (all 4 cubes) and pour into the heated water.",
            "Stir for 10 seconds. The granules will start to stick together.",
          ],
        },
        {
          title: "Pull the material off the forceps in one piece.",
          bullets: [
            "Once the material sticks to the forceps, lift it out of the water.",
            "Then pull the material off the forceps — the Vaseline prevents sticking.",
          ],
        },
      ],
    },
    {
      phaseNumber: 2,
      title: "Shape the disk and place it on the palate",
      time: "~1 min",
      description:
        "Press the warm material into a thin, even disk. Place it on the palate — far enough back to clear the anterior teeth, and wide enough to wrap around the buccal side.",
      microSteps: [
        {
          title: "Shape a disk by pressing the material. Don't stretch.",
          bullets: [
            "The thinner the disk, the more comfortable for the patient.",
            "Don't stretch or pull — it makes the disk uneven.",
            "Press gently into the desired shape.",
          ],
        },
        {
          title: "Sit behind the patient to place the disk in the mouth.",
          bullets: [
            "Sitting behind is the easiest way to position the material.",
          ],
        },
        {
          title: "Position the disk in the mouth.",
          bullets: [
            "Sufficiently posterior — no material visible in the anterior zone.",
            "Sufficiently buccal — so you can press it interproximally.",
          ],
        },
      ],
      quickCheck: {
        items: [
          {
            caption: "Long enough to cover the graft site.",
            imageLabel: "disk over graft site",
          },
          {
            caption: "Wide enough for buccal retention.",
            imageLabel: "disk wrapping buccal",
          },
        ],
      },
    },
    {
      phaseNumber: 3,
      title: "Mould the stent directly on the palate",
      time: "~3 min",
      description:
        "Press the disk firmly onto the occlusal surfaces, then wrap it around the buccal side and push it tight against the palate. Ask the patient to bite into full occlusion and hold for 30 seconds. Re-adapt to the palatal contour to lock the stent interproximally.",
      microSteps: [
        {
          title: "Press the disk firmly onto the occlusal surfaces.",
        },
        {
          title: "Wrap around the vestibular sides and press with the tongue.",
        },
        {
          title: "Press firmly on the palate until it stays tightly adapted.",
        },
        {
          title: "Bite in full occlusion and press interproximally for 30 seconds.",
          bullets: [
            "This creates a stent with bite function — the patient can eat with it.",
            "Important for stable retention.",
          ],
        },
        {
          title: "Re-adapt to the palate.",
          bullets: [
            "Important to lock the stent in the interproximal areas.",
          ],
        },
      ],
      toFinish: {
        title: "Keep closed for 1–2 minutes & remove once solid.",
        duration: "1–2 min",
      },
    },
    {
      phaseNumber: 4,
      title: "Trim the edges and check the fit",
      time: "~1–2 min",
      description:
        "Let the stent set in the mouth until you can no longer dent it. Remove it gently, then dunk in cold water to finish hardening. Trim any overextensions with scissors and have the patient confirm the fit.",
      microSteps: [
        {
          title: "Let the stent set in-situ. Remove gently once solid.",
          bullets: [
            "Remove when you can no longer make a dent in the material.",
            "Take it out gently — deform as little as possible.",
          ],
        },
        {
          title: "Dunk in cold water to set harder.",
        },
        {
          title: "If needed, trim with scissors.",
          bullets: [
            "Sharp edges can be smoothened with a heated instrument.",
          ],
        },
        {
          title: "Have the patient fit the stent and confirm comfort.",
        },
        {
          title: "The stent is ready.",
        },
      ],
      quickCheck: {
        title: "When to trim?",
        items: [
          {
            caption: "When the stent covers the soft palate.",
            imageLabel: "trim guide · soft palate",
          },
          {
            caption: "When the stent covers the alveolar mucosa.",
            imageLabel: "trim guide · alveolar mucosa",
          },
        ],
      },
    },
  ],
  greatStentReference: {
    description:
      "Use the example stent shipped in the kit to compare. A stent that misses any one of the four criteria should be reformed before the patient leaves the chair.",
    items: [
      {
        title: "Bite function",
        caption: "Almost translucent on occlusal surfaces.",
        imageLabel: "reference · bite function",
      },
      {
        title: "Tight palatal adaptation",
        caption: "Palatal anatomy visible in the stent.",
        imageLabel: "reference · palatal adaptation",
      },
      {
        title: "Stable retention",
        caption: "Occlusal surfaces and interproximal on the buccal side.",
        imageLabel: "reference · retention",
      },
      {
        title: "Thin stent",
        caption: "Approximately 2 mm / 0.1 inch.",
        imageLabel: "reference · thickness",
      },
    ],
  },
  whatToLookOutFor: {
    description:
      "Four critical errors at the form-the-stent stage. Each is recoverable only by starting over with a fresh sheet — and the kit ships with one practice sheet.",
    items: [
      {
        title: "Make the stent before numbing the palate.",
        detail:
          "A stent shaped on a swollen palate won't fit once swelling subsides.",
        imageLabel: "anti-pattern · numbed palate",
      },
      {
        title: "Tight palatal adaptation is critical.",
        detail:
          "Tight adaptation stabilises the blood clot — prevents suturing and post-operative bleeding.",
        imageLabel: "anti-pattern · loose adaptation",
      },
      {
        title: "Long enough to cover the grafting site.",
        detail:
          "The stent must extend past the distal edge of the graft.",
        imageLabel: "reference · graft coverage",
      },
      {
        title: "Wide enough for buccal retention.",
        detail:
          "Material must wrap interproximally on the buccal side to lock the stent in place.",
        imageLabel: "reference · buccal width",
      },
    ],
  },
  peerQuote: {
    author: {
      name: "Prof. Dr. Markus Hürzeler",
      role: "Periodontist · Munich, Germany",
    },
    quote: [
      "The first three I made were too thick. I was being careful — pressing gently, not stretching — and the result was a stent that felt safe but sat off the palate.",
      "The unlock was the don't-stretch-just-press-thinner instruction. Two-millimetre thickness reads fragile in the hand and is exactly what the patient wants in the mouth.",
    ],
  },
  extraInfo: {
    label: "Precautions",
    title: "Before you reach for the forceps",
    description:
      "Three small things the live site buries in the body text but that matter on a first attempt.",
    items: [
      {
        term: "Vaseline on gloves",
        definition:
          "Apply before touching the heated material. Without it, the disk sticks and tears as you pull it off the forceps.",
      },
      {
        term: "Form before anaesthesia",
        definition:
          "A stent shaped on a swollen palate won't fit once the swelling resolves.",
      },
      {
        term: "Re-heat to restart",
        definition:
          "If the disk goes wrong on the palate, drop it back into the cup. The material returns to mouldable consistency in under a minute.",
      },
    ],
  },
  nav: {
    prev: { href: "/walkthrough/setup", label: "Setup" },
    next: { href: "/walkthrough/apply", label: "Apply" },
  },
};

const apply: ApplyContent = {
  step: "apply",
  hero: {
    title: "Place the stent right after harvesting the graft.",
    lead: "Seat the stent on the palatal wound right after harvesting — it stabilises the clot and replaces the need to suture.",
    wistiaMediaId: "vpsbhacjdc",
    wistiaTitle: "Clinical & financial implementation",
  },
  summary: {
    items: [
      { text: "Surgical protocol.", href: "#surgical-protocol" },
      { text: "Patient handoff.", href: "#patient-handoff" },
      { text: "Workflow upgrade.", href: "#workflow" },
    ],
  },
  details: [
    {
      id: "surgical-protocol",
      eyebrow: "Section #1",
      title: "How to apply the stent during surgery",
      lead: "Six-step sequence. Item 4 is the moment of value — the stent goes in directly onto the donor site immediately after harvest, stabilising the blood clot before suturing would otherwise begin.",
      microSteps: [
        {
          index: "1.1",
          title: "Make the stent before anaesthesia.",
          callouts: [
            {
              kind: "watch-out",
              body: "A stent shaped on a swollen palate won't fit once swelling subsides.",
            },
          ],
        },
        { index: "1.2", title: "Prepare the recipient site." },
        { index: "1.3", title: "Harvest the graft." },
        {
          index: "1.4",
          title: "Place the stent immediately after harvesting.",
          bullets: [
            "Goes directly onto the donor site to stabilise the blood clot.",
            "This replaces the role suturing plays in the conventional workflow.",
          ],
        },
        { index: "1.5", title: "Position and stabilise the graft." },
        {
          index: "1.6",
          title: "Patient wears the stent 5 days.",
          bullets: [
            "First 24 hours non-stop.",
            "Day 2–4: remove daily to clean.",
            "Day 5+: remove if pain-free.",
          ],
        },
      ],
    },
    {
      id: "patient-handoff",
      eyebrow: "Section #2",
      title: "Patient instructions",
      lead: "Three phases over five days. Give the patient a printed or digital copy — the schedule is easy to forget without it.",
      microSteps: [
        {
          index: "2.1",
          title: "First 24 h",
          bullets: ["Wear the stent non-stop to stabilise the blood clot."],
        },
        {
          index: "2.2",
          title: "Day 2–4",
          bullets: ["Remove once per day to clean, then place it back."],
        },
        {
          index: "2.3",
          title: "From day 5",
          bullets: ["No pain? Remove the stent."],
        },
      ],
      quickCheck: {
        items: [
          {
            caption: "Patient knows the 24 h non-stop window.",
            imageLabel: "calendar · day 1",
          },
          {
            caption: "Patient knows the day 2–4 daily clean routine.",
            imageLabel: "calendar · day 2–4",
          },
          {
            caption: "Patient knows the pain-free removal threshold.",
            imageLabel: "calendar · day 5+",
          },
        ],
      },
    },
    {
      id: "workflow",
      eyebrow: "Section #3",
      title: "How Elemental upgrades your workflow",
      lead: "Three benefits, all downstream of the same fact: the stent stabilises the clot, so the steps that exist to manage clot loss go away.",
      microSteps: [
        {
          index: "3.1",
          title: "The easiest way to stop the bleeding.",
          bullets: [
            "Place the stent on the donor site immediately after harvesting.",
            "No more stressful suturing in the palate.",
            "No post-operative bleeding.",
          ],
        },
        {
          index: "3.2",
          title: "The fastest way to make a stent.",
          bullets: [
            "Shape the heated material into a stent directly on the palate.",
            "No more impressions, pouring models, or worrying about fit.",
          ],
        },
        {
          index: "3.3",
          title: "The best patient experience.",
          bullets: [
            "Patients can eat with the stent.",
            "Not visible in the smile area.",
            "No bulky stents.",
          ],
        },
      ],
    },
  ],
  peerQuote: {
    author: {
      name: "Dr. Homa Zadeh",
      role: "Periodontist · Los Angeles, USA",
    },
    quote:
      "Patients describe day one with a stent as 'tight, not painful' — and that distinction matters. They keep it in because it's working, not because we asked them to.",
  },
  extraInfo: {
    label: "Billing",
    title: "Three ways to charge for an Elemental stent",
    description:
      "Pricing is procurement-side: it lives here as a reference, not as a step. Live-site mark-up range: $150–$250 per stent.",
    items: [
      {
        term: "Mark-up",
        definition: "3–5× material cost. Range observed on the live site: $150–$250 per stent.",
      },
      {
        term: "Bundled",
        definition: "Include the stent as part of the broader graft procedure fee.",
      },
      {
        term: "Insurance code",
        definition: "D5988 — Surgical Splint. Coverage varies by carrier.",
      },
    ],
    cta: { href: "/reference/patient-handoff", label: "Full patient handoff" },
  },
  nav: {
    prev: { href: "/walkthrough/form", label: "Form the stent" },
  },
};

export const walkthrough: WalkthroughContent = { setup, form, apply };

/* =========================================================================
   Landing
   ========================================================================= */

export const landing: LandingContent = {
  meta: {
    title: "Elemental — Never worry about the palate again.",
    description:
      "Zinc-infused palatal stents formed directly on the palate. No suturing, no pain, no impressions. Stops post-operative bleeding the moment the graft is harvested.",
  },
  hero: {
    headline: "Form a palatal stent in 5 minutes.",
    lead: "A zinc-infused thermoplastic disk shaped directly on the palate — no impressions, no lab.",
    primaryCta: {
      href: "/walkthrough/setup",
      label: "Walk through making one",
    },
    secondaryCta: {
      href: "https://shop.withelemental.com/products/perioplast-intro-kit",
      label: "Get the Starter Kit",
    },
    wistiaMediaId: "yk3vsc3iq5",
    wistiaTitle: "What is Elemental?",
  },
  valueProps: [
    {
      title: "No suturing",
      sub: "The stent stabilises the blood clot.",
      image: "/images/seq1-2.png",
    },
    {
      title: "No pain",
      sub: "Bacteriostatic & soft-tissue friendly stents reduce post-operative discomfort to absolute minimum.",
      image: "/images/seq1-1.png",
    },
    {
      title: "No impressions",
      sub: "Made directly on the palate.",
      image: "/images/seq1-3.png",
    },
  ],
  kols: [
    { name: "Prof. Dr. Markus Hürzeler", affiliation: "Munich, Germany", image: "/images/markus.png" },
    { name: "Prof. Dr. Anton Sculean", affiliation: "Bern, Switzerland", image: "/images/sculean.png" },
    { name: "Prof. Dr. Vanessa Frazão", affiliation: "São Paulo, Brazil", image: "/images/frazao.png" },
    { name: "Prof. Dr. Yusuke Hamada", affiliation: "Indianapolis, USA", image: "/images/yusuke.png" },
    { name: "Prof. Dr. Giulio Rasperini", affiliation: "Milan, Italy", image: "/images/giulio.png" },
    { name: "Dr. Homa Zadeh", affiliation: "Los Angeles, USA", image: "/images/homa.png" },
  ],
  evidence: {
    title:
      "Pre-operative, chair-side Zn-containing surgical stents affect morbidity and wound healing after free gingival graft harvesting: a randomized clinical trial.",
    journal: "Clinical Oral Investigations",
    date: "July 19, 2023",
    href: "/reference/clinical-study",
  },
  pricing: {
    starterKit: {
      title: "Starter Kit",
      price: "$299 / €239",
      includes: [
        "Material for 6 stents",
        "Free water bath",
        "Free sample to practice",
      ],
      cta: {
        href: "https://shop.withelemental.com/products/perioplast-intro-kit",
        label: "Visit the shop",
      },
    },
    refills: [
      {
        label: "Bulk Discount (10+1)",
        material: "33 stents",
        price: "$1,490 / €1,190",
        perStent: "$45 / €36",
      },
      {
        label: "1 box PerioPlast",
        material: "3 stents",
        price: "$149 / €119",
        perStent: "$50 / €40",
      },
    ],
  },
  footerCta: {
    headline: "Ready to make your first stent?",
    body: "The Starter Kit ships with everything you need: water bath, cups, forceps, two boxes of PerioPlast®, and one practice sheet so the first attempt isn't on a patient.",
    cta: {
      href: "https://shop.withelemental.com/products/perioplast-intro-kit",
      label: "Get the Starter Kit",
    },
  },
};
