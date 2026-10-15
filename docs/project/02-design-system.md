# Design system

## Status

The palette and layout rules are **locked starting values**. They must be validated in the prototype rather than treated as inflexible values for every element.

## Color tokens

| Token | Hex | Intended use |
|---|---|---|
| Canvas | `#F7F4EE` | Warm primary background |
| Paper | `#FFFEFB` | Elevated/light paper surfaces |
| Ink | `#171716` | Primary text and dark surfaces |
| Stone | `#E9E3D9` | Dividers, subtle surfaces, supporting contrast |
| Gold | `#C6A36C` | Restrained champagne-gold accent |
| Muted | `#68665F` | Secondary text |

Use the supplied official logo assets in `public/brand/`:

- `narma-symbol.svg` — symbol-only mark
- `narma-symbol-wordmark.svg` — symbol with wordmark
- `narma-wordmark.svg` — wordmark-only lockup

These source SVGs are transparent and should be used directly; do not add a background rectangle, remove a nonexistent background, reconstruct the mark from screenshots, or replace it with an invented approximation.

The supplied design SVGs live in `public/artwork/` and are reserved for original site artwork and visual experiments. Preserve them as SVG assets and do not present them as portfolio project imagery without verified project context.

## Layout

| Context | Rule |
|---|---|
| Desktop content width | Approximately 1,440px maximum |
| Desktop gutters | Fluid, approximately 24–40px |
| Tablet gutters | Approximately 24px |
| Mobile gutters | Approximately 18–22px |
| Desktop grid | 12 columns |
| Tablet grid | 6 columns |
| Mobile grid | 4 columns or a single-column composition |
| Section spacing | Fluid, generous, and consistent |
| Project media | Fixed aspect-ratio containers with responsive source assets |
| Typography | Fluid scale with sensible minimum and maximum sizes |

## Responsive composition

- Desktop may use overlapping SVG geometry, multi-column project layouts, expressive whitespace, and motion where it improves the story.
- Tablet should reduce overlaps, reflow projects, and preserve headline hierarchy.
- Mobile is an intentional redesign: stack content, simplify decoration, prevent horizontal overflow, and replace pointer-specific interactions with touch-friendly behavior.
- Never treat mobile as a scaled-down desktop page.
