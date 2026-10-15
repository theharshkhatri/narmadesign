# Motion and accessibility

## Status

Motion direction is **locked**; exact timings and implementation are **to be validated**.

Every effect must have a clear role. Motion must not block reading, navigation, or interaction.

| Element | Intended behavior | Constraint |
|---|---|---|
| Hero typography | Staggered or clip-path reveal | Content remains available without animation |
| Hero SVG | Path drawing, morphing, or transform | Avoid excessive continuous CPU/GPU work |
| Project images | Mask reveal and subtle hover shift | Avoid layout shifts |
| Project cards | Image movement and metadata emphasis | Preserve readable titles and clear links |
| Section transitions | Selective scroll-triggered reveals | No scroll hijacking |
| Navigation | Quick hover and focus transitions | Keyboard support required |
| Page transitions | Optional short visual continuity | Never block navigation or trap users |

## Implementation rules

- Use CSS for simple hover, focus, and transform transitions.
- Use GSAP only for complex timelines or scroll-linked sequences that genuinely require it.
- Scope animation setup to component lifecycle and clean up timelines/listeners on unmount.
- Prefer transforms and opacity over repeatedly animating layout properties.
- Respect `prefers-reduced-motion` with meaningful static alternatives.
- Do not require an introductory animation before users can navigate or read.

## Approved experimental pattern

The homepage may use a pinned, scrubbed ScrollTrigger timeline for the signature visual
experiment. Timeline durations define the relative rhythm of each phase; the scroll distance
must remain finite and the page must not hijack scrolling. The implementation must:

- keep the complete static composition in the DOM;
- disable the timeline under `prefers-reduced-motion`;
- scope and clean up ScrollTrigger instances on unmount;
- animate transforms/opacity rather than layout dimensions;
- provide a usable link and readable copy before, during, and after the experiment.

## Accessibility gate

Use semantic HTML, visible focus states, accessible names, meaningful image alternatives, labeled form controls, clear validation errors, and readable contrast. Decorative artwork must not block content or clicks. Verify keyboard and touch behavior at representative responsive widths.

The current focus treatment uses ink against light surfaces and paper against dark surfaces. These
states are intentional contrast pairs, not decorative color changes. Gold remains an accent only;
it is not used as the sole focus indicator because it does not reach 3:1 against the light palette.

The work archive uses a finite `ScrollTrigger.batch` reveal for cards. Cards remain
fully rendered without JavaScript, and the batch is disabled under
`prefers-reduced-motion: reduce`. This is a reveal of existing content, not a
navigation gate or scroll hijack.

## Research record — 2026-10-15

Reviewed the official GSAP documentation and accessibility guidance before
selecting the next interaction:

- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) supports
  scrubbed timelines, pinning, batching, finite ranges, and lifecycle cleanup.
  The project uses only a finite batch reveal for the archive in addition to
  the existing pinned experiment.
- [Flip](https://gsap.com/docs/v3/Plugins/Flip/) is appropriate for deliberate
  layout-state transitions, but no current NARMA interaction changes layout
  state, so it is not added speculatively.
- [Observer](https://gsap.com/docs/v3/Plugins/Observer/) can normalize gesture
  intent, but the site does not need swipe or wheel hijacking; adding it would
  increase interaction risk without a current user task.
- [`gsap.matchMedia()`](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/) and
  [`gsap.context()`](https://gsap.com/docs/v3/GSAP/gsap.context/) remain the
  required boundaries for responsive setup and cleanup.
- [WCAG animation guidance](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
  and [web.dev reduced-motion guidance](https://web.dev/articles/prefers-reduced-motion)
  support removing non-essential movement and preserving a complete static
  experience.

Deferred ideas include a case-study image sequence, a layout-state transition
between project filters, and route continuity. They require real project
imagery, an approved filter model, or a defined navigation need before
implementation; they are not being added as decorative effects.

## GSAPify audit — 2026-10-15

Reviewed the GSAPify catalogue and its React, ScrollTrigger, timeline,
SplitText, and text-animation guidance:

- React animation setup belongs in a lifecycle-scoped effect and must clean up
  timelines, listeners, and ScrollTriggers. NARMA uses `gsap.context()` and
  `gsap.matchMedia()` in the hero, archive, and scroll experiment.
- Timelines are useful when phases have a deliberate relationship. The
  signature experiment uses one finite scrubbed timeline instead of unrelated
  scroll listeners.
- ScrollTrigger is appropriate for finite reveals and scrubbed composition
  changes. NARMA uses `ScrollTrigger.batch()` for archive cards and a pinned
  experiment with a finite end distance; it does not hijack wheel or touch
  scrolling.
- Staggered text/image reveals and `quickTo()` pointer response are retained
  only where they communicate hierarchy or physical response.
- SplitText-style text splitting is deferred. The project does not need a
  paid/plugin-dependent text effect, and CSS/semantic text must remain the
  complete fallback.
- Decorative presets, infinite loops, cursor-following effects, and route
  transitions were not added because they do not solve a current NARMA user
  task and would increase motion/performance risk.

The selected GSAPify-inspired addition is a sticky navigation state: after the
user scrolls beyond the hero threshold, the shared header gains a translucent
surface, compact height, and clear separation from the page. It preserves the
same links and logo, does not cover content, and returns to its full state when
the user scrolls back to the top.

The Studio page also uses an original Word Slide editorial section inspired by
the premium collection’s scroll-led typography pattern. The full statement is
semantic text in the DOM. In no-preference mode, a finite pinned timeline
reveals each word in sequence; reduced-motion mode skips the timeline and
shows the complete statement immediately.

The homepage capabilities map combines the first two GSAPify Premium
Collection patterns in one finite interaction: the category cards begin as a
centered stack, fan into a spread, then advance one at a time as a card
slider while the right-hand stage is pinned. The cards use NARMA category
content rather than copied demo labels or visual styling. All twelve category
records remain in the DOM. The timeline is limited to medium-and-larger
viewports with no motion preference; small screens and reduced-motion mode
use the readable stacked list instead. The interaction does not intercept
wheel or touch input, and its ScrollTrigger is scoped and cleaned up with the
component lifecycle.

## Current implementation update — 2026-10-15

The homepage visual-study composition uses the approved finite, pinned
ScrollTrigger pattern. Three semantic stage labels remain present in the DOM;
the artwork transforms through each stage. Reduced-motion and small-screen
layouts use the complete static composition. The services and work sections use
finite batch reveals, with complete content available when motion is reduced.

Capabilities combine the first two GSAPify Premium Collection patterns: cards
spread from a stack and then advance as a slider. This is enabled only at
1024px and above when the user has no reduced-motion preference. Smaller
screens and reduced-motion mode retain every category in a two-column or
single-column grid. The pinned range is finite and does not intercept wheel or
touch input. The current timeline is scoped to the component lifecycle.

The campaign gallery remains an optional WebGL enhancement; its
reduced-motion and unsupported-WebGL states show linked local campaign images,
and vertical touch scrolling remains available over the gallery. The Studio
word sequence remains a separate pinned text treatment.

## React Bits Pro reference — 2026-10-15

Reviewed the public UI & Cards catalog and the Hover Preview, Loupe Image, and
Gradient Carousel component pages. An original loupe adaptation is reused on
the supplied service/category imagery across Home and Studio. The shared image
card also supports approved work imagery when project records are supplied;
the current work archive is empty. The underlying image remains visible and
keeps its intrinsic proportions; the magnified layer is decorative, works only
with a fine pointer, and is hidden for coarse pointers and reduced-motion
preferences. The NARMA-styled discovery control is also shared by navigation,
page CTAs, and the contact form submit action. No demo assets or source code are
used.

Reference: [GSAPify](https://gsapify.com/). Official GSAP API documentation
remains the implementation authority.
