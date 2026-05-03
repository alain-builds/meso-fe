# Tokens — reference

## Imports

```ts
// Named — preferred for component files
import { colorVars, spacing, radii, duration, easing } from '@/tokens'

// Full object — for theme providers or one-off access
import { tokens } from '@/tokens'
```

## Spacing scale

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

## Motion durations

| Token | Value | Use |
|---|---|---|
| `fast` | 100ms | Hover fills, icon colour shifts |
| `micro` | 150ms | Hover interactions: buttons, cards, icons |
| `medium` | 200ms | Layout transitions: sidebar expand, modal enter |
| `slow` | 400ms | Scroll entrances: fade + 12px upward translate |
| `stagger` | 60ms | Per-item delay for staggered lists |

## Effects

Shadows (`sm` / `md` / `lg`) and radii (`sm` / `md` / `lg` / `xl`) are defined in `effects.ts` with inline comments.

## Typography

CSS classes (preferred over inline `typeScale.*`):

| Class | Use |
|---|---|
| `t-h1` … `t-h3` | Headings |
| `t-body-lg`, `t-body`, `t-body-sm` | Body text |
| `t-ui` | UI controls, labels |
| `t-label-a`, `t-label-b` | Section labels |
| `t-mono` | Tokens, IDs, code |
