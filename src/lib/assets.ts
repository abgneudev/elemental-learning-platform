/**
 * Single source of truth for legacy Elemental media assets.
 *
 * Sourced from `Elemental_Asset_Manifest.md`. All current assets live on the
 * Webflow CDN at `cdn.prod.website-files.com/608992c15f8d261420ca9608/`.
 *
 * **Reuse note:** these URLs serve from the client's existing Webflow CDN.
 * Per the manifest §7, reuse rights need confirmation, and the recommended
 * migration is to download to `/public/legacy/` once approved. When that
 * happens, this file is the only place to update — every component imports
 * its URL from here.
 *
 * Wistia: video media ids only — embeds are built by `<WistiaPlayer>`.
 */

const CDN_BASE = "https://cdn.prod.website-files.com/608992c15f8d261420ca9608/";

const cdn = (path: string): string => `${CDN_BASE}${path}`;

/* ---------- Asset shape ---------------------------------------------------- */

export type CdnImage = {
  src: string;
  alt: string;
  /** Intrinsic dimensions when known. Required by `next/image` for non-fill mode. */
  width?: number;
  height?: number;
};

export type WistiaVideo = {
  mediaId: string;
  title: string;
};

/* ---------- Wistia videos -------------------------------------------------- */
/* Page 3 (Form the stent) — complete inventory per manifest §1.
   Pages 1, 2, 4 inventories are pending; their `mediaId` fields here are
   left as the placeholders currently in `content.ts` and should be replaced
   once the manifest is completed. */

export const videos = {
  pageHero: {
    form: { mediaId: "xu6jr9bq42", title: "Making your 1st Elemental stent" },
  },
  phaseHero: {
    /** Phase 1 — making & placing the disk. */
    one: { mediaId: "0wroygpqzd", title: "Making & placing the disk" },
    /** Phase 2 — shaping the stent on the palate. */
    two: { mediaId: "kij5t9fup1", title: "Shaping the stent" },
    /** Phase 3 — trimming & finishing. */
    three: { mediaId: "b7ycohpa8n", title: "Trimming & finishing" },
  },
  /** Sub-step videos — the fine-grained lightbox players. */
  phaseSubsteps: {
    p1: {
      heat: { mediaId: "pncag5dd92", title: "Heat 1 sheet of PerioPlast" },
      pull: { mediaId: "3qg4kzn27y", title: "Pull material off forceps" },
      shape: { mediaId: "r9o403u2ic", title: "Shape disk by pressing" },
      sit: { mediaId: "4tjyuawd4p", title: "Sit behind patient" },
      position: { mediaId: "j9va1ylvoj", title: "Position the disk" },
    },
    p2: {
      pressOcclusal: { mediaId: "sfkf9aemgl", title: "Press onto occlusal surfaces" },
      wrapVestibular: { mediaId: "mcum632ye9", title: "Wrap around vestibular sides" },
      pressPalate: { mediaId: "tu0lfkvw0p", title: "Press firmly on palate" },
      biteOcclusion: { mediaId: "ht309iabpm", title: "Bite in full occlusion 30s" },
      reAdapt: { mediaId: "ziw7nbndue", title: "Re-adapt to palate" },
      finish: { mediaId: "pkayzzbhdt", title: "Keep closed 1–2 min" },
    },
    p3: {
      letSet: { mediaId: "dgeua6eo6x", title: "Let stent set in-situ" },
      coldDunk: { mediaId: "vkscpexv56", title: "Dunk in cold water" },
      trim: { mediaId: "ipkq011fd9", title: "Trim with scissors" },
      patientConfirm: { mediaId: "nhqi33lgyp", title: "Patient confirms comfort" },
      done: { mediaId: "qb6hikfddy", title: "Final stent ready" },
    },
  },
} as const;

/* ---------- Photographs ---------------------------------------------------- */
/* Image dimensions on the Webflow CDN are typically the source-uploaded size.
   Where unknown, we leave width/height undefined and let `next/image` use
   `sizes` + `fill` mode. */

export const heroImages = {
  ogShare: {
    src: cdn("68f8950e82e351b4f2199c7d_Slide%2016_9%20-%2023%20(1).jpg"),
    alt: "Elemental — finished palatal stent on the palate.",
  },
} satisfies Record<string, CdnImage>;

/** "What makes a great stent" reference shapes — Form step's GreatStentReference.
    Order matches `walkthrough.form.greatStentReference.items`. */
export const greatStentImages = {
  biteFunction: {
    src: cdn("68bf54d8eb2913a47fc71d49_greatstent-1.jpg"),
    alt: "Reference: stent translucent on the occlusal surfaces — bite function intact.",
  },
  tightPalatal: {
    src: cdn("68bf54d867de9e7f9bf2472a_greatstent-2.jpg"),
    alt: "Reference: palatal anatomy visible in the stent — tight adaptation.",
  },
  stableRetention: {
    src: cdn("68bf54d87bc0868da7409d3b_greatstent-4.jpg"),
    alt: "Reference: stent locked at occlusal and buccal interproximal — stable retention.",
  },
  thinStent: {
    src: cdn("68bf54d82fe0e9537931310d_greatstent-3.jpg"),
    alt: "Reference: stent at approximately 2 mm thickness.",
  },
} satisfies Record<string, CdnImage>;

/** "What to look out for" anti-patterns — Form step's WhatToLookOutFor.
    Order matches `walkthrough.form.whatToLookOutFor.items`. */
export const lookoutImages = {
  beforeNumbing: {
    src: cdn(
      "68f079e07b88fafe69990ce3_Schermafbeelding%202025-10-16%20065101%201.png",
    ),
    alt: "Anti-pattern: stent shaped on a numbed/swollen palate.",
  },
  tightPalatal: {
    src: cdn("68bf57d147a90973624f2cea_lookout-1.jpg"),
    alt: "Critical: tight palatal adaptation stabilises the blood clot.",
  },
  longEnough: {
    src: cdn("68bf57d1a7e80adaac5f0db9_lookout-3.jpg"),
    alt: "Reference: stent extends past the distal edge of the graft.",
  },
  wideEnough: {
    src: cdn("68bf57d139d5b067de3a5a42_lookout-4.jpg"),
    alt: "Reference: stent wraps interproximally on the buccal side.",
  },
} satisfies Record<string, CdnImage>;

/** Phase-1 closing QuickCheck — disk placement check. */
export const phase1CheckImages = {
  longEnough: {
    src: cdn("68bf5f3d5b2a00dc9c32e01d_lookout-3%20(1)%20(1).jpg"),
    alt: "Check: disk long enough to cover the graft site.",
  },
  wideEnough: {
    src: cdn("68bf5f3dd574d9c1af79a3c8_lookout-4%20(1)%20(1).jpg"),
    alt: "Check: disk wide enough for buccal retention.",
  },
} satisfies Record<string, CdnImage>;

/** Phase-3 closing QuickCheck — "When to trim?" */
export const trimCheckImages = {
  softPalate: {
    src: cdn("68bfec8d6491a1911341c439_trim1.jpg"),
    alt: "Trim guide: stent covers the soft palate.",
  },
  alveolarMucosa: {
    src: cdn("68bfec9e8db1bfff20999749_trim2.jpg"),
    alt: "Trim guide: stent covers the alveolar mucosa.",
  },
} satisfies Record<string, CdnImage>;

/** Sequence preview — top-of-page "In 3 steps" mini-stack. */
export const sequenceImages = {
  desktop: {
    turn: {
      src: cdn("68bf52787ef2845b9e2794a8_turn%20(3).jpg"),
      alt: "Heated PerioPlast turning into a workable disk.",
    },
    disk: {
      src: cdn("68bf53d13d303818cd6daba5_seq3-1.jpg"),
      alt: "Disk pressed into shape.",
    },
    shaping: {
      src: cdn("68bf53d1bd2661a92da54810_seq3-2.jpg"),
      alt: "Shaping the disk on the palate.",
    },
    trimming: {
      src: cdn("68bf53d1b52be6985d4f4b94_seq3-3.jpg"),
      alt: "Trimming the finished stent.",
    },
  },
  mobile: {
    turn: {
      src: cdn("68b9a3c23816f8b4436490ba_turn2%20(1).jpg"),
      alt: "Heated PerioPlast turning into a workable disk.",
    },
    disk: {
      src: cdn("68b9a24c985c37b9fe882baa_seq3-1%20(2)%20(1).jpg"),
      alt: "Disk pressed into shape.",
    },
    shaping: {
      src: cdn("68b9a24c1f25c74223d62131_seq3-2%20(2)%20(1).jpg"),
      alt: "Shaping the disk on the palate.",
    },
    trimming: {
      src: cdn("68b9a24c7afc5b0194cdd750_seq3-3%20(2)%20(1).jpg"),
      alt: "Trimming the finished stent.",
    },
  },
} satisfies Record<"desktop" | "mobile", Record<string, CdnImage>>;

/** Sub-step lightbox poster frames — used as Phase-section thumbnails. */
export const phaseThumbnails = {
  p1: {
    s1: cdn("68f9e0102ff28c3f3768720b_make-1%20(1)%20(1).jpg"),
    s2: cdn("68f9f04f48381a19e7a77a3f_make-2%20(1).jpg"),
    s3: cdn("68f9f04f7e5d4077dcd2ed28_make-3%20(1).jpg"),
    s4: cdn("68f9f04f69e0ca018dfdb70b_make-4%20(1).jpg"),
    s5: cdn("68f9f14a5a77ee6cf1f72703_make-4%20(2)%20(1).jpg"),
  },
  p2: {
    s1: cdn("68f8ff4ce0ea0bbb202d071d_stentmaking-1%20(11).jpg"),
    s2: cdn("68f8ff4ce9908ba49b2072d7_stentmaking-2%20(1).jpg"),
    s3: cdn("68f8ff4c2c8a8761047f5b7d_stentmaking-2-1.jpg"),
    s4: cdn("68f8ff4c28cb7f6304d1e82f_stentmaking-2-2.jpg"),
    s5: cdn("68f8ff4cdcc985467caaabdf_stentmaking-2-3.jpg"),
    finish: cdn("68f8ff4c3207b231902bce86_stentmaking-2-4.jpg"),
  },
  p3: {
    s1: cdn("68f9eede8735233135921054_stentmaking-2%20(4)%20(1).jpg"),
    s2: cdn("68f9eedeab3e46a208b787f5_stentmaking-2%20(3)%20(1).jpg"),
    s3: cdn("68f9eede48bbc1e9a22c6b0c_stentmaking-2%20(5)%20(1).jpg"),
    s4: cdn("68f9ee61b0d74eedae4926d8_stentmaking-2-3%20(1).jpg"),
    s5: cdn("68f9eedee2c945e8a97a4663_stentmaking-2%20(6)%20(1).jpg"),
  },
} as const;

export const teamImage: CdnImage = {
  src: cdn("69e0fdb588e20d6c777aa9b9_team%20(1).jpg"),
  alt: "Elemental support team.",
};

/* ---------- SVG icons ------------------------------------------------------ */
/* Most are decorative duplicates of inline-SVG components we already ship,
   so we only export the ones the new components consume. The blister-pack
   illustration is the only one we currently render through this manifest;
   the rest are kept here for completeness and future migration. */

export const icons = {
  blister: cdn("68b9a06ec2f426502410a8a3_blister.svg"),
  exampleStent: cdn("68b9a02a95ee55fe840ca88a_stent.svg"),
  /* Iconography parity with the live site — wire as needed. */
  whatYouWillLearn: cdn("68b6cc469f5d9b62c05ecc67_Vector%20(17).svg"),
  watchOutSection: cdn("68a341ab9c9ee42c0d34ace7_Vector%20(3).svg"),
  checkmark: cdn("68b6f51def79ad30eed12ae5_Group%20392.svg"),
  warningGlyph: cdn("68bf5b131f4b400a74636f63_Group%20367.svg"),
} as const;

/* ---------- Brand assets --------------------------------------------------- */

export const brand = {
  logo: {
    base: cdn("66bf1b75115be590e9b45df6_elemental-logo.png"),
    /** Webflow's responsive variants. Pick the smallest size ≥ render width. */
    p500: cdn("66bf1b75115be590e9b45df6_elemental-logo-p-500.png"),
    p800: cdn("66bf1b75115be590e9b45df6_elemental-logo-p-800.png"),
    p1080: cdn("66bf1b75115be590e9b45df6_elemental-logo-p-1080.png"),
  },
  favicon: cdn("60908156421b45346a6daf85_el_ic1.jpg"),
  appleTouchIcon: cdn("6090809beecdc6352f7610e9_aeArtboard%201.png"),
} as const;

/* ---------- The CDN host (for next.config remotePatterns) ------------------ */

export const CDN_HOST = "cdn.prod.website-files.com";
export { cdn };