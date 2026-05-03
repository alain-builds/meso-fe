# Meso FE — Claude guidance

## Architecture

**Stack:** React 18 (JSX) · Vite 6 · TypeScript tokens · inline styles via token vars · no CSS modules, no Tailwind, no URL router, no external state library.

**Directory layout:**
```
meso-fe/
├── tokens/               # Design system — colors, typography, spacing, motion, effects
├── colors_and_type.css   # CSS custom properties; dark mode source of truth
└── ui_kits/meso-app/     # Vite root — the entire application lives here
    ├── main.jsx          # App entry; all global state (useState hooks) lives here
    ├── Shell.jsx         # Sidebar + Header chrome
    ├── Components.jsx    # Shared UI: Icon, Button, Pill, Modal, Toast
    ├── NodeDetailShell.jsx  # Detail-view wrapper (tab nav, back button)
    ├── TeamsScreen.jsx
    ├── nodes/            # One folder per entity type
    │   ├── person/       # PeopleScreen, PersonDetail, tabs/
    │   ├── role/         # RolesScreen, RoleDetail, tabs/
    │   └── team/         # TeamDetail, tabs/
    └── shared/           # Cross-feature components and utilities
```

**Navigation:** State-driven, not URL-based. `active` (string) controls which section is visible; `openTeam / openPerson / openRole` control which detail view is open. `navigateTo(id)` clears all detail state; `closeNode()` returns to the list. No React Router.

**Global state** (all in `main.jsx`):

| State | Purpose |
|---|---|
| `active` | Current section (people, roles, teams, …) |
| `openTeam / openPerson / openRole` | Which entity detail is open |
| `modal` | Team-removal confirmation dialog |
| `toast` | Ephemeral notification — auto-dismissed after 4 s |
| `loading` | Boot skeleton (800 ms) |
| `titleVisible` | Header title visibility toggle |


## Development workflow

For every non-trivial task, follow these steps in order. Do not skip ahead.

| Step | Command | Principle |
|---|---|---|
| 1. Define what to build | `/spec` | Write a spec before writing code |
| 2. Plan how to build it | `/plan` | Break into small, atomic tasks |
| 3. Build incrementally | `/build` | One slice at a time — verify before expanding |
| 4. Prove it works | `/test` | Tests are proof, not confidence |
| 5. Review before merge | `/review` | Improve code health |
| 6. Simplify the code | `/code-simplify` | Clarity over cleverness |
| 7. Ship to production | `/ship` | Faster is safer |

Bug fixes follow a shorter path: `/test` (write a failing test first) → fix → `/review`.  
Do not begin implementation without a spec. Do not merge without review and simplification.

---

## Design system

Source of truth: `colors_and_type.css` (CSS custom properties) and `tokens/` (TypeScript). Import `colors_and_type.css` once at the app root. Never duplicate token values inline.

---

## Token usage

Two layers serve two purposes:
- **`colorVars.*`, `spacingVars.*`** — CSS var strings; use in inline styles so dark mode applies at runtime.
- **`colors.*`, `spacing.*`** — raw values for JS-only contexts (Framer Motion, canvas, tests).

Never hardcode hex values or pixel sizes. Always reference a token. See `tokens/README.md` for the scale reference and import patterns.

---

## Colors

- The only branded accent is `teal`. Everything else is neutral.
- `blue`, `indigo`, `amber`, `rose` are bloom-only — radial gradients alongside teal, never as flat fills, text, or button colour.
- Page background is always `stone`. `white` is card surface only.
- Maximum two colours per surface, including teal.

---

## Typography

- Headings (hero → h3): `fontFamilies.display` (Funnel Display). Never Inter for headings.
- Body, UI, labels, metadata: `fontFamilies.body` (Inter). Never Funnel Display below 18px.
- `fontFamilies.mono` (JetBrains Mono) for tokens, IDs, code only.
- Sentence case everywhere. No uppercase-tracked Inter.
- Never positive letter-spacing on Inter.
- Prefer CSS classes (`t-h1`, `t-body`, `t-label-a`, `t-mono`) over inline `typeScale.*` where possible.

---

## Motion

- `easing.out` for hover and entrance. `easing.in` for exit only.
- Never `linear`, `bounce`, or spring — quiet-authority brand.
- Skeleton shimmer: `1.4s ease-in-out infinite` (defined in component CSS, not a token).

---

## Effects

- Cards: no border, shadow defines the edge. `shadows.sm` at rest → `shadows.md` on hover with `translateY(-2px)`.
- Shadows on cards only — never text, icons, or buttons. No inner or coloured shadows.
- Radii: `sm` pills · `md` buttons + inputs · `lg` cards + toasts · `xl` modals. Nothing above 16px.

---

## Dark mode

- Always use `colorVars.*` in inline styles so dark mode tokens apply at runtime.
- Raw `colors.*` values are light-mode baseline only — use only in JS-only contexts.
- `darkColors` is exported for reference (e.g. JS theme providers) but the CSS layer is the primary mechanism.

---

## Component patterns

### Icon-only button centering
Never remove container padding to centre an icon. Keep padding constant; change `justifyContent` on the button instead:

```tsx
// BAD — padding removed when collapsed; button bleeds to edge
<div style={{ padding: expanded ? `${spacing.m} ${spacing.s}` : `${spacing.m} 0` }}>
  <button style={{ justifyContent: 'space-between' }}>…</button>
</div>

// GOOD — padding constant; button centres its own content
<div style={{ padding: `${spacing.m} ${spacing.s}` }}>
  <button style={{ justifyContent: expanded ? 'space-between' : 'center' }}>…</button>
</div>
```

### Module-scope constants as props
Never pass a module-scope constant as a prop under the same name — the prop shadows the binding and callers that omit it silently get `undefined`:

```ts
// BAD
const NavItem = ({ micro }) => <button style={{ transition: `background ${micro}` }} />

// GOOD — reference the module constant directly
const NavItem = () => <button style={{ transition: `background ${micro}` }} />
```

### Data arrays
Object form for all data lists — never array-of-arrays (positional tuples):

```ts
// BAD
[['settings', 'Settings'], ['info', 'Support']].map(([icon, label]) => …)

// GOOD
const BOTTOM_NAV = [{ icon: 'settings', label: 'Settings' }, { icon: 'info', label: 'Support' }]
```

### Default props
Never use real user data as a prop default — use an obviously generic placeholder so a missing prop renders visibly wrong:

```ts
// BAD
user = { initials: 'AD', name: 'Alain Dunphy', role: 'Admin' }
// GOOD
user = { initials: 'U', name: 'User', role: 'Member' }
```

### Layout jump prevention
When a component has two render states (e.g. collapsed/expanded), use a shared named height constant for both branches. Mismatched heights cause a visible jump during width transitions.

### Token gaps
When a value has no token and a local constant is the only option, that is a signal to add it to the design system — add to `colors_and_type.css` and the relevant `tokens/*.ts`, then import normally.

### Navigation landmarks
Every visually distinct navigation region needs a semantic `<nav aria-label="…">`. Main nav and account/utility nav are separate landmarks.

### React.memo on list items
Wrap nav/list item components in `React.memo` when their parent re-renders on UI state (e.g. sidebar expand on hover). Set `displayName` explicitly.

### Distinct icons per action
Never use the same icon for two different actions visible in the same layout.
