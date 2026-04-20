# Meso Design System

> **Quiet authority. Infrastructure-grade precision.**
> The system of record for how your organisation actually works.

---

## About Meso

Meso is **operating model infrastructure** for enterprises — a living graph of structure, accountability, decision rights, and workflows that both humans and AI agents can rely on. Most companies above 200 people operate on an implicit model that exists nowhere queryable. Meso makes it explicit, machine-readable, and maintained (because approval workflows, Jira assignment, and MCP-connected AI agents all break when it's wrong — that's the forcing function).

**Primary users:** CIOs, COOs, CHROs and their chiefs of staff at 200–500 person technology scale-ups and mid-market enterprises in **DACH and Benelux**.

**Brand register:** serious enterprise software that a McKinsey partner finds credible and a Berlin CTO trusts with organisational data. Warm, precise, confident, never cute. The brand in one sentence: *quiet authority, infrastructure-grade precision — warm enough that a COO in Amsterdam feels at home, technical enough that a CTO in Berlin trusts it with organisational data.*

---

## Sources

- `uploads/meso-design-system.html` — full v1.0 system (mirrored at `reference/meso-design-system.html`).
  Contains: colour tokens, typography scale, spacing, motion, buttons, cards/shadows, labels, pills, inputs, nav, toasts, modals, tables, skeletons, iconography guidance.
- Founder brief (inlined in the initial prompt) — confirmed component decisions, brand voice, copy samples, and surfacing rules.

### Deferred surfaces (NOT yet specced — do not invent)

Two areas are intentionally unresolved and must be discussed with the founder before design work:
1. **Graph canvas view** — nodes (people/roles/teams), edges (relationships/dependencies), hover/select states, zoom, minimap.
2. **Data visualisation** — org health metrics, coverage gaps, decision-rights completeness, dependency density.

If asked for either, **pause and ask** rather than invent.

---

## Content fundamentals

Meso's voice is the spine. Get the words right and everything else snaps into place.

### Tone
- **Assertive, not loud.** Declarative statements. "Meso is the system of record." Not "Meso helps you be…"
- **Technical specificity over abstract claim.** "Approval workflows route through it. Jira auto-assigns based on it. AI agents query it via MCP." — never "integrates with your tools."
- **Consequences over features.** "When Meso is wrong, things break" — the mechanic, not the marketing.
- **Human, warmed. Never cute.** No emoji in product or marketing. No exclamation marks. No "let's".

### Casing
- **Sentence case everywhere.** Buttons, nav, CTAs, headings beyond hero — all sentence case. "Request access", not "Request Access".
- **Lowercase "meso"** in the wordmark, always. Never capitalise the M, even at sentence start in logo contexts.
- **Uppercase is avoided.** Style-A section labels (e.g. `Operating model`, `01 — Colour`) render in Funnel Display 600, 12px, sentence case, with −0.2px tracking — not tracked-uppercase Inter.

### Person
- **"You"** for the reader (COO, CIO, CHRO). **"Meso"** for the product. **"Your organisation"**, **"your operating model"**.
- Avoid "we". The product speaks, not a marketing department.

### Rhythm & length
- Short declarative openers, followed by a specific, consequential elaboration. The voice has a rhetorical cadence — **claim → mechanism → consequence**.
- Examples from the brief:
  - *"Meso is the system of record for how your organisation actually works."* → claim.
  - *"When someone needs to know who can approve an emergency infrastructure spend, or which team owns authentication, the answer takes hours."* → mechanism.
  - *"When AI agents need to know who has authority to act, there is no answer at all."* → consequence.

### Vocabulary (use these)
- **Operating model, system of record, authority layer, decision rights, forcing function, temporal audit, living graph, queryable, machine-readable, governance infrastructure.**
- Technical-specific nouns: *MCP, REST API, Jira, Confluence, reorg, dependency archaeology.*

### Vocabulary (avoid)
- "Platform", "solution", "empower", "unleash", "streamline", "delight", "journey", "seamless".
- "AI-powered" (too vague — say what it does: *queryable via MCP*).
- Startup-y verbs: "supercharge", "accelerate", "unlock".

### Numbers & metadata
- Use metric phrasing where natural: *"200–500 people", "DACH and Benelux", "v1.0 · 2026"*.
- Tabular numerals in UI (already set via `font-variant-numeric: tabular-nums` on monospace + label classes).

### Emoji & iconography in copy
- **No emoji. Ever.** Not in product, not in marketing, not in docs.
- Unicode arrow `→` is acceptable on ghost buttons ("Learn more →").
- Em dashes `—` and middle dots `·` are part of the house rhythm.

### Voice in error states
- Specific and acting-person-oriented. *"Team name already exists in this workspace."* — not *"Oops! Something went wrong."*
- Never blame the user. State the condition.

---

## Visual foundations

### Colour — the most important rule
- **Three surfaces.** Stone `#F4F3F0` (page — never pure white). White `#FFFFFF` (card only). Ink `#141412` (brand, primary text, dark surface).
- **One accent:** Meso teal `#1A6B5C`. The *only* colour that should feel "branded". Everything else is neutral.
- **Four secondary accents — blue/indigo/amber/rose — exist only as radial gradient blooms.** Never flat fills, never text, never buttons. Always alongside teal, never alone. On dark surfaces: 28–40% opacity. On stone surfaces: 8–14% opacity — barely there, more atmosphere than colour.
- **Maximum two colours per surface including teal.** Discipline, not variety.

### Typography
- **Funnel Display (600, 700)** — all display/headings. Negative tracking always (−0.4px at 20px → −3px at hero). Never below 18px.
- **Inter (400, 500, 600)** — all body, UI, labels, metadata. Never positive tracking. Section labels (Style A) use Funnel Display 600 at 12px with sentence case — not uppercase-tracked Inter.
- **JetBrains Mono / SF Mono / Fira Code** — tokens, code, IDs. 11–13px, lh 1.8, often tinted teal.
- **Sentence case everywhere.** This is the single clearest voice marker.

### Backgrounds
- Default: flat stone. No repeating patterns, textures, or decorative illustrations.
- Hero / marketing: a single radial-gradient **bloom** — teal-primary or teal + one secondary accent, positioned top-right or top-right + bottom-left.
- Dark hero: `#0F0F0D` ink with teal bloom at 38%. Stone hero: base stone with teal bloom at 18%.
- **No** full-bleed imagery, **no** hand-drawn illustrations, **no** mesh gradients, **no** noise overlays.

### Animation
- **150ms ease-out** for hover interactions (buttons, cards, icons).
- **200ms ease-out** for layout (sidebar expand, modal enter).
- **400ms ease-out, 60ms stagger** for scroll entrances — fade + 12px upward translate.
- **1.4s ease-in-out infinite** for skeleton shimmer.
- **Never** bounce, spring, or linear. Never. This is a quiet-authority brand — nothing squishes.

### Hover states
- **Buttons — primary:** opacity `0.88`. **Secondary:** border strengthens (border-mid → border-strong) + background lifts to stone-2. **Teal:** opacity `0.90`. **Ghost:** colour shifts text-secondary → ink.
- **Cards:** shadow-1 → shadow-2, `translateY(-2px)`. No colour change.
- **Rows (tables, nav):** background lifts to stone (light) or rgba(255,255,255,0.03) (dark).
- **Icons (nav):** outlined → filled on active/selected; colour shifts text-secondary → teal.

### Press / active states
- Buttons: no shrink. Brief opacity dip (0.72) on mousedown is acceptable, immediately recovering.
- Active nav: teal-soft pill background + filled icon + teal Inter-500 label.

### Borders
- **Cards have no borders.** Shadows define the edge.
- Inputs, nav separators, table dividers use hairlines: `rgba(20,20,18,0.09)` default, `0.14` mid, `0.22` strong.
- Rule boxes (docs only) use a 3px teal left-border accent.

### Shadows
- Three levels, cards only — **never** borders on cards.
  - `--shadow-1`: `0 2px 8px rgba(0,0,0,0.06)` — rest.
  - `--shadow-2`: `0 4px 16px rgba(0,0,0,0.10)` — hover + dropdowns.
  - `--shadow-3`: `0 16px 48px rgba(0,0,0,0.18)` — modals + toasts.
- No inner shadows. No coloured shadows.

### Capsules / pills
- 5px radius (not pill-shaped), 3px × 10px padding, 11px Inter 500, 5×5px dot for status.
- Pills are for state, not for decoration. Use sparingly.

### Transparency & blur
- **Rarely used.** No glassmorphism. No frosted bars.
- Overlays use a flat rgba backdrop (`rgba(0,0,0,0.50)`) — no backdrop-filter blur.
- Opacity-based fills only on dark surface (pills, borders) to keep the palette disciplined.

### Imagery tone (when imagery is added)
- Warm but neutral — think architecture, topology, abstract layered forms. Never stock photography of "business people smiling".
- Muted palette; occasional teal tint. No hyper-saturated photography.
- Mesosphere / atmospheric-layer motifs are conceptually aligned (the wave mark references this).

### Corner radii — consistent grammar
- `5px` pills · `8px` buttons + inputs · `12px` cards + toasts · `16px` modals.
- Nothing above 16px. No fully pill-shaped elements.

### Cards — the single unit of composition
- `var(--white)` surface, `var(--radius-lg)` (12px), **no border**, **shadow-1 at rest**, 36–40px internal padding.
- Hover: shadow-2 + `translateY(-2px)`. 150ms ease-out.
- Grid layout: 3px gaps between adjacent cards (almost touching — negative-space precision).

### Layout rules
- Max content width `1040px`. Page horizontal padding `48px` desktop, `20px` mobile.
- Section vertical padding `80px` (standard), `120px` (hero).
- Card grid gap `3px`. Related content gap `24px`. Column gap `48px`.
- Sidebar fixed at `60px` collapsed → `200px` on hover.

### Dark mode
- Fully supported. System preference default; user can override in settings.
- Every token has a dark equivalent (see `colors_and_type.css`). Opacity-based fills on dark rather than new hex values.
- Imagery, skeletons, borders, shadows all adapt.

---

## Iconography

See `ICONOGRAPHY.md` for the full writeup. Short version:

- **Lucide icon library** — CDN linked (`lucide@latest`). Matches the wave-mark stroke aesthetic (1.5px stroke at 20px, rounded joins, open shapes).
- **Sizes:** `16px` compact (tables, pills, breadcrumbs), `20px` default (nav, buttons, labels), `24px` feature (card icons, callouts).
- **States:** outlined at rest, filled on active/selected. Colour shifts `text-secondary` → `teal` on active.
- **No emoji.** Period.
- **No Unicode chars as icons** except the arrow `→` on ghost buttons.
- **SVG paths** for the wave mark are in `assets/mark-*.svg` and `assets/logo-*.svg` — never redraw, always copy.

---

## Index — this folder

| Path | What it is |
|---|---|
| `README.md` | This file — brand context, content + visual fundamentals. |
| `SKILL.md` | Agent Skill manifest — compatible with Claude Code. |
| `ICONOGRAPHY.md` | Icon library, sizing, and usage rules. |
| `colors_and_type.css` | CSS custom properties — tokens, type classes, gradient blooms. Import this into every Meso artifact. |
| `assets/` | Logos, marks, and any brand visual assets. |
| `preview/` | Individual design-system cards registered for the Design System tab. |
| `reference/meso-design-system.html` | Source-of-truth HTML design system as shipped by the founder. |
| `ui_kits/meso-app/` | Interactive UI kit for the Meso product app (React/JSX). |
| `uploads/` | Original uploaded artefacts. |

### UI Kits
- `ui_kits/meso-app/` — operating-model product UI: sidebar, list/detail patterns, workflow components. Covers headers, tables, nav, buttons, forms, toasts, modal. Graph canvas and data-viz are deliberately **not** included (see deferred surfaces above).

---

## Rules cheat sheet (for rapid review)

- Never pure white page background — use stone.
- Never an accent colour without teal on the same surface.
- Never a colour as a flat fill except teal, ink, and stone.
- Never a border on a card.
- Never a heading in Inter.
- Never a body line in Funnel Display.
- Never positive tracking on Inter.
- Never Funnel Display below 18px.
- Never an emoji.
- Never sentence-initial "Meso" capitalised to "MESO" or "Meso"-uppercase in display.
- Never a linear or bouncy animation.
- Sentence case always. Style-A section labels use Funnel Display 600 at 12px, sentence case — never uppercase-tracked Inter.
