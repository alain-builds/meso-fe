# SPEC — Business Capability Map (Visual Column Layout)

**Status:** Awaiting approval  
**Replaces:** flat table in `CapabilityScreen`

---

## Objective

Replace the table on the Business Capability Map page with a visual, interactive capability map. The map follows the SAP LeanIX SaaS best-practice model: a horizontally-scrollable column layout where each L1 capability is a column, L2 capabilities are stacked cards within each column, and L3 capabilities are listed as nested items inside each L2 card. Every capability at every level is clickable and navigates to the existing `CapabilityDetail` page.

Target users: enterprise architects and product leaders using the Meso demo app.

---

## Acceptance criteria

### AC1 — Data
- `capabilityData.js` is fully replaced with the SaaS model: 8 L1 capabilities, ~50 L2 capabilities, ~2–3 L3 stubs per L2.
- Every record uses the existing shape: `id`, `name`, `description`, `parentCapabilityId`, `status`, `subCapabilities[]`, `owners[]`, `processes[]`, `valueStreams[]`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`.
- L2 and L3 stubs have `owners: []`, `processes: []`, `valueStreams: []`.
- `deriveLevel()` in `capabilityUtils.js` is unchanged and continues to derive level from `parentCapabilityId` depth.
- `DEFAULT_CAPABILITY` remains exported from `capabilityData.js`.

### AC2 — Visual layout
- `CapabilityScreen` renders a horizontally-scrollable row of columns, one per L1 capability.
- Each column (220px fixed width) contains:
  - **L1 header block** — teal background, white display-font label, full column width. Clickable.
  - **L2 card** per L2 child — white card surface with border and shadow, stacked below the header. Clickable.
  - **L3 item list** inside each L2 card — indented, smaller text, one item per line. Each item is individually clickable.
- L2 cards with no L3 children render without a sub-list section.
- The column row scrolls horizontally on overflow; the page does not scroll horizontally.

### AC3 — Hover states
- L1 header: slightly darker teal on hover (opacity overlay, no new token needed).
- L2 card: `shadows.md` + `translateY(-2px)` on hover (standard card hover pattern from CLAUDE.md).
- L3 item: `colorVars.stone` background on hover.
- All transitions use `easing.out`.

### AC4 — Click / navigation
- Clicking any capability (L1, L2, or L3) calls `onOpenCapability(cap)` with the full capability object from the flat array.
- No other navigation changes are required — `main.jsx` is untouched.

### AC5 — Page header preserved
- The "Business Capability Map" h1 header with History / Audit / Open in Canvas action buttons remains unchanged above the map.

### AC6 — No regressions
- `CapabilityDetail` and all its tabs continue to work for all capabilities.
- All existing Vitest tests pass.

---

## SaaS capability model (source: LeanIX SaaS Best Practices poster)

### L1 → L2 structure

| # | L1 | L2 children |
|---|----|----|
| 1 | **Product Development** | Product Planning · Software Engineering · Product Quality Management · Code Analytics · Code Security · UI/UX Design · Source Code Management |
| 2 | **Platform & Service Operations** | Software Release Management · Infrastructure Services · Platform Configuration · Platform Analytics & Telemetry · Platform Governance |
| 3 | **Account Management** | Account Analytics · Account Database & List Services · Lead & Opportunity Management · Forecasting & Performance Management · Quotes & Proposals · Technical Product Support · Partner Management · Supplier Management & Procurement |
| 4 | **Enterprise Support** | Contract Management · Travel Management · Facility Management & Services · Project Delivery · Relationship Management · Reporting · Employee Productivity · Content Sharing · Online Conferencing |
| 5 | **Demand Generation** | Campaign Management · Social Engagement · Website Management · Search Engine Optimisation · Event Marketing · Customer Value Propositions · Advertising · Email Marketing |
| 6 | **People Operations** | Salary & Commissions · Employee Onboarding · Training & Education · Recruitment & Hiring · HR Analytics & Reporting · Talent Management · Employee Data Management |
| 7 | **Financial Services** | Accounting · Controlling · Payments · Tax · Billing & Dunning · Expense Approval |
| 8 | **IT Management** | Mobile Device Management · Enterprise Architecture Management · Information Security & Compliance · Application Management · Identity & Access Management · IT Support |

### L3 stubs (representative examples per L2)

Each L2 gets 2–3 L3 children. Names should be sensible sub-capabilities; descriptions may be a single sentence. Full list defined in implementation. Examples:

- **Product Planning** → Product Roadmap Management · Feature Prioritisation · Release Planning
- **Software Engineering** → Frontend Engineering · Backend Engineering · API Design
- **Software Release Management** → Release Automation · Version Management · Rollback Management
- **Accounting** → General Ledger · Accounts Payable · Accounts Receivable
- **IT Support** → Help Desk · Incident Management · Asset Tracking

---

## ID scheme

```
L1: cap-l1-[slug]          e.g. cap-l1-product-development
L2: cap-l2-[slug]          e.g. cap-l2-product-planning
L3: cap-l3-[slug]          e.g. cap-l3-product-roadmap-management
```

---

## Component structure

```
nodes/capability/
  capabilityData.js       ← FULL REPLACE with SaaS model (~120–140 records)
  capabilityUtils.js      ← UNCHANGED
  LevelBadge.jsx          ← UNCHANGED
  CapabilityScreen.jsx    ← replace <table> with <CapabilityMap />
  CapabilityMap.jsx       ← NEW — column layout component
  CapabilityDetail.jsx    ← UNCHANGED
  tabs/                   ← UNCHANGED
```

### `CapabilityMap` interface

```jsx
// Props
CapabilityMap({ capabilities, onOpenCapability })

// Internal tree derivation (no useMemo needed — runs once at module scope)
const l1s = capabilities.filter(c => !c.parentCapabilityId)
// inside render per l1:
const l2s = capabilities.filter(c => c.parentCapabilityId === l1.id)
// inside render per l2:
const l3s = capabilities.filter(c => c.parentCapabilityId === l2.id)
```

---

## Visual design tokens

| Element | Token / value |
|---------|---------------|
| Scroll container | `overflow-x: auto`, `paddingBottom: spacing.xl` |
| Column row | `display: flex`, `gap: spacing.m`, `alignItems: flex-start` |
| Column width | `220px` fixed, `flexShrink: 0` |
| L1 header bg | `colors.teal` |
| L1 header hover | `opacity: 0.88` overlay or `colors.tealDark` if token exists |
| L1 header text | `colors.white`, `fontFamilies.display`, `typeScale.ui.size`, `fontWeight: 600` |
| L1 header padding | `spacing.m` |
| L1 header radius | `radii.md radii.md 0 0` (top corners only) |
| L2 card bg | `colors.white` |
| L2 card border | `1px solid ${colors.border}` |
| L2 card radius | `radii.md` |
| L2 card shadow at rest | `shadows.sm` |
| L2 card shadow on hover | `shadows.md`, `translateY(-2px)` |
| L2 name text | `fontFamilies.body`, `typeScale.ui.size`, `fontWeight: 500`, `colors.ink` |
| L2 card padding | `spacing.m` |
| L2 card gap | `spacing.xs` between cards |
| L3 item text | `fontFamilies.body`, `typeScale.labelB.size`, `colors.textSecondary` |
| L3 item padding | `spacing.xs spacing.m` |
| L3 divider | `1px solid ${colors.border}` top border on first L3 item |
| L3 hover bg | `colorVars.stone` |
| Transition | `easing.out` for all hover transitions |

---

## Code style constraints (from CLAUDE.md)

- Inline styles with `colorVars.*` / `spacing.*` / `colors.*` tokens only — no CSS modules, no Tailwind.
- No hardcoded hex or pixel values — every value from a token.
- Object-form data arrays — no positional tuples.
- No comments unless the WHY is non-obvious.
- No external state library; no URL router.

---

## Boundaries

### Always do
- Use `colorVars.*` in inline styles for all colour values (dark-mode safety).
- Keep `deriveLevel()` as the single source of level truth — do not re-derive level inline.
- Export `CAPABILITIES` and `DEFAULT_CAPABILITY` from `capabilityData.js` (same names as today).
- Preserve the page header (h1 + action buttons) in `CapabilityScreen`.

### Ask before doing
- Adding new named colours to `colors_and_type.css` or `tokens/`.
- Any change to `main.jsx`, `Shell.jsx`, `NodeDetailShell.jsx`, or shared `Components.jsx`.

### Never do
- Hardcode hex values or pixel sizes outside design tokens.
- Modify `capabilityUtils.js`, `LevelBadge.jsx`, `CapabilityDetail.jsx`, or any tab file.
- Add tabs, a right sidebar, or search/filter to `CapabilityScreen`.
- Change the existing `SPEC.md` (that file covers the completed nodes task).

---

## Out of scope

- Search or filter on the map.
- Expand/collapse columns.
- Heat-map colouring, status overlays, or RAG ratings on map cells.
- Any change to `CapabilityDetail` or its five tabs.
- Backend / API integration.
