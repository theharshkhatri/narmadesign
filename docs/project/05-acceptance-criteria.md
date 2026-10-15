# Acceptance criteria

## Status

This document records the gate. Checked items have evidence recorded in the Phase 6 notes below; unchecked items remain unverified or blocked by missing production inputs.

## Prototype QA checklist

### Brand and art direction

- [x] Official logo assets are preserved and render cleanly.
- [x] Hero combines expressive typography with original geometry.
- [ ] Palette, typography, spacing, and image treatments form a consistent system.
- [x] Concept campaigns are clearly distinguished from commissioned work.

### Responsive experience

- [x] No unintended horizontal overflow at mobile, tablet, or desktop sizes.
- [ ] Headlines, SVG artwork, and project cards reflow intentionally.
- [x] Navigation, links, and buttons work with mouse, touch, and keyboard.
- [ ] Content remains readable when decorative artwork is hidden.

### Motion and accessibility

- [ ] Animations do not block reading or navigation.
- [x] Reduced-motion preferences produce a usable static alternative.
- [x] Interactive elements have visible focus states and accessible names.
- [ ] Text contrast, semantic headings, image alternatives, and form labels are checked.
- [ ] Animation cleanup prevents duplicated timelines or leaked listeners.

### Content and routing

- [x] Homepage and work index derive project content from typed data.
- [x] Every published campaign has a unique slug and valid detail route.
- [ ] Missing optional project sections do not render broken placeholders.
- [x] Navigation, CTA links, metadata, and page titles are correct.

### Contact and technical quality

- [ ] Direct email uses the configured studio address.
- [ ] Form validation displays clear errors and submission states.
- [ ] No false success state is shown without successful submission.
- [ ] Production submission includes server-side validation and abuse protection.
- [x] Production build succeeds without unresolved errors.
- [ ] Images, fonts, and animation are checked for avoidable performance costs.

## Measurable targets

- Core Web Vitals target: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at the 75th percentile when sufficient field data exists.
- Responsive QA at 375px, 768px, 1024px, and 1440px, plus intermediate widths and real devices.
- WCAG 2.2 AA target for applicable criteria, checked with automated and manual keyboard/screen-reader review.
- No unresolved build errors, broken internal links, uncaught interaction errors, or unintended overflow in supported browsers.
- Contact QA covers valid input, invalid fields, duplicate/abusive requests, network failure, and successful delivery.

A Lighthouse score alone does not prove accessibility, real-device performance, or absence of interaction bugs.

## Phase 6 evidence — 2026-10-15

- `pnpm build` passed. The static routes `/`, `/work`, `/studio`, and `/contact` prerender successfully.
- `pnpm exec tsc --noEmit` passed.
- Browser checks confirmed no horizontal overflow at 375px, 768px, 1024px, or 1440px viewport widths.
- Browser checks confirmed the supplied transparent wordmark renders, the mobile menu opens/closes with Escape, the skip link targets `#main-content`, and contact form fields expose accessible labels.
- The project source remains intentionally empty until approved project records and imagery are supplied, so case-study route and optional-section criteria remain unverified.
- Direct email, production form delivery, server-side validation, abuse protection, field performance, and full WCAG/manual screen-reader review remain open.
- Contrast audit: ink/canvas `16.34:1`, muted/canvas `5.23:1`, muted/stone `4.50:1`, paper/ink `17.79:1`, and gold/ink `7.57:1`. Gold/canvas is `2.16:1`, so it is not used as a focus indicator; focus uses ink on light surfaces and paper on dark surfaces.
- Six self-initiated concept campaigns are published across architecture, hospitality, fashion, interiors, culture, and food and beverage. No clients, outcomes, dates, or commissioned claims were added.
- Each campaign has a statically generated `/work/[slug]` detail route from the typed campaign source.
- Campaign image sources and licensing notes are recorded in [`docs/assets/portfolio-image-sources.md`](../assets/portfolio-image-sources.md) and linked from each detail page.
- The homepage campaign atlas uses a scoped pointer-drag interaction with a complete static image grid, readable labels, and a reduced-motion-safe CSS fallback.
- The homepage atlas uses the downloaded ObsidianUI Art Gallery source with local campaign assets; WebGL support, loading, cleanup, pointer drag, and reduced-motion fallback require browser verification.
- The Studio point-of-view section uses an original finite Word Slide timeline; its complete semantic statement remains visible in reduced-motion mode.
- The homepage capabilities map includes the 12 supplied categories and labels its scope as illustrative rather than claiming confirmed availability or client work.
- On medium-and-larger screens, the capabilities map uses one finite, scrubbed interaction based on the first two GSAPify Premium Collection patterns: centered cards spread, then advance one at a time as a slider; small screens and reduced-motion mode retain the complete stacked list.

## Site review follow-up — 2026-10-15

- The 23 original category PNGs were moved from `public/category/` to
  `source-assets/category/`; all 23 optimized WebP assets remain in `public/`.
- The homepage now presents three service pillars before the separate eight
  category capability map.
- The optional homepage WebGL gallery is dynamically loaded near the viewport
  for fine-pointer users without reduced motion. A static linked image grid is
  rendered first and remains available on touch and reduced-motion devices.
- The image viewer now supports arrow-key panning while zoomed and focused.
  Keyboard behavior still requires browser QA.
- Baseline security headers are configured in `next.config.ts`; the live
  response headers remain unverified because the local runtime could not start.
- The contact page links to the user-verified address
  `narma.design@gmail.com`. Form delivery remains disabled. Gmail SMTP
  credentials, durable rate limiting, and an approved privacy/retention policy
  are still required before enabling submission.
- The user confirmed the active category images are NARMA-created and cleared
  for publication. Asset provenance is recorded in
  `docs/assets/portfolio-image-sources.md`.
- The user-approved Studio point-of-view paragraph is live on `/studio` and is
  recorded in `docs/reviews/studio-point-of-view-draft.md`.
- Direct `tsc --noEmit` passed after the changes. ESLint could not run because
  the installed TypeScript 7.0.2 is unsupported by the installed
  `typescript-eslint`; the Next build could not canonicalize the workspace path
  due Windows access denied. These checks are not marked verified.

## Homepage redesign — 2026-10-15

Requirement applied from [Creative direction](./01-creative-direction.md): “The experience is light-first, typography-led, geometry-driven, and editorial.”

- Removed the gallery heading and explanatory labels requested in review, simplified the hero labels, and used the supplied wordmark asset in the footer. Hero copy remains illustrative and unapproved.
- Reworked selected-work reveals, the original artwork study, and services presentation with finite GSAP timelines. The artwork study retains a readable static composition at small sizes and under reduced motion.
- Capabilities use six locally sourced, licensed concept photographs to illustrate the twelve supplied capability areas. At large desktop widths, the cards spread and then slide through a finite pinned GSAP sequence; smaller screens and reduced-motion mode show all cards in a grid.
- The supplied artwork and logo remain direct assets. External photos remain labeled as concept references, not commissioned work or outcomes. See [`portfolio-image-sources.md`](../assets/portfolio-image-sources.md).
- `node ./node_modules/typescript/bin/tsc --noEmit` passes. `pnpm build` cannot start in this execution environment because Next.js reports access denied while canonicalizing `F:\Future\NextJS\narmadesign`.
- Browser review confirms the updated hero is legible, all twelve categories are present, the services content renders, and all six capability photographs load with matching image descriptions. The pinned card spread is visible; the full slider sequence, reduced-motion behavior, responsive widths, keyboard/touch operation, and full-page visual QA remain unverified. Unchecked acceptance criteria remain open.
