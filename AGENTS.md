# AGENTS.md

## Project Overview

Sanity powered Next.js application. We are using Sanity's headless CMS to manage content, and Next.js for the frontend.

📦 management is done with `bun`.

## Code style

- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible
- Biome for linting and formatting
- File naming: **kebab-case** (especially for components and routes).
- Tailwind CSS for styling
- TypeScript: keep it strict; avoid adding explicit return types unless there’s a specific TS reason.
- TypeScript: Avoid `as` type assertions unless there is a justified reason.
- React hooks: Encapsulate logic in custom hooks where appropriate.
- React components: use function declarations, not arrow functions.
- Prefer self-documenting code; use TSDoc but keep it minimal (no type re-statements).
- Avoid unnecessary braces for single-statement control flow.

## Workflow (how to collaborate with me)

- Keep diffs small and targeted.
- Ask more questions rather than making assumptions.

## Agent Skills Map

Project skills live only in `.agents/skills/` and are locked in `skills-lock.json`. Read the matching `SKILL.md` (and only needed `references/`) before domain work. Do not reinstall or broaden the skill set unless explicitly asked. To refresh locked skills (global `skills` CLI), see [README.md](./README.md#agent-skills).

| Skill | Use when |
| --- | --- |
| `sanity-best-practices` | Schemas (`defineType` / `defineField`), GROQ / `defineQuery`, TypeGen, Portable Text, images, Studio structure, Visual Editing, Sanity + Next.js |
| `content-modeling-best-practices` | Content architecture, field shapes, references vs embedded objects, taxonomies, avoiding page-shaped schemas |
| `seo-aeo-best-practices` | Page/metadata SEO, Open Graph, sitemaps, `robots.txt`, JSON-LD, EEAT, AI-answer (AEO) readiness |
| `frontend-ui-engineering` | Building or changing user-facing UI, layouts, accessibility, component state |
| `frontend-design` | New or reshaped visual design, typography, distinctive aesthetic direction |
| `vercel-composition-patterns` | Compound components, boolean-prop cleanup, flexible component APIs, React 19 composition |
| `vercel-react-best-practices` | React/Next performance: waterfalls, bundle size, RSC boundaries, re-render and data-fetch patterns |
| `web-design-guidelines` | UI/UX accessibility or interface-guideline audits |
| `code-review-and-quality` | Before merge; multi-axis review of agent or human changes |
| `lte-writing` | Drafting letters to the editor / accountability journalism LTEs |
| `find-skills` | Discovering installable skills when a capability seems missing |

### Routing rules

- Prefer the single most specific skill first; load a second only when the task truly crosses domains.
- Sanity schema/Studio/GROQ/TypeGen → `sanity-best-practices`. Content model design debates → also `content-modeling-best-practices`.
- Public page SEO/metadata/structured data → `seo-aeo-best-practices`. CMS-driven metadata field work → pair with `sanity-best-practices`.
- UI implementation → `frontend-ui-engineering`; visual direction → `frontend-design`; component API shape → `vercel-composition-patterns`; React/Next performance → `vercel-react-best-practices`.
- Finish non-trivial changes with `code-review-and-quality` before calling the work done.

## Sanity Workflow

- Studio + schema live under `sanity/`; the Next.js app consumes content from `app/`.
- When working with Sanity, follow `.agents/skills/sanity-best-practices/SKILL.md` and load only the relevant references (usually `schema`, `groq`, and/or `nextjs`).
- Prefer typed GROQ (`defineQuery`) and the repo TypeGen flow (`bun run typegen`) over untyped queries and hand-written content interfaces.
- Model relationships with `reference` fields; let Sanity generate ordinary document `_id`s; use explicit IDs mainly for Studio-controlled singletons.
- Fetch on the server by default in the Next.js App Router. Do not invent a parallel client data layer when server fetch + skill guidance covers it.
- After schema changes: update Studio structure if needed, refresh TypeGen, and smoke-check Studio + website.

## SEO Routing Instructions

- Default SEO/AEO work → `.agents/skills/seo-aeo-best-practices/SKILL.md` (`technical-seo`, `structured-data`, `eeat-principles`, `aeo-considerations` as needed).
- CMS-driven metadata → also Sanity `references/seo.md` plus schema/GROQ refs if fields or queries change.
- Use Next.js `metadata` / `generateMetadata` (not ad-hoc `<head>` tags). Canonical/OG/JSON-LD URLs should match the production domain and visible page content.
- Prefer generated `sitemap` / `robots` from the real route inventory over stale hand-maintained path lists.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
