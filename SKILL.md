---
name: meso-design
description: Use this skill to generate well-branded interfaces and assets for Meso, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Key files in this skill
- `README.md` — brand context, content fundamentals, visual foundations, rules cheat sheet.
- `ICONOGRAPHY.md` — Lucide icon usage, sizing, fill/outline rules.
- `colors_and_type.css` — CSS custom properties and utility classes (drop into any artifact).
- `reference/meso-design-system.html` — full v1.0 component library (source of truth).
- `ui_kits/meso-app/` — React/JSX recreation of core product screens.
- `assets/` — logos and marks.
- `preview/` — atomic design-system cards (useful as visual reference).

## Hard rules (do not violate)
- Page background is **stone #F4F3F0** — never pure white. White is for cards only.
- **Teal #1A6B5C is the only branded colour.** Secondary accents (blue/indigo/amber/rose) only appear as radial gradient blooms, never flat fills, never text, never button colours, always alongside teal.
- Bloom opacity: **28–40% on dark surfaces, 8–15% on stone.** Max two colours per surface including teal.
- **Funnel Display** (600–700) for display/headings, never below 18px, always negative letter-spacing.
- **Inter** (400–600) for all body/UI. Never positive tracking. Sentence case everywhere. Style-A section labels use **Funnel Display 600 at 12px, sentence case** (−0.2px tracking) — not uppercase-tracked Inter.
- Buttons: 8px radius, sentence case, primary = ink fill, secondary = outline.
- Cards: 12px radius, shadow only (never a border), 36–40px padding.
- Motion: 150ms ease-out (hover), 400ms ease-out + 60ms stagger (entrance). No bounce, no spring, no linear.
- Icons: Lucide — 20px default, outlined at rest, filled on active.
- **Never invent the graph canvas view or data visualisation** — both are deferred. Use a placeholder card and flag to the user.

## Quick-start: importing the system
```html
<link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="colors_and_type.css">
```
