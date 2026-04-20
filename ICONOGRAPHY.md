# Iconography — Meso

## Library

**Lucide** (`lucide.dev`) is the canonical icon library. Its stroke-based aesthetic — 1.5px rounded strokes, open shapes, generous interior space — aligns with the Meso wave mark.

### CDN usage (prototypes, docs)
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<i data-lucide="users" style="width:20px;height:20px;color:#6B6966"></i>
<script>lucide.createIcons();</script>
```

### React usage (app code)
```bash
npm install lucide-react
```
```jsx
import { Users, Workflow, Network, Shield } from 'lucide-react';
<Users size={20} strokeWidth={1.5} />
```

## Sizes

| Size | Use | Stroke |
|---|---|---|
| `16px` | Compact contexts — table cells, pills, inline labels, breadcrumbs | 1.5px |
| `20px` | Default — sidebar nav, buttons, form fields, section labels | 1.5px |
| `24px` | Feature — card icons, callouts, empty states | 1.5px |

## States

| State | Treatment |
|---|---|
| **Rest** | Outlined (`stroke` only, no fill), colour `var(--text-secondary)` |
| **Hover** | Colour shifts to `var(--text-primary)` — 150ms ease-out |
| **Active / selected** | **Filled** variant (where available) + colour `var(--teal)` |
| **In teal-soft nav pill** | Filled + `var(--teal)` |
| **Disabled** | `opacity: 0.40`, cursor not-allowed |

## Recommended icon set for Meso product

Map each product concept to a specific Lucide icon to keep the vocabulary tight:

| Concept | Lucide icon |
|---|---|
| Overview / dashboard | `layout-grid` |
| People / users | `users` |
| Teams | `users-round` |
| Roles | `id-card` |
| Organisations / orgs | `building-2` |
| Graph / operating model | `share-2` / `git-graph` |
| Workflows / approvals | `workflow` |
| Decision rights | `gavel` |
| Dependencies | `network` |
| Integrations | `plug` |
| Authority / permissions | `shield` / `shield-check` |
| Temporal / history | `history` / `clock` |
| Search | `search` |
| Settings | `settings` |
| Notifications | `bell` |
| Add | `plus` |
| More | `more-horizontal` |
| Chevron (menus) | `chevron-down` / `chevron-right` |
| External link | `arrow-up-right` |
| Check (success) | `check` / `check-circle-2` |
| Alert | `alert-triangle` |
| Info | `info` |

## Brand marks (never redraw)

The wave mark + wordmark are in `assets/`. Always copy, never recreate:

- `assets/mark-ink.svg` — mark on light
- `assets/mark-stone.svg` — mark on dark
- `assets/mark-teal.svg` — mark in teal (rare — only app icon/favicon)
- `assets/logo-ink.svg` — mark + wordmark on light
- `assets/logo-stone.svg` — mark + wordmark on dark

**Mark specs:** two stacked wave paths, `stroke-width: 5`, `stroke-linecap: butt` (flat terminal), `stroke-linejoin: round`. The atmospheric layers of the mesosphere — never round the terminals, never change the weight.

## What's not used

- **No emoji.** Ever. Product, marketing, docs — none.
- **No Unicode as icons** except the arrow `→` on ghost buttons.
- **No coloured icons** beyond the active-teal state.
- **No third-party icon sets** beyond Lucide without founder approval.
- **No hand-drawn SVG** to fill gaps — if Lucide doesn't cover it, ask.
