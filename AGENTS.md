<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## NARMA.DESIGN project rules

The locked project specification lives in [`docs/project/`](docs/project/README.md). Read the relevant documents before changing product, visual, content, or interaction behavior.

### Source-of-truth and evidence rules

- Treat `docs/project/` as the product source of truth for this prototype. Do not infer brand decisions from the current starter UI.
- Preserve the distinction between **locked**, **illustrative**, **open**, and **verified** information.
- The supplied hero copy is illustrative until explicitly approved. Do not present it as final brand copy.
- The studio contact email is open configuration. Never invent an email address.
- Do not invent clients, testimonials, awards, performance claims, project outcomes, assets, routes, or completed QA results.
- If required information is missing, stop and identify the missing input instead of guessing.
- External inspiration links are references for art direction only, not assets, requirements, or permission to recreate another studio's work.
- Use the supplied transparent SVG assets in `public/brand/` and `public/artwork/` directly. Do not recreate the logo, add a background to transparent artwork, or treat artwork as project imagery without verified context.
- Supplied artwork may be published only as explicitly labeled self-initiated or experimental studies. Use `Undated` when no creation year is verified; never infer a date from the current year or filename.
- External portfolio imagery must have a recorded license/source URL. Label image-led records as self-initiated concept campaigns unless verified client ownership and usage rights are supplied. Do not download or republish Dribbble, Pinterest, or other third-party showcase work as if it were NARMA work.
- Interactive components adapted from external references must be reimplemented within the existing NARMA layout and accessibility rules; do not import demo-only assets, hidden dependencies, or inconsistent navigation shells.
- The homepage gallery is an approved ObsidianUI integration. Its MIT source and adaptation notes live in [`docs/vendor/obsidianui-art-gallery.md`](docs/vendor/obsidianui-art-gallery.md). Keep demo URLs and invented captions out of production content.
- Prototype behavior must not be described as production-ready until the contact backend, deployment, security, and acceptance checks are actually complete.

### Implementation verification

Before declaring work complete:

1. Check the relevant locked document and quote the requirement being implemented.
2. Verify all referenced assets, routes, data, configuration, and contact destinations exist.
3. Run the smallest applicable lint, build, or test command.
4. Report unverified acceptance criteria as unverified; never turn a target into a claim.
5. If implementation conflicts with a locked rule, surface the conflict and ask for a decision.
