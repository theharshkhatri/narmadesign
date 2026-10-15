# Content and architecture

## Status

The information architecture and data requirements are **locked** for the prototype. Exact content and supplied assets remain implementation inputs.

## Routes and shared areas

The intended structure includes:

- App shell: root layout, fonts, metadata, global styles
- Shared layout: header, footer, mobile menu
- Homepage: hero, selected work, experiment, services, CTA
- Portfolio: work index and `[slug]` case study
- Studio: philosophy, process, capabilities
- Contact: enquiry form, validation, email CTA
- Privacy: privacy information when the production flow requires it

Use the actual repository structure and existing Next.js conventions when implementing; this outline is a product architecture, not a command to invent every route immediately.

## Component responsibilities

Required contracts include `SiteHeader`, `HeroSection`, `SignatureArtwork`, `ProjectGrid`, `ProjectCard`, `CaseStudyLayout`, `ServicesSection`, `ProcessSection`, `ContactCTA`, `ProjectInquiryForm`, `SiteFooter`, and motion utilities where needed. Components should improve clarity, consistency, or functionality; do not create generic wrappers without a real responsibility.

## Typed project data

Use one central TypeScript source for homepage and work index content. Each project supports:

- `slug`, `title`, `category`, `year` (or `Undated` when no date is verified), `projectType`
- `summary`, `brief`, `concept`, `services`
- `coverImage`, `coverAlt`, `featured`, `order`
- optional case-study `sections`

Use a union for `projectType` (for example commissioned, self-initiated, or speculative concept), enforce unique URL-safe slugs, and handle optional sections without broken placeholders. Never store fake testimonials, invented clients, or unsupported outcomes.

The current work archive uses the supplied SVG assets as explicitly labeled
self-initiated visual studies. Do not present them as commissioned work, client
results, or client-owned assets. Any external image added later requires a
recorded source URL and license record.

## Contact requirements

The two useful paths are an enquiry form and direct email. Proposed fields are name, email, optional organization, service required, optional budget range, desired timeline, and project description.

The current direct email is **Open** and must not be invented. A frontend-only prototype must be labeled as such. Before production release, submission requires server-side validation/sanitization, rate limiting and abuse protection, secure handling, a real delivery destination, honest success/failure states, a privacy notice, and a retention policy.
