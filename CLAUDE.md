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

## Component patterns

### Centering an icon inside a button with surrounding padding

When a button collapses to icon-only, **never remove the container padding to achieve centering**. Keep the padding and change `justifyContent` on the button instead:

```tsx
// BAD — removes padding to force alignment; button bleeds to the edge
<div style={{ padding: expanded ? `${spacing.m} ${spacing.s}` : `${spacing.m} 0` }}>
  <button style={{ justifyContent: 'space-between' }}>…</button>
</div>

// GOOD — padding always present; button centres its own content when collapsed
<div style={{ padding: `${spacing.m} ${spacing.s}` }}>
  <button style={{ justifyContent: expanded ? 'space-between' : 'center' }}>…</button>
</div>
```

This applies anywhere a button toggles between a labelled and icon-only state.

---

### Shared dimension constants
Values derived from layout constraints (e.g. sidebar width, chrome height) often don't map to the spacing scale. Extract them as named constants at the top of the file rather than repeating the literal across components:

```ts
const CHROME_HEIGHT = 60  // shared by logo strip and page header
const NAV_PAD_X     = 20  // centers a 20px icon in the 60px collapsed sidebar
```

### Module-scope constants and component props
Never pass a module-scope constant as a component prop under the same name — the prop shadows the module binding inside the component, and callers that omit the prop silently receive `undefined`.

```ts
// BAD — micro prop shadows the module constant; callers that omit it break silently
const micro = `${duration.micro} ${easing.out}`
const NavItem = ({ micro }) => <button style={{ transition: `background ${micro}` }} />

// GOOD — reference the module constant directly; it's already in scope
const NavItem = () => <button style={{ transition: `background ${micro}` }} />
```

### Data arrays
Use object form for all data lists — never array-of-arrays (positional tuples). Objects are self-documenting and consistent with every other list pattern in the codebase:

```ts
// BAD
[['settings', 'Settings'], ['info', 'Support']].map(([icon, label]) => …)

// GOOD
const BOTTOM_NAV = [{ icon: 'settings', label: 'Settings' }, { icon: 'info', label: 'Support' }]
BOTTOM_NAV.map(({ icon, label }) => …)
```

### Default props
Never use real user data as a prop default. Use a clearly generic placeholder so a missing prop renders obviously wrong, not subtly wrong:

```ts
// BAD — renders silently with a real person's name if prop is omitted
user = { initials: 'AD', name: 'Alain Dunphy', role: 'Admin' }

// GOOD
user = { initials: 'U', name: 'User', role: 'Member' }
```

### Navigation landmarks
Every visually distinct navigation region needs a semantic `<nav>` with an `aria-label`. Main nav and utility/account nav are separate landmarks:

```tsx
<nav aria-label="Account">…Settings, Support, Invite…</nav>
```

### React.memo on list items
Wrap nav/list item components in `React.memo` when their parent re-renders on UI state (e.g. sidebar expand on hover). Nine re-renders on every mouse-enter/leave is avoidable overhead:

```ts
const NavItem = memo(({ item, isActive, … }) => …)
NavItem.displayName = 'NavItem'
```

### Distinct icons for distinct actions
Never use the same icon for two different actions visible in the same layout. The global Settings nav item and a section-level settings action both used `settings` — use a contextually distinct icon (e.g. `ellipsis`) for the section-level action.

### Icon alignment with a surrounding container margin

When a button sits inside a container that has horizontal padding, the icon position shifts relative to sibling elements that have no such container. Account for the container margin in the button's own horizontal padding:

```ts
// Container adds 8px (spacing.s) on each side.
// To keep the icon at x=30 (same as nav items at paddingLeft=20):
// button paddingLeft = NAV_PAD_X − container_margin = 20 − 8 = 12
const SEARCH_PAD_X = 12  // NAV_PAD_X minus the 8px container margin
```

Use symmetric padding and `justifyContent: 'space-between'` — no conditional `justifyContent` needed. A single flex child naturally aligns to the start of the content area, so collapsed and expanded states land at the same x position.

### Prevent layout jump between toggle states

When a section has two render states (e.g. collapsed vs expanded sidebar label), always use a shared fixed-height constant for the container in both branches. Mismatched heights cause a visible vertical jump during the width transition:

```tsx
const RECORDS_HEADER_H = 28

// collapsed
<div style={{ height: RECORDS_HEADER_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <span>Rec</span>
</div>

// expanded
<div style={{ height: RECORDS_HEADER_H, display: 'flex', alignItems: 'center', … }}>
  …full header content…
</div>
```

### Token gaps belong in the token files, not in components

When a value has no token and a local constant is the only option, that is a signal to add the token to the design system — not to leave the constant in the component indefinitely. Add the value to `colors_and_type.css`, `tokens/colors.ts` (`colors` and `colorVars`), then reference it through the token import:

```ts
// BAD — local constant papers over a missing token
const WHITE_DIM = 'rgba(255,255,255,0.38)'

// GOOD — token added to the system and imported normally
colors.whiteDim  // backed by --white-dim in colors_and_type.css
```

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
- Never use raw `px` font size literals in inline styles — always reference `typeScale.*`.
- Never use array-of-arrays for component data lists.
- Never use real user data in default prop values.
- Never use the same icon for two different scoped actions in the same layout.
- Never use a list index as a React `key` when the item string itself is unique.
