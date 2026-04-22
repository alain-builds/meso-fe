# Meso FE — Claude guidance

## Design system

The source of truth is `colors_and_type.css` (CSS custom properties) and `tokens/` (TypeScript).  
Import `colors_and_type.css` once at the app root. Never duplicate token values inline.

---

## Token usage

### Imports

```ts
// Named — preferred for component files
import { colorVars, spacing, radii, duration, easing } from '@/tokens'

// Full object — for theme providers or one-off access
import { tokens } from '@/tokens'
```

### Two layers, two purposes

| Layer | When to use | Example |
|---|---|---|
| CSS var strings (`colorVars`, `spacingVars`, …) | Inline styles that must respect dark mode | `style={{ color: colorVars.textPrimary }}` |
| Raw values (`colors`, `spacing`, …) | JS-only contexts: Framer Motion, canvas, tests | `animate={{ backgroundColor: colors.teal }}` |

Never hardcode hex values or pixel sizes. Always reference a token.

---

## Colors

```ts
import { colors, colorVars, darkColors } from '@/tokens'

// CSS class (preferred) — dark mode handled automatically
<p className="t-body" />

// Inline style with dark mode support
<div style={{ background: colorVars.stone, color: colorVars.textPrimary }} />

// Raw value (JS-only contexts, e.g. Framer Motion)
animate={{ backgroundColor: colors.teal }}
```

**Rules:**
- Never use `colors.blue`, `colors.indigo`, `colors.amber`, or `colors.rose` as flat fills, text colour, or button colour. These are bloom-only secondary accents — radial gradients alongside teal, never alone.
- The only branded accent colour is `teal`. Everything else is neutral.
- Page background is always `stone`, never `white`. `white` is card surface only.
- Maximum two colours per surface, including teal.

---

## Typography

```ts
import { typeScale, fontFamilies, fontFamilyVars } from '@/tokens'

// CSS classes (preferred)
<h1 className="t-h1">Heading</h1>
<p className="t-body">Body text</p>
<span className="t-label-a">Section label</span>
<code className="t-mono">token-id</code>

// Inline (e.g. dynamic headings)
<h2 style={{
  fontFamily:    fontFamilyVars.display,
  fontSize:      typeScale.h2.size,
  fontWeight:    typeScale.h2.weight,
  letterSpacing: typeScale.h2.letterSpacing,
  lineHeight:    typeScale.h2.lineHeight,
}} />
```

**Rules:**
- Headings (hero → h3) always use `fontFamilies.display` (Funnel Display). Never Inter for headings.
- Body, UI, labels, metadata always use `fontFamilies.body` (Inter). Never Funnel Display below 18px.
- `fontFamilies.mono` (JetBrains Mono) for tokens, IDs, code only.
- Sentence case everywhere. No uppercase-tracked Inter — Style-A labels use Funnel Display 600 at 12px in sentence case.
- Never positive letter-spacing on Inter.

---

## Spacing

```ts
import { spacing, spacingVars, layout, layoutVars } from '@/tokens'

// Inline
<div style={{ padding: spacing.l, gap: spacing.s }} />

// Dark-mode-safe inline (CSS vars)
<section style={{ padding: spacingVars.l }} />
```

**Scale reference:**

| Token | Value | Typical use |
|---|---|---|
| `xs` | 4px | Tight gaps, icon padding |
| `s` | 8px | Component internal gaps |
| `m` | 16px | Component padding |
| `l` | 24px | Related content gap |
| `xl` | 40px | Section sub-spacing |
| `xl2` | 48px | Column gap, page horizontal padding |
| `xl3` | 80px | Section vertical padding |
| `xl4` | 120px | Hero vertical padding |

Layout: `layout.pageMax` (1040px), `layout.pagePad` (48px desktop), `layout.pagePadMobile` (20px).

---

## Motion

```ts
import { easing, easingVars, duration, durationVars } from '@/tokens'

// CSS transition (preferred)
style={{ transition: `transform ${duration.micro} ${easing.out}` }}

// Framer Motion
transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
```

**Duration guide:**
- `fast` (100ms) — hover fills, icon colour shifts
- `micro` (150ms) — hover interactions: buttons, cards, icons
- `medium` (200ms) — layout transitions: sidebar expand, modal enter
- `slow` (400ms) — scroll entrances: fade + 12px upward translate
- `stagger` (60ms) — per-item delay for staggered lists

**Rules:**
- Always `easing.out` for hover and entrance. `easing.in` for exit only.
- Never `linear`, `bounce`, or spring easing. This is a quiet-authority brand — nothing squishes.
- Skeleton shimmer uses `1.4s ease-in-out infinite` — not covered by these tokens, defined in component CSS.

---

## Effects (shadows + radii)

```ts
import { shadows, shadowVars, radii, radiiVars } from '@/tokens'

// Card at rest
<div style={{ borderRadius: radii.lg, boxShadow: shadows.sm }} />

// Card hover (add translateY(-2px) via transform)
<div style={{ borderRadius: radii.lg, boxShadow: shadows.md }} />

// Modal
<div style={{ borderRadius: radii.xl, boxShadow: shadows.lg }} />
```

**Rules:**
- Cards: no border, shadow defines the edge. `shadow.sm` at rest → `shadow.md` on hover.
- Shadows are for cards only. Never apply to text, icons, or buttons.
- No inner shadows. No coloured shadows.
- Radii grammar: `sm` pills · `md` buttons + inputs · `lg` cards + toasts · `xl` modals. Nothing above 16px.

---

## Dark mode

Dark mode is handled automatically by `colors_and_type.css` via `prefers-color-scheme` and `[data-theme="dark"]`.

- Always use `colorVars.*` (CSS var strings) in inline styles so dark mode tokens apply at runtime.
- Raw `colors.*` values are light-mode baseline only — use in JS-only contexts (Framer Motion, canvas) where CSS vars cannot be consumed.
- `darkColors` is exported for reference (e.g. seeding a JS theme provider) but the CSS layer is the primary mechanism.

---

## What not to do

- Never hardcode `#1A6B5C`, `#F4F3F0`, or any other token value directly in component code.
- Never use secondary accent colours (blue, indigo, amber, rose) as flat fills, text, or button colours.
- Never use `white` as a page background.
- Never put a border on a card.
- Never use Inter for a heading.
- Never use Funnel Display below 18px.
- Never use a linear or bouncy animation easing.
- Never add an emoji.
